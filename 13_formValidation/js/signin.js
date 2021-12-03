import { isValid, setInputs, toggleIcon, ERROR_CONTENTS } from './utils.js';

let inputs = [];

const $signinForm = document.querySelector('.form.signin');
const $iconSuccess = document.querySelectorAll('.icon-success');
const $iconError = document.querySelectorAll('.icon-error');
const $signinBtn = document.querySelector('.signin.button');
const $errorMsg = document.querySelectorAll('.error');

$signinForm.addEventListener('input', () => {
  const email = $signinForm.userid.value;
  const password = $signinForm.password.value;

  const [idSuccess, pwSuccess] = $iconSuccess;
  const [idError, pwError] = $iconError;
  const [$idMsg, $pwMsg] = $errorMsg;

  inputs = [];

  setInputs(inputs, email, isValid('email', email), idSuccess, idError, $idMsg, ERROR_CONTENTS.EMAIL);
  setInputs(inputs, password, isValid('password', password), pwSuccess, pwError, $pwMsg, ERROR_CONTENTS.PASSWORD);

  inputs.forEach(({ value, isValid, success, error, $errorMsg, errorContent }) => {
    if (value) {
      if (isValid) {
        toggleIcon(error, success);
        $errorMsg.textContent = '';
        return;
      }
      toggleIcon(success, error);
      $errorMsg.textContent = errorContent;

      return;
    }
    toggleIcon(success);
    toggleIcon(error);
    $errorMsg.textContent = '';
  });
  console.log('inputs', inputs);
  if (inputs.every(({ isValid }) => isValid)) {
    $signinBtn.toggleAttribute('disabled', false);
    console.log('is Valid');
  } else {
    $signinBtn.toggleAttribute('disabled', true);
    console.log('invalid');
  }
});

document.addEventListener('click', ({ target }) => {
  if (!target.parentNode.matches('.link')) return;
  // location.reload();
  document.querySelector('.form.signin').classList.toggle('hidden');
  document.querySelector('.form.signup').classList.toggle('hidden');
});
