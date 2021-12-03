// DOMs
const $toggleBtn = document.querySelector('.toggle-button');
const $toggleButtonSwitch = document.querySelector('.toggle-button-switch');
const $toggleButtonText = document.querySelector('.toggle-button-text');

// Local storages
let isDark = !!localStorage.getItem('isDark') || false;

// Event handlers
const toggleDark = () => {
  if (isDark) {
    localStorage.setItem('isDark', '');
    $body.classList.remove('dark');
    isDark = !isDark;
  } else {
    localStorage.setItem('isDark', 'true');
    $body.classList.add('dark');
    isDark = !isDark;
  }
};

const $body = document.querySelector('body');
localStorage.getItem('isDark') ? $body.classList.add('dark') : $body.classList.remove('dark');
// Event Listeners
$toggleBtn.addEventListener('click', toggleDark);

window.addEventListener('DOMContentLoaded', () => {
  $toggleButtonSwitch.style.transition = 'none';
  $toggleButtonText.style.transition = 'none';
});

window.addEventListener('load', () => {
  $toggleButtonSwitch.style.transition = 'left 0.3s';
  $toggleButtonText.style.transition = 'background-color 0.3s';
});
