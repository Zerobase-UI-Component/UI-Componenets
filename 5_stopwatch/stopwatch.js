// Model
let laps = [];
let timerId;

const BUTTON_TYPE = {
  START: 'Start',
  RESET: 'Reset',
  STOP: 'Stop',
  LAP: 'Lap',
};

// Model Controllers
const addLaps = time => laps.push({ id: laps.length + 1, time });

const resetLaps = () => {
  laps = [];
};

// DOMs
const $display = document.querySelector('.display');
const $laps = document.querySelector('.laps');

// controllers
const timer = (() => {
  let time = 0; // 10 ms

  return () => {
    time += 1;
    const minute = Math.floor(time / (100 * 60));
    const second = Math.floor(time / 100);
    const milliSecond = Math.floor(time);

    const fixDigitMinute = minute => {
      return minute < 10 ? '0' + minute : minute + '';
    };
    const fixDigitSecond = second => {
      if (second < 10) return '0' + second;
      if (second < 60) return second + '';
      const secondMod = second % 60;
      return secondMod < 10 ? '0' + secondMod : secondMod + '';
    };
    const fixDigitMilliSecond = milliSecond => {
      if (milliSecond < 10) return '0' + milliSecond;
      if (milliSecond < 100) return milliSecond + '';
      const milliSecondMod = milliSecond % 100;
      return milliSecondMod < 10 ? '0' + milliSecondMod : milliSecondMod + '';
    };
    return {
      getTime() {
        return `${fixDigitMinute(minute)}:${fixDigitSecond(second)}:${fixDigitMilliSecond(milliSecond)}`;
      },
      resetTime() {
        time = 0;
        return '00:00:00';
      },
    };
  };
})();

const renderLaps = laps => {
  $laps.innerHTML = '';
  const $fragment = document.createDocumentFragment();
  laps.forEach(({ id, time }) => {
    const $id = document.createElement('div');
    const $time = document.createElement('div');

    $id.textContent = id;
    $time.textContent = time;

    $fragment.append($id, $time);
  });
  $laps.append($fragment);
};

const toggleType = ($btn, BUTTON_TYPE_ORIGIN, BUTTON_TYPE_TARGET) =>
  ($btn.textContent = $btn.textContent === BUTTON_TYPE_ORIGIN ? BUTTON_TYPE_TARGET : BUTTON_TYPE_ORIGIN);

const enableReset = $resetBtn => {
  $resetBtn.removeAttribute('disabled');
};

const disableReset = $resetBtn => {
  $resetBtn.setAttribute('disabled', '');
};

// Event Handlers 등록
document.querySelector('.stopwatch').addEventListener('click', ({ target }) => {
  const type = target.textContent;
  const $resetBtn = target.nextElementSibling;
  switch (type) {
    case BUTTON_TYPE.START:
      toggleType(target, BUTTON_TYPE.START, BUTTON_TYPE.STOP);
      toggleType($resetBtn, BUTTON_TYPE.RESET, BUTTON_TYPE.LAP);
      enableReset($resetBtn);
      timerId = setInterval(() => {
        $display.textContent = timer().getTime();
      }, 10);
      break;
    case BUTTON_TYPE.STOP:
      toggleType($resetBtn, BUTTON_TYPE.RESET, BUTTON_TYPE.LAP);
      toggleType(target, BUTTON_TYPE.START, BUTTON_TYPE.STOP);
      clearInterval(timerId);
      break;
    case BUTTON_TYPE.RESET:
      disableReset(target);
      $display.textContent = timer().resetTime();
      resetLaps();
      renderLaps(laps);
      break;
    case BUTTON_TYPE.LAP:
      addLaps(timer().getTime());
      renderLaps(laps);
      break;
    default:
      console.log('Error');
  }
});
