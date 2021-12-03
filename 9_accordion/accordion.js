
let $activeContainer = document.querySelector('.menu-container.active > .submenu');

document.querySelector('.accordion').addEventListener('click', ({ target }) => {
  if (!target.matches('.menu')) return;

  const $activeSubmenu = target.nextElementSibling;
  $activeContainer = document.querySelector('.menu-container.active > .submenu');

  $activeContainer.parentNode.classList.remove('active');
  target.parentNode.classList.add('active');

  $activeContainer.style.height = '0px';
  $activeSubmenu.style.height = `${$activeSubmenu.scrollHeight}px`;
});

window.addEventListener('DOMContentLoaded', () => {
  $activeContainer.style.transition = 'none';
  $activeContainer.style.height = `${$activeContainer.scrollHeight}px`;
});

window.addEventListener('load', () => {
  $activeContainer.style.transition = 'height 0.4s ease';
});
