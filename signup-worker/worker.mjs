import { createHash } from 'node:crypto';

const ORIGIN = 'https://nychothesis.com';
const TAG = 'lm-cewe-mokondo';
const PAINS = new Set(['Susah dapet orang yang aku mau', 'Sering dapet orang yang salah']);

function reply(status, body, cors = true) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...(cors ? { 'Access-Control-Allow-Origin': ORIGIN, Vary: 'Origin' } : {})
    }
  });
}

function clean(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;
  const firstName = String(payload.firstName || '').trim();
  const email = String(payload.email || '').trim().toLowerCase();
  const gender = payload.gender;
  const instagram = String(payload.instagram || '').trim().replace(/^@/, '');
  const datingPain = payload.datingPain;
  if (payload.website) return { bot: true };
  if (!firstName || firstName.length > 80 || /[\u0000-\u001f]/.test(firstName)) return null;
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) return null;
  if (gender !== 'Cowo' && gender !== 'Cewe') return null;
  if (!/^[A-Za-z0-9._]{1,30}$/.test(instagram)) return null;
  if (!PAINS.has(datingPain)) return null;
  return { firstName, email, gender, instagram, datingPain };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    if (origin !== ORIGIN) return reply(403, { error: 'origin' }, false);
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: {
        'Access-Control-Allow-Origin': ORIGIN,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
        Vary: 'Origin'
      } });
    }
    if (request.method !== 'POST') return reply(405, { error: 'method' });
    if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) {
      return reply(415, { error: 'content_type' });
    }
    if (Number(request.headers.get('Content-Length')) > 4096) return reply(413, { error: 'size' });
    let raw;
    try {
      raw = await request.text();
      if (raw.length > 4096) return reply(413, { error: 'size' });
    } catch (_) {
      return reply(400, { error: 'body' });
    }
    let payload;
    try { payload = clean(JSON.parse(raw)); } catch (_) { return reply(400, { error: 'json' }); }
    if (!payload) return reply(400, { error: 'fields' });
    if (payload.bot) return reply(200, { ok: true });
    if (!env.EMAILOCTOPUS_API_KEY || !env.EMAILOCTOPUS_LIST_ID) return reply(503, { error: 'not_ready' });

    const base = `https://emailoctopus.com/api/1.6/lists/${encodeURIComponent(env.EMAILOCTOPUS_LIST_ID)}/contacts`;
    const fields = {
      FirstName: payload.firstName,
      Gender: payload.gender,
      UsernameInstagram: payload.instagram,
      MasalahDatingUtama: payload.datingPain
    };
    const options = (method, body) => ({
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: env.EMAILOCTOPUS_API_KEY, ...body })
    });
    try {
      const created = await fetch(base, options('POST', {
        email_address: payload.email,
        fields,
        tags: [TAG]
      }));
      if (created.ok) return reply(200, { ok: true });
      const error = await created.json().catch(() => ({}));
      if (error.code !== 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') return reply(502, { error: 'provider' });

      // Kontak yang sudah ada ditag dan diperbarui, tanpa mengubah status unsubscribe.
      const hash = createHash('md5').update(payload.email).digest('hex');
      const updated = await fetch(`${base}/${hash}`, options('PUT', { fields, tags: { [TAG]: true } }));
      if (!updated.ok) return reply(502, { error: 'provider' });
      return reply(200, { ok: true });
    } catch (_) {
      return reply(502, { error: 'provider' });
    }
  }
};
