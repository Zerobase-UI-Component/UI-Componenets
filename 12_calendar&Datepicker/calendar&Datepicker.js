// functions
const getLastDateOfMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayofMonth = (year, month) => new Date(year, month, 1).getDay();
const getDateInfo = Date => {
  year = Date.getFullYear();
  month = Date.getMonth(); // 1 더하지 않은 값
  date = Date.getDate();
  firstDay = getFirstDayofMonth(year, month);
  lastDate = getLastDateOfMonth(year, month);
  return {
    year,
    month,
    date,
    firstDay,
    lastDate,
  };
};
const monthToString = month =>
  [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][month];

// Date
const today = new Date();

let year = today.getFullYear();
let month = today.getMonth(); // 1 더하지 않은 값
let date = today.getDate();
let day = today.getDay();
let lastDate = getLastDateOfMonth(year, month);

// DOMs
const $datePicker = document.querySelector('.date-picker');
const $calendar = document.querySelector('.calendar');
const $dateGrids = document.querySelectorAll('.date');

// functions
const datePicked = $date => {
  $date.classList.add('date-picked');
};
const dateUnpicked = $date => {
  $date.classList.remove('date-picked');
};

// render
const render = ({ year, month, date, firstDay, lastDate }) => {
  const SUN = 7 - firstDay === 7 ? 0 : 7 - firstDay;
  const currMonth = [...$dateGrids].slice(firstDay, firstDay + lastDate);
  currMonth.forEach(($date, i) => {
    $date.textContent = i + 1;
    $date.classList.add('cur-month');
    $date.classList.remove('prev-month', 'next-month');
    if (i === date - 1) {
      datePicked($date);
      return;
    }
    i % 7 === SUN ? $date.classList.add('sunday') : $date.classList.remove('sunday');
    dateUnpicked($date);
  });

  document.querySelector('.nav-month > h5').textContent = year;
  document.querySelector('.nav-month > h4').textContent = monthToString(month);
  const prevMonth = [...$dateGrids].slice(0, firstDay);
  const lastDateOfPrevMonth = getLastDateOfMonth(year, month - 1);
  const prevMonthLen = prevMonth.length;
  prevMonth.forEach(($date, i) => {
    $date.textContent = lastDateOfPrevMonth - (prevMonthLen - 1 - i);
    $date.classList.add('prev-month');
    $date.classList.remove('sunday');
    dateUnpicked($date);
  });

  const nextMonth = [...$dateGrids].slice(firstDay + lastDate);
  nextMonth.forEach(($date, i) => {
    $date.textContent = i + 1;
    $date.classList.add('next-month');
    $date.classList.remove('sunday');
    dateUnpicked($date);
  });
};

// Constants
const CALENDAR_SIZE = window.getComputedStyle($calendar).getPropertyValue('--calendar-size');

// Event Listener
$datePicker.addEventListener('click', () => {
  $calendar.classList.remove('display-none');
});

document.querySelector('body').addEventListener('click', ({ target }) => {
  if (
    target.matches('.move-month') ||
    target.parentNode.matches('.nav-month') ||
    target.matches('.days') ||
    target.matches('.date-picker')
  ) {
    return;
  }
  $calendar.classList.add('display-none');
});

document.addEventListener('DOMContentLoaded', () => {
  render(getDateInfo(today));
});

document.querySelector('.calender-nav').addEventListener('click', ({ target }) => {
  if (!target.matches('.move-month')) return;
  month = target.matches('.prev-btn') ? month - 1 : target.matches('.next-btn') ? month + 1 : month;
  date = getLastDateOfMonth(year, month) < date ? getLastDateOfMonth(year, month) : date;
  render(getDateInfo(new Date(year, month, date)));
});

const formatDate = (() => {
  const format = n => (n < 10 ? '0' + n : n + '');
  return date => `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(date.getDate())}`;
})();

document.querySelector('.calendar-grid').addEventListener('click', ({ target }) => {
  if (!target.matches('.date')) return;

  month = target.classList.contains('prev-month')
    ? month - 1
    : target.classList.contains('next-month')
    ? month + 1
    : month;
  date = +target.textContent;

  const pickedDate = new Date(year, month, date);
  const dateInfo = getDateInfo(pickedDate);
  const dateStr = formatDate(pickedDate);

  $calendar.classList.add('display-none');
  $datePicker.value = dateStr;

  console.log(dateStr);

  render(dateInfo);
});
