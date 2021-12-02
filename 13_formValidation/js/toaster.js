const toaster = {
  toasts: [],
  add({ type, title, message }) {
    this.toasts.push({ type, title, message });
    this.moveup();
    this.render();
    setTimeout(() => {
      this.remove();
    }, 3000);
  },
  remove() {
    this.toasts.shift();
    const $toast = document.querySelector('.toast');
    if (!$toast) return;
    $toast.remove();
  },
  render() {
    const { type, title, message } = this.toasts[this.toasts.length - 1];

    const $toast = document.createElement('div');
    $toast.classList.add('toast', `toast-${type}`);

    $toast.innerHTML = `<h4 class="toast-heading">${title}</h4>
    <div class="toast-message">
    <svg width="24" height="24">
    <use xlink:href="#${type}" />
    </svg>
    <p>${message}</p>
    </div>
    <a class="close">&times;</a>`;

    document.querySelector('body').appendChild($toast);
    $toast.style.bottom = `0px`;
  },
  moveup() {
    const $toasts = document.querySelectorAll('.toast');
    if (!$toasts.length) return;
    const TOAST_HEIGHT = +window.getComputedStyle($toasts[0]).getPropertyValue('--toast-height').replace(/px/, '');
    $toasts.forEach(toast => {
      toast.style.bottom = `${+toast.style.bottom.replace(/px/, '') + TOAST_HEIGHT}px`;
    });
  },
  close(e) {
    e.preventDefault();
    e.target.parentNode.remove();
  },
};

const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

const createToastAction = (type, title, message) => ({ type, title, message });

document.querySelector('.form.signin').onsubmit = e => {
  e.preventDefault();
  toaster.add(createToastAction(TOAST_TYPE.SUCCESS, 'Well done!', 'Signin Successfully'));
};
document.querySelector('.form.signup').onsubmit = e => {
  e.preventDefault();
  toaster.add(createToastAction(TOAST_TYPE.SUCCESS, 'Well done!', 'Signup Successfully'));
};
document.querySelector('body').onclick = e => {
  if (!e.target.matches('.close')) return;
  toaster.close(e);
};
