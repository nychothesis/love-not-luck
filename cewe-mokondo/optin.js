(function () {
  // Dedicated form endpoint for this mini ebook. Keep blank until the matching
  // EmailOctopus list/form is configured. Never reuse the webinar form.
  var ENDPOINT = '';
  var SUCCESS = 'thanks.html';

  var form = document.getElementById('optin-form');
  var button = document.getElementById('submit-btn');
  var error = document.getElementById('err');
  var buttonLabel = button.textContent;

  function showError(message) {
    error.textContent = message;
    error.hidden = false;
    button.disabled = false;
    button.textContent = buttonLabel;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    error.hidden = true;

    if (form.elements.hp_website.value) return;
    var name = form.elements.nama.value.trim();
    var email = form.elements.email.value.trim();

    if (!name || !email) { showError('Isi nama dan email kamu dulu ya.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
      showError('Emailnya kayaknya salah ketik. Cek lagi ya.'); return;
    }
    if (!ENDPOINT) {
      showError('Formnya belum siap. Coba lagi nanti ya.'); return;
    }

    button.disabled = true;
    button.textContent = 'Lagi ngirim...';

    var data = new URLSearchParams();
    data.set('name', name);
    data.set('email', email);
    data.set('source', 'cewe-mokondo-mini-ebook');

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data
    }).then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      sessionStorage.setItem('cewe-mokondo-signup', 'yes');
      window.location.assign(SUCCESS);
    }).catch(function () {
      showError('Belum berhasil daftar. Coba lagi sebentar ya.');
    });
  });
})();
