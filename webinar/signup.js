(function () {
  'use strict';

  // Worker yang sama dengan cewe-mokondo; lm: 'webinar' bikin kontaknya dapet tag lm-webinar.
  var ENDPOINT = 'https://nychothesis-lm-signup.nicho-aurelius.workers.dev';
  var PAINS = ['Keliatannya taat agama, ternyata judgemental dan suka jadi polisi moral', 'Keliatannya punya mental provider, ternyata egonya tinggi dan ga mau terlihat vulnerable', 'Keliatannya berjiwa pemimpin, ternyata patriarki dan controlling', 'Keliatannya percaya diri dan charming, ternyata egonya rapuh dan tukang manipulasi', 'Keliatannya alim, tapi diem-diem nafsunya ke cewe lain'];
  var form = document.getElementById('webinar-form');
  var button = document.getElementById('submit-btn');
  var error = document.getElementById('form-error');
  var originalLabel = button.textContent;

  function fail(message) {
    error.textContent = message;
    error.hidden = false;
    button.disabled = false;
    button.textContent = originalLabel;
  }

  function emailValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
  }

  form.addEventListener('change', function (event) {
    if (event.target.name !== 'datingPain') return;
    if (form.querySelectorAll('input[name="datingPain"]:checked').length > 2) {
      event.target.checked = false;
      fail('Maksimal 2 pilihan, ya.');
    } else {
      error.hidden = true;
    }
  });

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    error.hidden = true;

    var firstName = form.elements.firstName.value.trim();
    var email = form.elements.email.value.trim().toLowerCase();
    var gender = form.elements.gender.value;
    var instagram = form.elements.instagram.value.trim().replace(/^@/, '');
    var datingPains = Array.prototype.slice.call(form.querySelectorAll('input[name="datingPain"]:checked')).map(function (el) { return el.value; });

    if (!firstName || firstName.length > 80) return fail('Isi nama depan kamu dulu, ya.');
    if (!emailValid(email) || email.length > 254) return fail('Cek lagi alamat email kamu.');
    if (gender !== 'Cowo' && gender !== 'Cewe') return fail('Pilih gender dulu, ya.');
    if (!/^[A-Za-z0-9._]{1,30}$/.test(instagram)) return fail('Isi username Instagram yang valid, tanpa link.');
    if (datingPains.length < 1 || datingPains.length > 2 || datingPains.some(function (p) { return PAINS.indexOf(p) === -1; })) return fail('Pilih 1 sampai 2 tipe cowo yang paling kamu takutin.');

    button.disabled = true;
    button.textContent = 'Menyimpan data…';

    try {
      var response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lm: 'webinar', firstName: firstName, email: email, gender: gender,
          instagram: instagram, datingPains: datingPains, website: form.elements.website.value })
      });
      if (response.status === 422) {
        return fail('Email kamu ditolak. Cek lagi ejaannya, misalnya gmail.com bukan gmail.con.');
      }
      if (!response.ok) throw new Error('signup failed');
      if (window.gtag) gtag('event', 'generate_lead', { lead_magnet: 'webinar' });
      window.location.assign('../one-time-offer/?source=webinar');
    } catch (_) {
      fail('Data belum tersimpan. Coba lagi sebentar lagi.');
    }
  });
}());
