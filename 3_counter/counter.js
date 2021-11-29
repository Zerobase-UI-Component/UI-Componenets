const $increaseBtn = document.querySelector('.increase');
const $decreaseBtn = document.querySelector('.decrease');
const $counter = document.querySelector('.counter');

const increase = () => ($counter.textContent = counter.increaseNum());
const decrease = () => ($counter.textContent = counter.decreaseNum());

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

$increaseBtn.addEventListener('click', increase);
$decreaseBtn.addEventListener('click', decrease);
