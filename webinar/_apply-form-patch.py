# Jalankan SETELAH signup-worker/worker.mjs (versi multi, maks 2 pilihan) di-deploy ke Cloudflare.
# Ngubah form webinar: radio 3 pilihan lama jadi checkbox 5 tipe cowo, maksimal 2.
import re, os
base=os.path.dirname(os.path.abspath(__file__))+"/"
NEW=[
"Keliatannya taat agama, ternyata judgemental dan suka jadi polisi moral",
"Keliatannya punya mental provider, ternyata egonya tinggi dan ga mau terlihat vulnerable",
"Keliatannya berjiwa pemimpin, ternyata patriarki dan controlling",
"Keliatannya percaya diri dan charming, ternyata egonya rapuh dan tukang manipulasi",
"Keliatannya alim, tapi diem-diem nafsunya ke cewe lain"]
h=open(base+"index.html",encoding='utf-8').read()
i=h.index('<legend>Masalah dating utamamu (pilih satu)</legend>'); j=h.index('</fieldset>',i)
block='<legend>Cowo kayak gimana yang paling kamu takutin buat ketemu? (pilih maksimal 2)</legend>\n'+"\n".join('          <label class="choice"><input type="checkbox" name="datingPain" value="%s"><span>%s</span></label>'%(x,x) for x in NEW)+"\n        "
h=h[:i]+block+h[j:]
open(base+"index.html","w",encoding='utf-8').write(h)
s=open(base+"signup.js",encoding='utf-8').read()
s,n=re.subn(r"var PAINS = \[[^\]]*\];","var PAINS = ["+", ".join("'%s'"%x for x in NEW)+"];",s); assert n==1
a="    var datingPain = form.elements.datingPain.value;\n"; assert s.count(a)==1
s=s.replace(a,"    var datingPains = Array.prototype.slice.call(form.querySelectorAll('input[name=\"datingPain\"]:checked')).map(function (el) { return el.value; });\n")
b="    if (PAINS.indexOf(datingPain) === -1) return fail('Pilih satu masalah dating yang paling dekat dengan pengalamanmu.');\n"; assert s.count(b)==1
s=s.replace(b,"    if (datingPains.length < 1 || datingPains.length > 2 || datingPains.some(function (p) { return PAINS.indexOf(p) === -1; })) return fail('Pilih 1 sampai 2 tipe cowo yang paling kamu takutin.');\n")
c="instagram: instagram, datingPain: datingPain, website"; assert s.count(c)==1
s=s.replace(c,"instagram: instagram, datingPains: datingPains, website")
d="  form.addEventListener('submit', async function (event) {"; assert s.count(d)==1
s=s.replace(d,"""  form.addEventListener('change', function (event) {
    if (event.target.name !== 'datingPain') return;
    if (form.querySelectorAll('input[name="datingPain"]:checked').length > 2) {
      event.target.checked = false;
      fail('Maksimal 2 pilihan, ya.');
    } else {
      error.hidden = true;
    }
  });

"""+d)
open(base+"signup.js","w",encoding='utf-8').write(s)
print("form patch (maks 2) applied")
