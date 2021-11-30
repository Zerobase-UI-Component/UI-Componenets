let currentSlide = 0;

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
    console.log(IMG_WIDTH);

    $container.style.width = IMG_WIDTH + padding + 'px';
    $container.style.opacity = 1;

    // currentSlide 가져와서 재할당
    currentSlide = +window
      .getComputedStyle(document.querySelector('.carousel-slides'))
      .getPropertyValue('--currentSlide');

    document
      .querySelector('.carousel-slides')
      .style.setProperty('--currentSlide', currentSlide > images.length + 1 ? 0 : currentSlide);
  };

  const prev = () => {
    currentSlide = currentSlide < 1 ? images.length - 1 : currentSlide - 1;

    document.querySelector('.carousel-slides').style.setProperty('--currentSlide', currentSlide);
  };
  const next = () => {
    currentSlide = currentSlide > images.length - 2 ? 0 : currentSlide + 1;

    document.querySelector('.carousel-slides').style.setProperty('--currentSlide', currentSlide);
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
