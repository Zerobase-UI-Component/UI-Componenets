const $hour = document.querySelector('.hour');
const $minute = document.querySelector('.minute');
const $second = document.querySelector('.second');

setInterval(() => {
  const secondCurrDeg = +window.getComputedStyle($second, null).getPropertyValue('--deg');
  const minuteCurrDeg = +window.getComputedStyle($minute, null).getPropertyValue('--deg');
  const hourCurrDeg = +window.getComputedStyle($hour, null).getPropertyValue('--deg');
  $second.style.setProperty('--deg', secondCurrDeg + 6);
  $minute.style.setProperty('--deg', minuteCurrDeg + 6 / 60);
  $hour.style.setProperty('--deg', hourCurrDeg + 6 / (60 * 60));
}, 1000);
