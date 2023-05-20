import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const TIMER_DELAY = 1000;

let intervalId = null;
let selectedDate = null;
let currentDate = null;

let remainingTime = 0;

const refs = {
    input: document.getElementById('datetime-picker'),
    startTimerBtn: document.querySelector('button[data-start]'),
    daysRemaining: document.querySelector('[data-days]'),
    hoursRemaining: document.querySelector('[data-hours]'),
    minutesRemaining: document.querySelector('[data-minutes]'),
    secondsRemaining: document.querySelector('[data-seconds]'),
}

refs.startTimerBtn.disabled = true;
refs.startTimerBtn.addEventListener('click', startTimerBtnHandler);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      onDateCheck(selectedDates);
  },
};

flatpickr(refs.input, options);

function onDateCheck(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    currentDate = new Date().getTime();

    if (selectedDate > currentDate) {
        refs.startTimerBtn.disabled = false;
        return;
    };

    Notify.failure('Please choose a date in the future');
    
};

function startTimerBtnHandler() {
    intervalId = setInterval(() => {
        currentDate = new Date().getTime();
        if (selectedDate - currentDate <= 1000) {
            clearInterval(intervalId);
            refs.startTimerBtn.disabled = true;
            refs.input.disabled = false;
            return
        } else {
            refs.startTimerBtn.disabled = true;
            refs.input.disabled = true;
            currentDate += 1000;
            remainingTime = Math.floor(selectedDate - currentDate);
            convertMs(remainingTime);
        };
  }, TIMER_DELAY)
};

function createMarkup({ days, hours, minutes, seconds }) {
  refs.daysRemaining.textContent = days;
  refs.hoursRemaining.textContent = hours;
  refs.minutesRemaining.textContent = minutes;
  refs.secondsRemaining.textContent = seconds;
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(
        Math.floor((((ms % day) % hour) % minute) / second)
    );
    createMarkup({ days, hours, minutes, seconds });
    return { days, hours, minutes, seconds };
};

//==================== 2 variant ============================//
// const refs = {
//     input: document.getElementById('datetime-picker'),
//     startTimerBtn: document.querySelector('button[data-start]'),
//     daysRemaining: document.querySelector('[data-days]'),
//     hoursRemaining: document.querySelector('[data-hours]'),
//     minutesRemaining: document.querySelector('[data-minutes]'),
//     secondsRemaining: document.querySelector('[data-seconds]'),
// };

// refs.startTimerBtn.disabled = true;
// refs.startTimerBtn.addEventListener('click', onStartTimer);

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//       onDateCheck(selectedDates);
//   },
// };

// function onDateCheck(selectedDates) {
//     selectedDate = selectedDates[0].getTime();
//     currentDate = new Date().getTime();

//     if (selectedDate < currentDate) {
//         Notify.failure('Please choose a date in the future');
        
//     } else {
//         selectedDate = selectedDates[0].getTime();
//         refs.startTimerBtn.disabled = false;
//     };
// };

// flatpickr(refs.input, options);

// const timer = {
//     start() {
//         intervalId = setInterval(() => {
//         currentDate = Date.now();
//         const deltaTime = selectedDate - currentDate;
//         updateTimerFace(convertMs(deltaTime));
//         refs.startTimerBtn.disabled = true;
//         refs.input.disabled = true;

//         if (deltaTime <= 1000) {
//             this.stop();
//             };
//         }, TIMER_DELAY);
//     },

//     stop() {
//         refs.startTimerBtn.disabled = true;
//         refs.input.disabled = false;
//         clearInterval(intervalId);
//         return;
//     },
// };

// function updateTimerFace({ days, hours, minutes, seconds }) {
//     refs.daysRemaining.textContent = `${days}`;
//     refs.hoursRemaining.textContent = `${hours}`;
//     refs.minutesRemaining.textContent = `${minutes}`;
//     refs.secondsRemaining.textContent = `${seconds}`;
// };

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// };

// function onStartTimer() {
//   timer.start();
// };

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = addLeadingZero(Math.floor(ms / day));
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   const seconds = addLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// };

//================ 3 variant ==============//
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";

// const TIMER_DELAY = 1000;

// refs = {
//     input: document.getElementById('datetime-picker'),
//     startTimerBtn: document.querySelector('button[data-start]'),
//     daysRemaining: document.querySelector('[data-days]'),
//     hoursRemaining: document.querySelector('[data-hours]'),
//     minutesRemaining: document.querySelector('[data-minutes]'),
//     secondsRemaining: document.querySelector('[data-seconds]'),
//  };
    
// class Timer {
//   constructor() {
//     this.intervalId = null;
//     this.selectedDate = null;
//     this.currentDate = null;
//     this.remainingTime = 0;
   
//     refs.startTimerBtn.disabled = true;
//     refs.startTimerBtn.addEventListener('click', this.startTimerBtnHandler.bind(this));
    
//     const options = {
//       enableTime: true,
//       time_24hr: true,
//       defaultDate: new Date(),
//       minuteIncrement: 1,
//       onClose: this.onDateCheck.bind(this),
//     };
    
//     flatpickr(refs.input, options);
//   }

//   onDateCheck(selectedDates) {
//     this.selectedDate = selectedDates[0].getTime();
//     this.currentDate = new Date().getTime();

//     if (this.selectedDate > this.currentDate) {
//       refs.startTimerBtn.disabled = false;
//       return;
//     }

//     Notify.failure('Please choose a date in the future');
//   }

//   startTimerBtnHandler() {
//     this.intervalId = setInterval(() => {
//       this.currentDate = new Date().getTime();
//       if (this.selectedDate - this.currentDate <= 1000) {
//         clearInterval(this.intervalId);
//         refs.startTimerBtn.disabled = true;
//         refs.input.disabled = false;
//         return;
//       } else {
//         refs.startTimerBtn.disabled = true;
//         refs.input.disabled = true;
//         this.currentDate += 1000;
//         this.remainingTime = Math.floor(this.selectedDate - this.currentDate);
//         this.convertMs(this.remainingTime);
//       }
//     }, TIMER_DELAY);
//   }

//   createMarkup({ days, hours, minutes, seconds }) {
//     refs.daysRemaining.textContent = days;
//     refs.hoursRemaining.textContent = hours;
//     refs.minutesRemaining.textContent = minutes;
//     refs.secondsRemaining.textContent = seconds;
//   }

//   addLeadingZero(value) {
//     return String(value).padStart(2, '0');
//   }

//   convertMs(ms) {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     const days = this.addLeadingZero(Math.floor(ms / day));
//     const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
//     const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//     const seconds = this.addLeadingZero(
//       Math.floor((((ms % day) % hour) % minute) / second)
//     );
//     this.createMarkup({ days, hours, minutes, seconds });
//     return { days, hours, minutes, seconds };
//   }
// }

// new Timer();
