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
      'Suka dapet orang yang salah'
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
