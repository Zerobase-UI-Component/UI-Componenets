let currentSlide = 0;
const DURATION = 500;
let isTranstiion = false;

const carousel = ($container, images) => {
  const imgElem =
    images.reduce((acc, cur) => acc + `<img src="${cur}"></img>`, `<img src="${images[images.length - 1]}"></img>`) +
    `<img src="${images[0]}"></img>`;
  $container.innerHTML = `<div class="carousel-slides">${imgElem}</div>
                          <button class="carousel-control prev">&laquo;</button>
                          <button class="carousel-control next">&raquo;</button>`;

  const IMG_WIDTH = document.querySelector('img').naturalWidth;
  const padding = document.querySelector('img').offsetWidth;

  const $containerSlides = document.querySelector('.carousel-slides');
  [...$containerSlides.children].forEach(img => (img.style.width = IMG_WIDTH));

  const render = () => {
    $container.style.width = IMG_WIDTH + padding + 'px';
    $container.style.opacity = 1;

    currentSlide = +window.getComputedStyle($containerSlides).getPropertyValue('--currentSlide');

    move(++currentSlide);
  };

  const move = (currentSlide, duration = 0) => {
    if (duration) isTranstiion = true;
    $containerSlides.style.setProperty('--duration', duration);
    $containerSlides.style.setProperty('--currentSlide', currentSlide);
  };

  $container.addEventListener('click', ({ target }) => {
    if (!target.classList.contains('carousel-control') || isTranstiion) return;
    const change = target.classList.contains('prev') ? -1 : 1;
    currentSlide += change;
    move(currentSlide, DURATION);
  });

  document.querySelector('.carousel-slides').addEventListener('transitionend', () => {
    isTranstiion = false;
    if (currentSlide <= 0) {
      currentSlide = images.length;
    }
    if (currentSlide >= images.length + 1) {
      currentSlide = 1;
    }
    move(currentSlide);
  });

  window.addEventListener('load', render);
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpeg',
  'movies/movie-2.jpeg',
  'movies/movie-3.jpeg',
  'movies/movie-4.jpeg',
]);
