const $counter = document.querySelector('.counter');

const counter = (function () {
  let num = 0;

  return {
    increaseNum() {
      return ++num;
    },
    decreaseNum() {
      num = --num < 0 ? 0 : num;
      return num;
    },
  };
})();

document.querySelector('.increase').addEventListener('click', () => {
  $counter.textContent = counter.increaseNum();
});
document.querySelector('.decrease').addEventListener('click', () => {
  $counter.textContent = counter.decreaseNum();
});
