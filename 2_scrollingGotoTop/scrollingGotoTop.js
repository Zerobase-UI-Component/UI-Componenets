const $scrollIcon = document.querySelector('.scroll-icon');

const throttle = (callback, delay) => {
  let timeId;

  return event => {
    if (timeId) return;
    timeId = setTimeout(
      () => {
        callback(event);
        timeId = null;
      },
      delay,
      event
    );
  };
};

const goToTop = () => {
  window.scrollTo(0, 0);
};

window.addEventListener(
  'scroll',
  throttle(() => {
    if (window.pageYOffset < 100) {
      $scrollIcon.style.display = 'none';
    } else if (window.pageYOffset >= 100) {
      $scrollIcon.style.display = 'block';
    }
  }, 100)
);

$scrollIcon.addEventListener('click', goToTop);
