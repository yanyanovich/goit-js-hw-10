import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
const inputCalendar = document.querySelector('#datetime-picker');
const searchButton = document.querySelector('button');
const intervalTime = 1000;
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
searchButton.disabled = true;
let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      // window.alert('Please choose a date in the future');
      iziToast.show({
        title: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#d32f2f',
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        icon: 'fa fa-exclamation-triangle',
        iconColor: '#ffffff',
        timeout: 5000,
        closeOnClick: true,
        drag: false,
        progressBar: true,
        progressBarColor: '#ffffff',
        animateInside: true,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
        titleSize: '18px',
        messageSize: '16px',
        messageLineHeight: '1.5',
      });
      searchButton.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      searchButton.disabled = false;
      searchButton.addEventListener('click', handleClick);
    }
  },
};
flatpickr(inputCalendar, options);

function handleClick(e) {
  e.target.disabled = true;
  inputCalendar.disabled = true;

  const counter = setInterval(() => {
    const dateNow = new Date();
    const timeLeft = userSelectedDate - dateNow;

    if (timeLeft <= 0) {
      clearInterval(counter);
      daysValue.textContent = '00';
      hoursValue.textContent = '00';
      minutesValue.textContent = '00';
      secondsValue.textContent = '00';
      inputCalendar.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }, intervalTime);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
