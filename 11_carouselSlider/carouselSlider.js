let currentSlide = 0;
const DURATION = 500;
let isEnd = false;

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

  // window 에 슬라이드 옮기기
  const render = () => {
    $container.style.width = IMG_WIDTH + padding + 'px';
    $container.style.opacity = 1;

    // currentSlide 가져와서 재할당
    currentSlide = +window.getComputedStyle($containerSlides).getPropertyValue('--currentSlide');

    $containerSlides.style.setProperty('--currentSlide', currentSlide > images.length + 1 ? 0 : currentSlide);
  };

  const move = (currentSlide, duration = 0) => {
    $containerSlides.style.setProperty('--duration', duration);
    $containerSlides.style.setProperty('--currentSlide', currentSlide);
  };
  const prev = () => {
    if (currentSlide === 0) {
      currentSlide = images.length;
      move(currentSlide);
    }
    setTimeout(() => {
      currentSlide -= 1;
      move(currentSlide, DURATION);
    }, 1);
  };
  const next = () => {
    if (currentSlide === images.length + 1) {
      currentSlide = 1;
      move(currentSlide);
    }
    setTimeout(() => {
      currentSlide += 1;
      move(currentSlide, DURATION);
    }, 1);
  };

  const $prevBtn = document.querySelector('.prev');
  const $nextBtn = document.querySelector('.next');

  $prevBtn.addEventListener('click', prev);
  $nextBtn.addEventListener('click', next);

  render();
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpeg',
  'movies/movie-2.jpeg',
  'movies/movie-3.jpeg',
  'movies/movie-4.jpeg',
]);
