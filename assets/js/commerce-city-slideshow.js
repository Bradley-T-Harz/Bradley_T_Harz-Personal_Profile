/* Progressive enhancement: every visual remains available without JavaScript. */
(() => {
  const slideshow = document.querySelector('[data-commerce-slideshow]');
  if (!slideshow) return;
  const slides = [...slideshow.querySelectorAll('.commerce-slide')];
  const previous = slideshow.querySelector('[data-previous]');
  const next = slideshow.querySelector('[data-next]');
  const counter = slideshow.querySelector('.commerce-slide-counter');
  if (!slides.length || !previous || !next || !counter) return;
  let current = 0;
  function show(index) {
    current = Math.max(0, Math.min(index, slides.length - 1));
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    counter.textContent = `${current + 1} / ${slides.length}`;
    previous.setAttribute('aria-disabled', String(current === 0));
    next.setAttribute('aria-disabled', String(current === slides.length - 1));
  }
  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  slideshow.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const destinations = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: slides.length - 1 };
    if (!Object.prototype.hasOwnProperty.call(destinations, event.key)) return;
    event.preventDefault();
    show(destinations[event.key]);
  });
  show(0);
  slideshow.classList.add('is-interactive');
  slideshow.tabIndex = 0;
  slideshow.setAttribute('aria-describedby', 'slide-help');
  slideshow.querySelector('#slide-help').hidden = false;
  slideshow.querySelector('.commerce-slide-controls').hidden = false;
})();
