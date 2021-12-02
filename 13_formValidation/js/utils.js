// Model
const inputs = [];

// DOMs
const $signupForm = document.querySelector('.form.signup');
const $iconSuccess = document.querySelectorAll('.icon-success');
const $iconError = document.querySelectorAll('.icon-error');
const $signupBtn = document.querySelector('.signup.button');
const $errorMsg = document.querySelectorAll('.error');

const ERROR_CONTENTS = {
  EMAIL: '이메일 형식에 맞게 입력해주세요.',
  USERNAME: '이름을 입력해주세요.',
  PASSWORD: '영문 또는 숫자 6~12자를 입력해주세요.',
  CONFIRM_PASSWORD: '패스워드가 일치하지 않습니다.',
};

// functions
export const isValid = (() => {
  const regExp = {
    email: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    password: /[\w]{6,12}/,
  };
  return (type, value, targetValue = '') => {
    if (regExp[`${type}`]) {
      return regExp[`${type}`].test(value);
    } else if (type === 'username') {
      return !!value.length;
    }
    return value === targetValue;
  };
})();

export const setInputs = (value, isValid, success, error, $errorMsg, errorContent) => {
  inputs.push({ value, isValid, success, error, $errorMsg, errorContent });
};

$signupForm.addEventListener('input', () => {
  const email = $signupForm.userid.value;
  const password = $signupForm.password.value;
  const username = $signupForm.username.value;
  const confirmPassword = $signupForm['confirm-password'].value;

  const [, , idSuccess, nameSuccess, pwSuccess, confirmSuccess] = $iconSuccess;
  const [, , idError, nameError, pwError, confirmError] = $iconError;
  const [, , $idMsg, $nameMsg, $pwMsg, $confirmMsg] = $errorMsg;

  setInputs(email, isValid('email', email), idSuccess, idError, $idMsg, ERROR_CONTENTS.EMAIL);
  setInputs(username, isValid('username', username), nameSuccess, nameError, $nameMsg, ERROR_CONTENTS.USERNAME);
  setInputs(password, isValid('password', password), pwSuccess, pwError, $pwMsg, ERROR_CONTENTS.PASSWORD);
  setInputs(
    confirmPassword,
    isValid('confirmPassword', confirmPassword, password),
    confirmSuccess,
    confirmError,
    $confirmMsg,
    ERROR_CONTENTS.CONFIRM_PASSWORD
  );

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

// module.exports = {
//   isValid,
//   setInputs,
// };

// export { isValid, setInputs };
