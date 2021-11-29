// DOMs
const $toggleBtn = document.querySelector('.toggle');
const $nav = document.querySelector('nav');

// Event handlers
const toggleClassName = className => {
  const isActive = [...$nav.classList].includes(className);
  if (isActive) {
    $nav.classList.remove(className);
  } else {
    $nav.classList.add(className);
  }
};

// Event Handlers 등록
$toggleBtn.addEventListener('click', toggleClassName);
