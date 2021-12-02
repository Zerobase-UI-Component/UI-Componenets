// DOMs
const $toggleBtn = document.querySelector('.toggle-button');

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

// Event Listeners
$toggleBtn.addEventListener('click', toggleDark);
