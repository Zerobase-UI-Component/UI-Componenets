const toaster = {
  toasts: [],
  add({ type, title, message }) {
    this.toasts.push({ type, title, message });
    this.moveup();
    this.render();
    setTimeout(() => {
      this.remove();
    }, 10000);
  },
  remove() {
    this.toasts.shift();
    const $container = document.querySelector('.container');
    $container.children[0].remove();
  },
  render() {
    const { type, title, message } = this.toasts[this.toasts.length - 1];

    const $container = document.createElement('div');

    // $fragment.innerHTML = this.toasts.reduce(
    //   (acc, { type, title, message }) =>
    //     acc +
    //     `<div class="toast toast-${type}">
    //     <h4 class="toast-heading">${title}</h4>
    //     <div class="toast-message">
    //         <svg width="24" height="24">
    //         <use xlink:href="#${type}" />
    //         </svg>
    //         <p>${message}</p>
    //         </div>
    //         <a class="close">&times;</a>
    //         </div>`,
    //   ''
    // );

    $container.innerHTML = `<div class="toast toast-${type}">
    //     <h4 class="toast-heading">${title}</h4>
    //     <div class="toast-message">
    //         <svg width="24" height="24">
    //         <use xlink:href="#${type}" />
    //         </svg>
    //         <p>${message}</p>
    //         </div>
    //         <a class="close">&times;</a>
    //         </div>`;

    document.querySelector('body').appendChild($container);
    console.log(document.querySelector('body'));
  },
  moveup() {
    const TOAST_HEIGHT = 100;
    const $toasts = document.querySelectorAll('.toast');
    if (!$toasts) return;
    $toasts.forEach(toast => {
      console.log(toast.style.bottom);
      toast.style.bottom = `${+toast.style.bottom.replace(/px/, '') + TOAST_HEIGHT}px`;
      // toast.style.bottom = `500px`;
      console.log('moveup', toast, +toast.style.bottom.replace(/px/, ''));
    });
  },
};

const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

const createToastAction = (type, title, message) => ({ type, title, message });

document.querySelector('.show-success').onclick = () =>
  toaster.add(createToastAction(TOAST_TYPE.SUCCESS, 'Well done!', 'This is a success alert'));

document.querySelector('.show-error').onclick = () =>
  toaster.add(createToastAction(TOAST_TYPE.ERROR, 'Check it out!', 'This is a error alert'));

document.querySelector('.show-warning').onclick = () =>
  toaster.add(createToastAction(TOAST_TYPE.WARNING, 'Check it out!', 'This is a warning alert'));
