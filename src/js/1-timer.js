import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let dateEnd;
let intervalId = null;
function obgEnable(objHtml, flag) {
  if (flag) {
    objHtml.removeAttribute('disabled');
  } else {
    objHtml.setAttribute('disabled', '');
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function putTime() {
  const objTime = convertMs(dateEnd - Date.now());
  if (objTime.seconds < 0) {
    clearInterval(intervalId);
    // intervalId = null;
    obgEnable(inputDate, true);
    console.log(objTime.seconds);
    return;
  }
  seconds.textContent = `${objTime.seconds}`.padStart(2, '0');
  minutes.textContent = `${objTime.minutes}`.padStart(2, '0');
  hours.textContent = `${objTime.hours}`.padStart(2, '0');
  days.textContent = `${objTime.days}`.padStart(2, '0');
}

const startBtn = document.querySelector('[data-start]');
const seconds = document.querySelector('[data-seconds]');
const minutes = document.querySelector('[data-minutes]');
const hours = document.querySelector('[data-hours]');
const days = document.querySelector('[data-days]');
const inputDate = document.querySelector('#datetime-picker');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen: function (selectedDates, dateStr, flat) {
    flat.setDate(new Date(), true);
    obgEnable(startBtn, false);
  },
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - Date.now() < 0) {
      alert('Please choose a date in the future');
    } else {
      dateEnd = selectedDates[0];
      obgEnable(startBtn, true);
    }
    
  },
};

startBtn.addEventListener('click', () => {
  obgEnable(startBtn, false);
  obgEnable(inputDate, false);
  intervalId = setInterval(putTime, 1000);
  
});

const fp_1=flatpickr('#datetime-picker', options);
console.log(fp_1);
console.log("00000000000000000000000000000000");
console.log(fp_1.config);