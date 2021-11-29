// DOMs
const $toggleBtn = document.querySelector('.toggle-button');
console.log($toggleBtn);

// Local storages
let isDark = !!localStorage.getItem('isDark') || false;

// Event Listeners
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

$toggleBtn.addEventListener('click', toggleDark);
