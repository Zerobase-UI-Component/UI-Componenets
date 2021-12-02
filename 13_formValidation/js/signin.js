const $signinForm = document.querySelector('.form.signin');
const $iconSuccess = document.querySelectorAll('.icon-success');
const $iconError = document.querySelectorAll('.icon-error');
const $signinBtn = document.querySelector('.signin.button');
const $errorMsg = document.querySelectorAll('.error');
const $link = document.querySelectorAll('.link');

$signinForm.addEventListener('input', e => {
  const email = $signinForm.userid.value;
  const password = $signinForm.password.value;

  const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const regExpPw = /[\w]{6,12}/;

  const isEmail = regExpEmail.test(email);
  const isPassword = regExpPw.test(password);

  const [idSuccess, pwSuccess] = $iconSuccess;
  const [idError, pwError] = $iconError;
  const [$idMsg, $pwMsg] = $errorMsg;

  const inputs = [];

  const setInputs = (value, isValid, success, error, $errorMsg, errorContent) => {
    inputs.push({ value, isValid, success, error, $errorMsg, errorContent });
  };
  setInputs(email, isEmail, idSuccess, idError, $idMsg, '이메일 형식에 맞게 입력해주세요.');
  setInputs(password, isPassword, pwSuccess, pwError, $pwMsg, '영문 또는 숫자 6~12자를 입력해주세요.');

  const toggleIcon = (addIcon, removeIcon) => {
    addIcon && addIcon.classList.add('hidden');
    removeIcon && removeIcon.classList.remove('hidden');
  };

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

  inputs.every(({ isValid }) => isValid)
    ? $signinBtn.toggleAttribute('disabled', false)
    : $signinBtn.toggleAttribute('disabled', true);
});

document.addEventListener('click', ({ target }) => {
  if (!target.parentNode.matches('.link')) return;
  document.querySelector('.form.signin').classList.toggle('hidden');
  document.querySelector('.form.signup').classList.toggle('hidden');
});
