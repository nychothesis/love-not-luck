const ORIGIN = 'https://nychothesis.com';
// Lead magnet asal pendaftaran. Default cewe-mokondo biar form lama tetap jalan.
const TAGS = { 'cewe-mokondo': 'lm-cewe-mokondo', webinar: 'lm-webinar' };
// Tag tambahan buat signup lewat pertanyaan baru (cowo kayak gimana yang paling ditakutin, maks 2). Misahin dari jawaban 3 pilihan lama.
const NEW_QUESTION_TAG = 'pertanyaan-tipe-cowo';
const PAINS = new Set([
  // Pilihan lama (LP cewe-mokondo masih pakai)
  'Jarang ketemu kenalan baru yang potensial',
  'Suka sama seseorang, tapi dia ga tertarik balik',
  'Suka dapet orang yang salah',
  // Pertanyaan baru LP webinar: cowo kayak gimana yang paling ditakutin (21 Nov 2026)
  'Keliatannya taat agama, ternyata judgemental dan suka jadi polisi moral',
  'Keliatannya punya mental provider, ternyata egonya tinggi dan ga mau terlihat vulnerable',
  'Keliatannya berjiwa pemimpin, ternyata patriarki dan controlling',
  'Keliatannya percaya diri dan charming, ternyata egonya rapuh dan tukang manipulasi',
  'Keliatannya alim, tapi diem-diem nafsunya ke cewe lain'
]);

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
  // Satu pilihan (datingPain, string) atau maksimal 2 (datingPains, array). Disimpen sbg satu teks dipisah ' | '.
  const multi = Array.isArray(payload.datingPains);
  const pains = multi ? payload.datingPains : [payload.datingPain];
  if (payload.website) return { bot: true };
  if (!firstName || firstName.length > 80 || /[\u0000-\u001f]/.test(firstName)) return null;
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) return null;
  if (gender !== 'Cowo' && gender !== 'Cewe') return null;
  if (!/^[A-Za-z0-9._]{1,30}$/.test(instagram)) return null;
  if (pains.length < 1 || pains.length > 2 || new Set(pains).size !== pains.length) return null;
  if (!pains.every((pain) => PAINS.has(pain))) return null;
  const datingPain = pains.join(' | ');
  const lm = payload.lm === undefined ? 'cewe-mokondo' : payload.lm;
  if (!Object.prototype.hasOwnProperty.call(TAGS, lm)) return null;
  return { firstName, email, gender, instagram, datingPain, tag: TAGS[lm], extraTags: multi ? [NEW_QUESTION_TAG] : [] };
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

    // Tag batch webinar (WEBINAR_BATCH di wrangler.toml, mis. 'webinar-b2'): cuma buat signup webinar, ganti tiap batch baru.
    const tagNames = [payload.tag, ...payload.extraTags];
    if (payload.tag === TAGS.webinar) {
      // WEBINAR_TOPIC = tag topik batch ini, mis. 'topik-hindari-cowo' (produk 1) atau 'topik-cowo-betah' (produk 2).
      for (const name of [env.WEBINAR_BATCH, env.WEBINAR_TOPIC]) {
        if (/^[a-z0-9-]{1,40}$/.test(name || '')) tagNames.push(name);
      }
    }
    const endpoint = `https://api.emailoctopus.com/lists/${encodeURIComponent(env.EMAILOCTOPUS_LIST_ID)}/contacts`;
    const fields = {
      FirstName: payload.firstName,
      Gender: payload.gender,
      UsernameInstagram: payload.instagram,
      MasalahDatingUtama: payload.datingPain
    };
    try {
      // API v2 upsert menambah kontak baru atau memperbarui kontak lama.
      // Status langganan lama tidak diubah; kontak baru mengikuti setelan list.
      const result = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.EMAILOCTOPUS_API_KEY}`
        },
        body: JSON.stringify({
        email_address: payload.email,
        fields,
        tags: Object.fromEntries(tagNames.map((name) => [name, true]))
        })
      });
      if (result.ok) return reply(200, { ok: true });
      // Field lain sudah divalidasi di atas, jadi 400/422 dari EmailOctopus
      // praktis berarti alamat email ditolak (mis. typo domain gmail.con).
      if (result.status === 400 || result.status === 422) return reply(422, { error: 'email' });
      return reply(502, { error: 'provider' });
    } catch (_) {
      return reply(502, { error: 'provider' });
    }
  }
};
