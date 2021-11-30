// DOMs
const $toggleBtn = document.querySelector('.toggle');
const $nav = document.querySelector('nav');

// Event handlers
const toggleClassName = ($Element, className) => {
  const isActive = [...$Element.classList].includes(className);
  if (isActive) {
    $Element.classList.remove(className);
  } else {
    $Element.classList.add(className);
  }
};

// Event Handlers 등록
$toggleBtn.addEventListener('click', () => {
  toggleClassName($nav, 'active');
});
