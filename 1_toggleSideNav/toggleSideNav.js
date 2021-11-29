// DOMs
const $toggleBtn = document.querySelector('.toggle');
const $nav = document.querySelector('nav');

// Event handlers
const toggleClassName = () => {
  console.log($nav.classList);
  const isActive = [...$nav.classList].includes('active');
  if (isActive) {
    $nav.classList.remove('active');
  } else {
    $nav.classList.add('active');
  }
};

// Event Handlers 등록
$toggleBtn.addEventListener('click', toggleClassName);
