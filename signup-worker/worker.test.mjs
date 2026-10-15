import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.mjs';

const env = { EMAILOCTOPUS_API_KEY: 'test-key', EMAILOCTOPUS_LIST_ID: 'test-list' };
const valid = {
  firstName: 'Nicho', email: 'nicho@example.com', gender: 'Cowo', instagram: '@nichokp',
  datingPain: 'Sering dapet orang yang salah', website: ''
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
    const response = await worker.fetch(request(), env);
    assert.equal(response.status, 200);
    assert.equal(sent.url, 'https://emailoctopus.com/api/1.6/lists/test-list/contacts');
    assert.equal(sent.body.email_address, 'nicho@example.com');
    assert.deepEqual(sent.body.tags, ['lm-cewe-mokondo']);
    assert.deepEqual(sent.body.fields, {
      FirstName: 'Nicho', Gender: 'Cowo', UsernameInstagram: 'nichokp',
      MasalahDatingUtama: 'Sering dapet orang yang salah'
    });
    assert.equal(sent.body.status, undefined);
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), 'https://nychothesis.com');
  } finally { globalThis.fetch = original; }
});

test('existing contact receives the tag without changing subscription status', async () => {
  const original = globalThis.fetch;
  const sent = [];
  globalThis.fetch = async (url, options) => {
    sent.push({ url, method: options.method, body: JSON.parse(options.body) });
    if (sent.length === 1) {
      return new Response(JSON.stringify({ code: 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS' }), { status: 409 });
    }
    return new Response('{}', { status: 200 });
  };
  try {
    assert.equal((await worker.fetch(request(), env)).status, 200);
    assert.equal(sent.length, 2);
    assert.equal(sent[1].method, 'PUT');
    assert.deepEqual(sent[1].body.tags, { 'lm-cewe-mokondo': true });
    assert.equal(sent[1].body.status, undefined);
  } finally { globalThis.fetch = original; }
});

test('invalid and cross-origin submissions do not call EmailOctopus', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('must not call provider'); };
  try {
    assert.equal((await worker.fetch(request({ ...valid, instagram: 'not valid' }), env)).status, 400);
    assert.equal((await worker.fetch(request(valid, 'https://other.example'), env)).status, 403);
  } finally { globalThis.fetch = original; }
});

test('provider failure never claims success', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ code: 'INVALID_PARAMETERS' }), { status: 400 });
  try { assert.equal((await worker.fetch(request(), env)).status, 502); }
  finally { globalThis.fetch = original; }
});
