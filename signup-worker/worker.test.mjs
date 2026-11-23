import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.mjs';

const env = { EMAILOCTOPUS_API_KEY: 'test-key', EMAILOCTOPUS_LIST_ID: 'test-list' };
const valid = {
  firstName: 'Nicho', email: 'nicho@example.com', gender: 'Cowo', instagram: '@nichokp',
  datingPain: 'Suka dapet orang yang salah', website: ''
};
function request(payload = valid, origin = 'https://nychothesis.com') {
  return new Request('https://signup.example.workers.dev/', {
    method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

test('valid signup maps fields and tag to EmailOctopus', async () => {
  const original = globalThis.fetch;
  let sent;
  globalThis.fetch = async (url, options) => {
    sent = { url, options, body: JSON.parse(options.body) };
    return new Response('{}', { status: 200 });
  };
  try {
    for (const datingPain of [
      'Jarang ketemu kenalan baru yang potensial',
      'Suka sama seseorang, tapi dia ga tertarik balik',
      'Suka dapet orang yang salah',
      'Keliatannya perhatian dan serius banget dari awal, ternyata love bombing: intens di awal, lalu tiba-tiba menghilang',
      'Keliatannya taat agama, ternyata judgemental dan suka jadi polisi moral',
      'Keliatannya punya mental provider, ternyata egonya tinggi dan ga mau terlihat vulnerable',
      'Keliatannya berjiwa pemimpin, ternyata patriarki dan controlling',
      'Keliatannya percaya diri dan charming, ternyata egonya rapuh dan tukang manipulasi',
      'Keliatannya alim, tapi diem-diem nafsunya ke cewe lain'
    ]) {
      const response = await worker.fetch(request({ ...valid, datingPain }), env);
      assert.equal(response.status, 200);
      assert.equal(sent.url, 'https://api.emailoctopus.com/lists/test-list/contacts');
      assert.equal(sent.options.method, 'PUT');
      assert.equal(sent.options.headers.Authorization, 'Bearer test-key');
      assert.equal(sent.body.email_address, 'nicho@example.com');
      assert.deepEqual(sent.body.tags, { 'lm-cewe-mokondo': true });
      assert.deepEqual(sent.body.fields, {
        FirstName: 'Nicho', Gender: 'Cowo', UsernameInstagram: 'nichokp',
        MasalahDatingUtama: datingPain
    });
    assert.equal(sent.body.status, undefined);
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), 'https://nychothesis.com');
    }
  } finally { globalThis.fetch = original; }
});

test('upsert does not request a subscription status change', async () => {
  const original = globalThis.fetch;
  let sent;
  globalThis.fetch = async (url, options) => {
    sent = { url, method: options.method, body: JSON.parse(options.body) };
    return new Response('{}', { status: 200 });
  };
  try {
    assert.equal((await worker.fetch(request(), env)).status, 200);
    assert.equal(sent.method, 'PUT');
    assert.deepEqual(sent.body.tags, { 'lm-cewe-mokondo': true });
    assert.equal(sent.body.status, undefined);
  } finally { globalThis.fetch = original; }
});

test('invalid and cross-origin submissions do not call EmailOctopus', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('must not call provider'); };
  try {
    assert.equal((await worker.fetch(request({ ...valid, instagram: 'not valid' }), env)).status, 400);
    assert.equal((await worker.fetch(request({ ...valid, datingPain: '' }), env)).status, 400);
    assert.equal((await worker.fetch(request({ ...valid, datingPain: [valid.datingPain] }), env)).status, 400);
    assert.equal((await worker.fetch(request(valid, 'https://other.example'), env)).status, 403);
  } finally { globalThis.fetch = original; }
});

test('provider failure never claims success', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => new Response('{}', { status: 500 });
  try { assert.equal((await worker.fetch(request(), env)).status, 502); }
  finally { globalThis.fetch = original; }
});

test('email rejected by provider is reported as an email problem', async () => {
  const original = globalThis.fetch;
  try {
    for (const status of [400, 422]) {
      globalThis.fetch = async () => new Response(JSON.stringify({ code: 'INVALID_PARAMETERS' }), { status });
      const response = await worker.fetch(request(), env);
      assert.equal(response.status, 422);
      assert.deepEqual(await response.json(), { error: 'email' });
    }
  } finally { globalThis.fetch = original; }
});

test('webinar signup gets lm-webinar tag, unknown lm rejected', async () => {
  const original = globalThis.fetch;
  let sent;
  globalThis.fetch = async (url, options) => { sent = JSON.parse(options.body); return new Response('{}', { status: 200 }); };
  try {
    const ok = await worker.fetch(request({ ...valid, lm: 'webinar' }), env);
    assert.equal(ok.status, 200);
    assert.deepEqual(sent.tags, { 'lm-webinar': true });
    const bad = await worker.fetch(request({ ...valid, lm: 'toString' }), env);
    assert.equal(bad.status, 400);
  } finally { globalThis.fetch = original; }
});

