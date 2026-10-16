(function () {
  'use strict';

  var ENDPOINT = 'https://nychothesis-lm-signup.nicho-aurelius.workers.dev';
  var form = document.getElementById('ebook-form');
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

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    error.hidden = true;

    var firstName = form.elements.firstName.value.trim();
    var email = form.elements.email.value.trim().toLowerCase();
    var gender = form.elements.gender.value;
    var instagram = form.elements.instagram.value.trim().replace(/^@/, '');
    var datingPain = form.elements.datingPain.value;

    if (!firstName || firstName.length > 80) return fail('Isi nama kamu dulu, ya.');
    if (!emailValid(email) || email.length > 254) return fail('Cek lagi alamat email kamu.');
    if (gender !== 'Cowo' && gender !== 'Cewe') return fail('Pilih gender dulu, ya.');
    if (!/^[A-Za-z0-9._]{1,30}$/.test(instagram)) return fail('Isi username Instagram yang valid, tanpa link.');
    if (['Jarang ketemu kenalan baru yang potensial', 'Suka sama seseorang, tapi dia ga tertarik balik', 'Suka dapet orang yang salah'].indexOf(datingPain) === -1) {
      return fail('Pilih satu masalah dating yang paling dekat dengan pengalamanmu.');
    }
    if (!ENDPOINT) return fail('Pendaftaran sedang disiapkan. Coba lagi nanti.');

    button.disabled = true;
    button.textContent = 'Menyimpan data…';

    try {
      var response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: firstName, email: email, gender: gender,
          instagram: instagram, datingPain: datingPain, website: form.elements.website.value })
      });
      if (!response.ok) throw new Error('signup failed');
      window.location.assign('./thanks.html');
    } catch (_) {
      fail('Data belum tersimpan. Coba lagi sebentar lagi.');
    }
  });
}());
