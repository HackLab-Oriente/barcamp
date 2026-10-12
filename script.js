(function () {
  var box = document.getElementById('countdown');
  if (!box) return;

  var deadline = new Date(box.dataset.deadline).getTime();
  var eventDate = new Date(box.dataset.event).getTime();
  var label = document.getElementById('countdown-label');
  var estado = document.getElementById('estado');
  var cta = document.getElementById('cta');
  var els = {
    d: document.getElementById('cd-d'),
    h: document.getElementById('cd-h'),
    m: document.getElementById('cd-m'),
    s: document.getElementById('cd-s')
  };
  var closed = false;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var now = Date.now();
    var target = now < deadline ? deadline : eventDate;

    if (now >= deadline && !closed) {
      closed = true;
      estado.textContent = 'Convocatoria cerrada';
      label.textContent = 'Faltan para el Barcamp Oriente · sábado 7 de noviembre';
      if (cta) cta.hidden = true;
    }

    var left = Math.max(0, target - now);
    var s = Math.floor(left / 1000);
    els.d.textContent = pad(Math.floor(s / 86400));
    els.h.textContent = pad(Math.floor(s % 86400 / 3600));
    els.m.textContent = pad(Math.floor(s % 3600 / 60));
    els.s.textContent = pad(s % 60);

    if (now >= eventDate) {
      estado.textContent = '¡Hoy es el Barcamp Oriente!';
      label.textContent = 'Nos vemos en el Teatro Tespys';
      return;
    }
    setTimeout(tick, 1000);
  }
  tick();
})();
