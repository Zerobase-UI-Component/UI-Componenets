import { inputs as signinInfo } from './signin.js';
import { inputs as signupInfo } from './signup.js';

const ERROR_CONTENTS = {
  EMAIL: '이메일 형식에 맞게 입력해주세요.',
  USERNAME: '이름을 입력해주세요.',
  PASSWORD: '영문 또는 숫자 6~12자를 입력해주세요.',
  CONFIRM_PASSWORD: '패스워드가 일치하지 않습니다.',
};

// functions
const isValid = (() => {
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

const setInputs = (inputs, value, isValid, success, error, $errorMsg, errorContent) => {
  inputs.push({ value, isValid, success, error, $errorMsg, errorContent });
};

const toggleIcon = (removeIcon, addIcon) => {
  removeIcon && removeIcon.classList.add('hidden');
  addIcon && addIcon.classList.remove('hidden');
};

document.addEventListener(
  'click',
  ({ target }) => {
    if (!target.parentNode.matches('.link')) return;
    [...document.querySelectorAll('form')].forEach($form => $form.reset());

    const inputs = signinInfo.length ? signinInfo : signupInfo;

    inputs.forEach(({ value, success, error, $errorMsg }) => {
      value = '';
      toggleIcon(success);
      toggleIcon(error);
      $errorMsg.textContent = '';
    });

    signinInfo.length
      ? document.querySelector('.signin.button').toggleAttribute('disabled', true)
      : document.querySelector('.signup.button').toggleAttribute('disabled', true);

    document.querySelector('.form.signin').classList.toggle('hidden');
    document.querySelector('.form.signup').classList.toggle('hidden');
  },
  true
);

export { isValid, setInputs, toggleIcon, ERROR_CONTENTS };
