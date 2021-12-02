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

window.addEventListener(
  'scroll',
  throttle(() => {
    $scrollIcon.style.display = window.pageYOffset < 100 ? 'none' : 'block';
  }, 100)
);

$scrollIcon.addEventListener('click', () => {
  window.scrollTo(0, 0);
});
