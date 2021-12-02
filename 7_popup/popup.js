const $popup = document.querySelector('.popup');
const $isBlacked = document.querySelector('.is-blacked');
const $popupMessage = document.querySelector('.popup-message');

document.querySelector('.popup > form').addEventListener('submit', e => {
  e.preventDefault();
  const content = e.target.elements['contents'].value.trim();
  $popupMessage.textContent = content === '' ? '' : `from popup: ${content}`;
  e.target.elements['contents'].value = '';
});

document.querySelector('.toggle-popup').addEventListener('click', () => {
  $popup.classList.remove('is-not-blacked');
  $isBlacked.classList.remove('is-not-blacked');
});

document.querySelector('body').addEventListener('click', ({ target }) => {
  if (
    target.matches('.popup-cancel') ||
    target.matches('.close-btn') ||
    target.matches('.popup-ok') ||
    target.matches('.is-blacked')
  ) {
    $popup.classList.add('is-not-blacked');
    $isBlacked.classList.add('is-not-blacked');
  }
});
