const $togglePopup = document.querySelector('.toggle-popup');
const $popup = document.querySelector('.popup');
const $isBlacked = document.querySelector('.is-blacked');
const $popupForm = document.querySelector('.popup > form');
const $popupCancel = document.querySelector('.popup-cancel');
const $popupMessage = document.querySelector('.popup-message');

$togglePopup.addEventListener('click', () => {
  $popup.classList.remove('is-not-blacked');
  $isBlacked.classList.remove('is-not-blacked');
});

$popupForm.addEventListener('submit', e => {
  e.preventDefault();
  const content = e.target.elements['contents'].value.trim();
  $popupMessage.textContent = content === '' ? '' : `from popup: ${content}`;
  e.target.elements['contents'].value = '';
});

$isBlacked.addEventListener('click', () => {
  if (!$popup.classList.contains('is-not-blacked')) {
    $popup.classList.add('is-not-blacked');
    $isBlacked.classList.add('is-not-blacked');
  }
});

$popup.addEventListener('click', e => {
  if (e.target.matches('.popup-cancel') || e.target.matches('.close-btn') || e.target.matches('.popup-ok')) {
    $popup.classList.add('is-not-blacked');
    $isBlacked.classList.add('is-not-blacked');
  }
});
