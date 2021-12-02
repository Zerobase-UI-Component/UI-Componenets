const $signinForm = document.querySelector('.form.signin');
const $iconSuccess = document.querySelectorAll('.icon-success');
const $iconError = document.querySelectorAll('.icon-error');
const $signinBtn = document.querySelector('.signin.button');

$signinForm.addEventListener('input', e => {
  const email = $signinForm.userid.value;
  const password = $signinForm.password.value;

  const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const regExpPw = /[\w]{6,12}/;

  const isEmail = regExpEmail.test(email);
  const isPassword = regExpPw.test(password);

  const [idSuccess, pwSuccess] = $iconSuccess;
  const [idError, pwError] = $iconError;

  const inputs = [
    { value: email, isValid: isEmail, success: idSuccess, error: idError },
    { value: password, isValid: isPassword, success: pwSuccess, error: pwError },
  ];

  const toggleIcon = (addIcon, removeIcon) => {
    addIcon && addIcon.classList.add('hidden');
    removeIcon && removeIcon.classList.remove('hidden');
  };

  inputs.forEach(({ value, isValid, success, error }) => {
    if (value) {
      isValid ? toggleIcon(error, success) : toggleIcon(success, error);
      return;
    }
    toggleIcon(success);
    toggleIcon(error);
  });

  inputs.every(({ isValid }) => isValid)
    ? $signinBtn.toggleAttribute('disabled', false)
    : $signinBtn.toggleAttribute('disabled', true);
});

// 올바른 형식 메세지 추가
