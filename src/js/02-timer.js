import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (isDateBigger(selectedDates[0])) Report.warning('Please choose a date in the future', '', 'Okay');
    },
};

const fp = flatpickr("#datetime-picker", options);

const datetimePickerEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');
const dataTimerEls = document.querySelectorAll('.value');
let newDate;
let idTimer;
btnEl.disabled = true;

datetimePickerEl.addEventListener('input', onInput);

btnEl.addEventListener('click', onClick);

function onInput(evt) {
    newDate = new Date(evt.target.value);
    btnEl.disabled = isDateBigger(newDate);
    return
}

function onClick() {
    if (isDateBigger(newDate)) {
        Report.warning('Please choose a date in the future', '', 'Okay');
        toggle(btnEl);
        return
    }
    toggle(btnEl, datetimePickerEl);
    let timer = Math.floor((newDate - new Date()) / 1000);
    idTimer = setInterval(() => {
        timer -= 1;
        updateTimer(convertMs(timer));
        if (timer <= 0) stopTimer();
    }, 1000);
}

function stopTimer() {
    clearInterval(idTimer);
    Report.success('That time has come!', '', 'Okay');
    toggle(btnEl, datetimePickerEl)
}

// ---------- Мій варіант функції-----------
function convertMs(sec) {
    return {
        days: Math.floor(sec / 60 / 60 / 24).toString().padStart(2, 0),
        hours: Math.floor((sec % (60 * 60 * 24)) / 60 / 60).toString().padStart(2, 0),
        minutes: Math.floor((sec % (60 * 60)) / 60).toString().padStart(2, 0),
        seconds: (sec % 60).toString().padStart(2, 0),
    }
}

// function convertMs(ms) {
//     // Number of milliseconds per unit of time
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;
//     // Remaining days
//     const days = Math.floor(ms / day);
//     // Remaining hours
//     const hours = Math.floor((ms % day) / hour);
//     // Remaining minutes
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     // Remaining seconds
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//     return { days, hours, minutes, seconds };
// }

function updateTimer(obj) {
    dataTimerEls.forEach(i => {
        if (i.hasAttribute('data-days')) i.textContent = obj.days;
        if (i.hasAttribute('data-hours')) i.textContent = obj.hours;
        if (i.hasAttribute('data-minutes')) i.textContent = obj.minutes;
        if (i.hasAttribute('data-seconds')) i.textContent = obj.seconds;
    });
}

function toggle(...items) {
    items.forEach(i => i.toggleAttribute('disabled'))
};

function isDateBigger(time) {
    return time <= new Date();
};