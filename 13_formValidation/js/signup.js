const $signupForm = document.querySelector('.form.signup');
const $iconSuccess = document.querySelectorAll('.icon-success');
const $iconError = document.querySelectorAll('.icon-error');
const $signupBtn = document.querySelector('.signup.button');
const $errorMsg = document.querySelectorAll('.error');

$signupForm.addEventListener('input', () => {
  const email = $signupForm.userid.value;
  const password = $signupForm.password.value;
  const username = $signupForm.username.value;
  const confirmPassword = $signupForm["confirm-password"].value;


  const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const regExpPw = /[\w]{6,12}/;
  const regUsername = /[/w]/

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
    ? $signupBtn.toggleAttribute('disabled', false)
    : $signupBtn.toggleAttribute('disabled', true);
});

