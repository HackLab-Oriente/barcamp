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

/* Easter egg 1: código Konami. Enciende la llama y deja caer código por unos segundos. */
(function () {
  var seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var pos = 0;
  var running = false;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('keydown', function (e) {
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = k === seq[pos] ? pos + 1 : (k === seq[0] ? 1 : 0);
    if (pos === seq.length) { pos = 0; fire(); }
  });

  function toast(text) {
    var t = document.createElement('div');
    t.className = 'egg-toast';
    t.setAttribute('role', 'status');
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 5000);
  }

  function rain(ms) {
    var c = document.createElement('canvas');
    c.className = 'egg-rain';
    c.setAttribute('aria-hidden', 'true');
    document.body.appendChild(c);
    var ctx = c.getContext('2d');
    var size = 18;
    var cols, drops;
    function resize() {
      c.width = innerWidth; c.height = innerHeight;
      cols = Math.ceil(c.width / size);
      drops = Array.from({ length: cols }, function () { return Math.random() * -40; });
    }
    resize();
    var glyphs = '01<>{}/;=+*$#'.split('');
    var end = Date.now() + ms;
    (function frame() {
      ctx.fillStyle = 'rgba(10, 18, 20, .12)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = '#00D4D4';
      ctx.font = size + 'px "IBM Plex Mono", monospace';
      for (var i = 0; i < cols; i++) {
        ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], i * size, drops[i] * size);
        if (drops[i] * size > c.height && Math.random() > .975) drops[i] = 0;
        drops[i]++;
      }
      if (Date.now() < end) { requestAnimationFrame(frame); return; }
      c.classList.add('out');
      setTimeout(function () { c.remove(); }, 800);
    })();
  }

  function fire() {
    if (running) return;
    running = true;
    document.body.classList.add('on-fire');
    toast('🔥 Modo llama activado. Aquí todo suma.');
    if (!reduce) rain(5000);
    setTimeout(function () { document.body.classList.remove('on-fire'); running = false; }, 6000);
  }
})();

/* Easter egg 2: mensaje para quien abre la consola. */
(function () {
  if (!window.console || !console.log) return;
  var art = [
    '┌──────────────────────────────┐',
    '│  $ barcamp --oriente 2026    │',
    '│  > des-conferencias    <     │',
    '│  > por HAC<LAB ORIENTE       │',
    '└──────────────────────────────┘'
  ].join('\n');
  console.log('%c' + art, 'color:#00D4D4;font-family:monospace;font-size:12px');
  console.log('%c¿Mirando el código? Eso es espíritu de barcamp.', 'color:#00D4D4;font:700 16px sans-serif');
  console.log('Aquí no hay público, solo participantes. Si tienes algo que compartir, envía tu propuesta:\nhttps://hacklaboriente.org/barcamp/#como\n\nPista: ↑ ↑ ↓ ↓ ← → ← → B A');
})();
