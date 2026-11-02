// Run before the main content so loading feedback can appear immediately.
(() => {
  const loader = document.getElementById('intro-loader');
  if (!loader) return;

  // Respect user preference for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loader.remove();
    return;
  }

  // Split text into individually animated characters for fluid kinetic typography
  const nameEl = loader.querySelector('.intro-name');
  if (nameEl) {
    const rawText = nameEl.textContent.trim();
    nameEl.setAttribute('aria-label', rawText);
    nameEl.innerHTML = '';
    [...rawText].forEach((char, idx) => {
      const wrap = document.createElement('span');
      wrap.className = 'intro-char-wrap';
      const inner = document.createElement('span');
      inner.className = 'intro-char';
      inner.textContent = char;
      // Stagger each letter following the initial kinetic dot strike (~360ms)
      inner.style.animationDelay = `${360 + idx * 45}ms`;
      wrap.appendChild(inner);
      nameEl.appendChild(wrap);
    });
  }

  // Reveal the loader
  loader.hidden = false;
  const started = performance.now();
  let closing = false;

  const MIN_DISPLAY_TIME = 1600; // Allows full physics cycle & letter bloom
  const MAX_DISPLAY_TIME = 2800; // Safety cap

  function dismiss() {
    if (closing) return;
    closing = true;

    // Clean up interactive dismiss listeners
    loader.removeEventListener('click', dismiss);
    document.removeEventListener('keydown', onKeyDown);

    // Trigger smooth curtain exit transition
    loader.classList.add('intro-finished');

    let removed = false;
    const cleanUp = (e) => {
      if (e && e.target !== loader) return;
      if (!removed) {
        removed = true;
        loader.removeEventListener('transitionend', cleanUp);
        loader.remove();
      }
    };

    loader.addEventListener('transitionend', cleanUp);
    // Fallback safety timeout if transitionend is cancelled or skipped
    window.setTimeout(cleanUp, 750);
  }

  function onKeyDown() {
    // Dismiss gracefully on any user key interaction
    dismiss();
  }

  function ready() {
    const elapsed = performance.now() - started;
    const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);
    window.setTimeout(dismiss, remaining);
  }

  // Interactive dismissal: allow skipping with click or keyboard
  loader.addEventListener('click', dismiss, { once: true });
  document.addEventListener('keydown', onKeyDown, { once: true });

  if (document.readyState === 'complete') {
    ready();
  } else {
    window.addEventListener('load', ready, { once: true });
  }

  window.setTimeout(dismiss, MAX_DISPLAY_TIME);
})();
