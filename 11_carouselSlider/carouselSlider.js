const IMG_WIDTH = 341;

const carousel = ($container, images) => {
  const imgElem =
    images.reduce((acc, cur) => acc + `<img src="${cur}"></img>`, `<img src="${images[images.length - 1]}"></img>`) +
    `<img src="${images[0]}"></img>`;
  $container.innerHTML = `<div class="carousel-slides">${imgElem}</div>
                          <button class="carousel-control prev">&laquo;</button>
                          <button class="carousel-control next">&raquo;</button>`;
  console.log($container.innerHTML);

  $container.style.width = IMG_WIDTH+"px"
  $container.style.opacity = 1
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpeg',
  'movies/movie-2.jpeg',
  'movies/movie-3.jpeg',
  'movies/movie-4.jpeg',
]);