test('webinar signup accepts up to 2 pains, rejects 3, duplicates, or unknown', async () => {
  const original = globalThis.fetch;
  let sent;
  globalThis.fetch = async (url, options) => {
    sent = JSON.parse(options.body);
    return new Response('{}', { status: 200 });
  };
  const A = 'Keliatannya taat agama, ternyata judgemental dan suka jadi polisi moral';
  const B = 'Keliatannya alim, tapi diem-diem nafsunya ke cewe lain';
  const C = 'Keliatannya berjiwa pemimpin, ternyata patriarki dan controlling';
  try {
    const { datingPain: _ignored, ...base } = valid;
    let response = await worker.fetch(request({ ...base, lm: 'webinar', datingPains: [A, B] }), env);
    assert.equal(response.status, 200);
    assert.equal(sent.fields.MasalahDatingUtama, `${A} | ${B}`);
    assert.deepEqual(sent.tags, { 'lm-webinar': true, 'pertanyaan-tipe-cowo': true });
    response = await worker.fetch(request({ ...base, lm: 'webinar', datingPains: [A] }), env);
    assert.equal(response.status, 200);
    assert.equal(sent.fields.MasalahDatingUtama, A);
    assert.deepEqual(sent.tags, { 'lm-webinar': true, 'pertanyaan-tipe-cowo': true });
    for (const datingPains of [[A, B, C], [A, A], [], ['pilihan ngarang']]) {
      sent = undefined;
      response = await worker.fetch(request({ ...base, lm: 'webinar', datingPains }), env);
      assert.equal(response.status, 400);
      assert.equal(sent, undefined);
    }
  } finally {
    globalThis.fetch = original;
  }
});

test('webinar signup gets batch tag from env, other lm does not', async () => {
  const original = globalThis.fetch;
  let sent;
  globalThis.fetch = async (url, options) => {
    sent = JSON.parse(options.body);
    return new Response('{}', { status: 200 });
  };
  const A = 'Keliatannya alim, tapi diem-diem nafsunya ke cewe lain';
  const withBatch = { ...env, WEBINAR_BATCH: 'webinar-b2' };
  try {
    const { datingPain: _ignored, ...base } = valid;
    await worker.fetch(request({ ...base, lm: 'webinar', datingPains: [A] }), withBatch);
    assert.deepEqual(sent.tags, { 'lm-webinar': true, 'pertanyaan-tipe-cowo': true, 'webinar-b2': true });
    await worker.fetch(request({ ...valid, lm: 'webinar' }), withBatch);
    assert.deepEqual(sent.tags, { 'lm-webinar': true, 'webinar-b2': true });
    await worker.fetch(request({ ...valid }), withBatch);
    assert.deepEqual(sent.tags, { 'lm-cewe-mokondo': true });
    await worker.fetch(request({ ...valid, lm: 'webinar' }), { ...env, WEBINAR_BATCH: 'Batch 2!' });
    assert.deepEqual(sent.tags, { 'lm-webinar': true });
  } finally {
    globalThis.fetch = original;
  }
});

test('webinar signup gets topic tag from env', async () => {
  const original = globalThis.fetch;
  let sent;
  globalThis.fetch = async (url, options) => {
    sent = JSON.parse(options.body);
    return new Response('{}', { status: 200 });
  };
  try {
    await worker.fetch(request({ ...valid, lm: 'webinar' }), { ...env, WEBINAR_BATCH: 'webinar-b2', WEBINAR_TOPIC: 'topik-hindari-cowo' });
    assert.deepEqual(sent.tags, { 'lm-webinar': true, 'webinar-b2': true, 'topik-hindari-cowo': true });
    await worker.fetch(request({ ...valid }), { ...env, WEBINAR_TOPIC: 'topik-hindari-cowo' });
    assert.deepEqual(sent.tags, { 'lm-cewe-mokondo': true });
    await worker.fetch(request({ ...valid, lm: 'webinar' }), { ...env, WEBINAR_TOPIC: 'Topik Ngawur!' });
    assert.deepEqual(sent.tags, { 'lm-webinar': true });
  } finally {
    globalThis.fetch = original;
  }
});

test('webinar signup bentuk baru: status hubungan jadi tag, minat produk cowo berlaku semua gender', async () => {
  const original = globalThis.fetch;
  let sent;
  globalThis.fetch = async (url, options) => { sent = JSON.parse(options.body); return new Response('{}', { status: 200 }); };
  try {
    const { datingPain: _ignored, ...base } = valid;
    let response = await worker.fetch(request({ ...base, lm: 'webinar', relationshipStatus: 'Lagi PDKT', maleInterest: true }), env);
    assert.equal(response.status, 200);
    assert.equal(sent.fields.MasalahDatingUtama, undefined);
    assert.deepEqual(sent.tags, { 'lm-webinar': true, 'pertanyaan-status-hubungan': true, 'status-pdkt': true, 'minat-produk-cowo': true });
    response = await worker.fetch(request({ ...base, lm: 'webinar', gender: 'Cewe', relationshipStatus: 'Single', maleInterest: true }), env);
    assert.equal(response.status, 200);
    assert.deepEqual(sent.tags, { 'lm-webinar': true, 'pertanyaan-status-hubungan': true, 'status-single': true, 'minat-produk-cowo': true });
    response = await worker.fetch(request({ ...base, lm: 'webinar', relationshipStatus: 'Bercerai' }), env);
    assert.equal(response.status, 200);
    assert.deepEqual(sent.tags, { 'lm-webinar': true, 'pertanyaan-status-hubungan': true, 'status-bercerai': true });
    for (const bad of [{ relationshipStatus: 'Ngarang' }, { relationshipStatus: 'toString' }, { relationshipStatus: 'Single', maleInterest: 'ya' }]) {
      sent = undefined;
      response = await worker.fetch(request({ ...base, lm: 'webinar', ...bad }), env);
      assert.equal(response.status, 400);
      assert.equal(sent, undefined);
    }
  } finally { globalThis.fetch = original; }
});
