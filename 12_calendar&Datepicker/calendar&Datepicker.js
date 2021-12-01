// 당월이 며칠까지 인지
const getLastDateOfMonth = (year, month) => new Date(year, month + 1, 0).getDate();

// 당월 시작이 무슨 요일인지
const getFirstDayofCurrMonth = (year, month) => new Date(year, month, 1).getDay();

// 전월이 며칠로 끝나는지 (&무슨 요일인지)
const getLastDateOfPrevMonth = (year, month) => new Date(year, month, 0).getDate();

// 내월이 무슨 요일로 시작하는지
const getFirstDateOfNextMonth = (year, month) => new Date(year, month + 1, 1).getDate();

// 달 -> 영어 전환
const monthToString = month => {
  const monthStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthStr[month];
};

// Date
// 당일 객체
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth(); // 1 더하지 않은 값
const todayDate = today.getDate();
const todayDay = today.getDay();
const todayLastDate = getLastDateOfMonth(todayYear, todayMonth);

// picked date

let year = today.getFullYear();
let month = today.getMonth(); // 1 더하지 않은 값
let date = today.getDate();
let day = today.getDay();
let lastDate = getLastDateOfMonth(year, month);
const getDateInfo = Date => {
  year = Date.getFullYear();
  month = Date.getMonth(); // 1 더하지 않은 값
  date = Date.getDate();
  day = Date.getDay();
  lastDate = getLastDateOfMonth(year, month);
  return {
    year,
    month,
    date,
    day,
    lastDate,
  };
};

// DOMs
const $datePicker = document.querySelector('.date-picker');
const $calendar = document.querySelector('.calendar');
const $dateGrids = document.querySelectorAll('.date');
const $navMonth = document.querySelector('.nav-month > h4');
const $navYear = document.querySelector('.nav-month > h5');

// functions

const datePicked = $date => {
  $date.classList.add('date-picked');
  $date.style.color = '#fff';
};
const dateUnpicked = $date => {
  $date.classList.remove('date-picked');
  $date.style.color = 'black';
  console.log('unpicked');
};

// render

const render = ({ year, month, date, day, lastDate }) => {
  const SUN = 7 - day;
  const currMonth = [...$dateGrids].slice(day, day + lastDate);
  currMonth.forEach(($date, i) => {
    $date.textContent = i + 1;
    $date.style.color = 'black';
    $date.classList.remove('prevMonth', 'nextMonth');
    if (i === date - 1) {
      datePicked($date);
    } else {
      dateUnpicked($date);
    }
    if (i % 7 === SUN) $date.style.color = 'red';
  });

  $navYear.textContent = year;
  $navMonth.textContent = monthToString(month);
  const prevMonth = [...$dateGrids].slice(0, day);
  const lastDateOfPrevMonth = getLastDateOfMonth(year, month - 1);
  const prevMonthLen = prevMonth.length;
  prevMonth.forEach(($date, i) => {
    $date.textContent = lastDateOfPrevMonth - (prevMonthLen - 1 - i);
    $date.classList.add('prevMonth');
    dateUnpicked($date);
    $date.style.color = '';
  });

  const nextMonth = [...$dateGrids].slice(day + lastDate);
  nextMonth.forEach(($date, i) => {
    $date.textContent = i + 1;
    $date.classList.add('nextMonth');

    dateUnpicked($date);
    $date.style.color = '';
  });
  console.log(prevMonth);
};

// Constants
const CALENDAR_SIZE = window.getComputedStyle($calendar).getPropertyValue('--calendar-size');

// Event Listener
$datePicker.addEventListener('click', () => {
  $calendar.classList.remove('display-none');
});

document.querySelector('body').addEventListener('click', e => {
  // 고치기
  if (e.target.matches('body')) $calendar.classList.add('display-none');
});

document.addEventListener('DOMContentLoaded', () => {
  render(getDateInfo(today));
});

document.querySelector('.prev-btn').addEventListener('click', () => {
  month -= 1;
  const lastMonthDate = new Date(year, month, date);

  render(getDateInfo(lastMonthDate));
});

document.querySelector('.next-btn').addEventListener('click', () => {
  month += 1;
  const nextMonthDate = new Date(year, month, date);

  render(getDateInfo(nextMonthDate));
});

// date hover 이벤트

document.querySelector('.calendar-grid').addEventListener('click', ({ target }) => {
  if (!target.matches('.date')) return;
  console.log('date-clicked');
  // 클릭 시 꺼짐
  // 내년으로 조정
  month = target.classList.contains('prevMonth')
    ? month - 1
    : target.classList.contains('nextMonth')
    ? month + 1
    : month;
  date = +target.textContent;
  const pickedDate = new Date(year, month, date);
  getDateInfo(pickedDate);
  // 다른 달 선택 시 날짜 input class='date-picker' 에 value로 표시
  $datePicker.value = `${year}-${month}-${date}`;
  console.log($datePicker.value);
});
