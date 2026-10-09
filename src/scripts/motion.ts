/**
 * Progressive-enhancement motion layer (content is fully visible without JS):
 *  - [data-reveal] fades/rises in on scroll; `.revealed` is added afterwards so hover timings take over
 *  - .eyebrow labels "decode" from random glyphs into their text when revealed
 *  - .spot cards: cursor spotlight + border glow (--mx/--my) and a subtle 3D tilt (--rx/--ry)
 *  - .btn: magnetic pull (--tx/--ty) and a click ripple
 *  - [data-count] numbers count up once
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

/* ---------- Eyebrow decode ---------- */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>';
function decode(el: HTMLElement) {
  if (reduce || el.dataset.decoded) return;
  el.dataset.decoded = '1';
  // Only the trailing text after the <b> tag is scrambled; the label stays readable to screen readers.
  const node = [...el.childNodes].reverse().find((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());
  if (!node) return;
  const final = node.textContent || '';
  el.setAttribute('aria-label', el.textContent?.trim() || final);
  const span = document.createElement('span');
  span.className = 'scr';
  span.setAttribute('aria-hidden', 'true');
  node.replaceWith(span);
  const start = performance.now();
  const dur = 700;
  const step = (t: number) => {
    const k = Math.min(1, (t - start) / dur);
    const fixed = Math.floor(final.length * k);
    let out = final.slice(0, fixed);
    for (let i = fixed; i < final.length; i++) out += final[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    span.textContent = out;
    if (k < 1) requestAnimationFrame(step);
    else span.textContent = final;
  };
  requestAnimationFrame(step);
}

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      el.classList.add('is-in');
      io.unobserve(el);
      el.querySelectorAll<HTMLElement>('.eyebrow').forEach(decode);
      if (el.classList.contains('eyebrow')) decode(el);
      const delay = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0;
      window.setTimeout(() => el.classList.add('revealed'), 900 + delay * 1000);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
);
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
// Eyebrows that aren't inside a reveal block (e.g. page heroes) decode on load.
document.querySelectorAll<HTMLElement>('.eyebrow').forEach((el) => {
  if (!el.closest('[data-reveal]')) window.setTimeout(() => decode(el), 150);
});

/* ---------- Cards: spotlight, border glow, tilt ---------- */
if (!reduce && finePointer) {
  let active: HTMLElement | null = null;
  const reset = (card: HTMLElement) => {
    card.classList.remove('is-tilting');
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };
  document.addEventListener(
    'pointermove',
    (e) => {
      const card = (e.target as Element | null)?.closest?.('.spot') as HTMLElement | null;
      if (active && active !== card) reset(active);
      active = card;
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
      // Gentle tilt: at most ~5° so text stays crisp and readable.
      card.classList.add('is-tilting');
      card.style.setProperty('--ry', `${((x / r.width) - 0.5) * 7}deg`);
      card.style.setProperty('--rx', `${(0.5 - y / r.height) * 6}deg`);
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => active && reset(active));
  document.querySelectorAll<HTMLElement>('.spot').forEach((c) => c.addEventListener('pointerleave', () => reset(c)));

  /* ---------- Buttons: magnetic pull ---------- */
  document.querySelectorAll<HTMLElement>('.btn').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--tx', `${((e.clientX - r.left) / r.width - 0.5) * 8}px`);
      btn.style.setProperty('--ty', `${((e.clientY - r.top) / r.height - 0.5) * 6}px`);
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.setProperty('--tx', '0px');
      btn.style.setProperty('--ty', '0px');
    });
  });
}

/* ---------- Buttons: click ripple ---------- */
if (!reduce) {
  document.addEventListener('pointerdown', (e) => {
    const btn = (e.target as Element | null)?.closest?.('.btn') as HTMLElement | null;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.left = `${e.clientX - r.left}px`;
    dot.style.top = `${e.clientY - r.top}px`;
    btn.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove());
  });
}

/* ---------- Count-up numbers ---------- */
const counters = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      counters.unobserve(e.target);
      const el = e.target as HTMLElement;
      const raw = el.dataset.count || '';
      const to = parseFloat(raw);
      const suffix = raw.replace(/[\d.]/g, '');
      if (reduce || !Number.isFinite(to)) continue;
      const start = performance.now();
      const dur = 1200;
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / dur);
        el.textContent = `${Math.round(to * (1 - Math.pow(1 - k, 3)))}${suffix}`;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  },
  { threshold: 0.6 },
);
document.querySelectorAll('[data-count]').forEach((el) => counters.observe(el));
