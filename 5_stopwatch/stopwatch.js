// Model
let laps = [];
let timerId;

// Model Controllers
const addLaps = time => laps.push({ id: laps.length + 1, time });

const resetLaps = () => {
  laps = [];
};

// DOMs
const $stopWatch = document.querySelector('.stopwatch');
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
        // return [fixDigitMinute(minute), fixDigitSecond(second), fixDigitMilliSecond(milliSecond)];
        return `${fixDigitMinute(minute)}:${fixDigitSecond(second)}:${fixDigitMilliSecond(milliSecond)}`;
      },
      resetTime() {
        time = 0;
        return '00:00:00';
      },
    };
  };
})();

const renderTimer = time => {
  $display.textContent = time;
};

const captureLap = (() => {})();

const renderLaps = laps => {
  $laps.innerHTML = ""
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

// Event Handlers
const toggleStart = $startBtn => {
  if ($startBtn.textContent === 'Start') $startBtn.textContent = 'Stop';
  else $startBtn.textContent = 'Start';
};

const toggleLap = $resetBtn => {
  if ($resetBtn.textContent === 'Reset') $resetBtn.textContent = 'Lap';
  else $resetBtn.textContent = 'Reset';
};

const enableReset = $resetBtn => {
  $resetBtn.removeAttribute('disabled');
};

const disableReset = $resetBtn => {
  $resetBtn.setAttribute('disabled', '');
};

// Event Handlers 등록
$stopWatch.addEventListener('click', e => {
  const text = e.target.textContent;
  if (text === 'Start') {
    toggleStart(e.target);
    toggleLap(e.target.nextElementSibling);
    enableReset(e.target.nextElementSibling);
    timerId = setInterval(() => {
      renderTimer(timer().getTime());
    }, 10);
  }
  if (text === 'Stop') {
    toggleStart(e.target);
    toggleLap(e.target.nextElementSibling);
    clearInterval(timerId);
  }
  if (text === 'Reset') {
    // 스탑워치 초기화
    // $display.textContent = '00:00:00';
    // Reset 버튼 비활성
    disableReset(e.target);
    $display.textContent = timer().resetTime();
    resetLaps();
    renderLaps(laps)

    // laps record 삭제
  } else if (text === 'Lap') {
    // laps 렌더링
    // renderLaps();
    addLaps(timer().getTime());
    renderLaps(laps);
  }
});
