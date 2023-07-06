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
        if (!isDateBigger) Report.warning('Please choose a date in the future', '', 'Okay');
    },
};

const fp = flatpickr("#datetime-picker", options);

const datetimePickerEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');
const dataTimerEls = document.querySelectorAll('.value');
let newDate;
let isDateBigger;
let idTimer;
btnEl.disabled = true;

datetimePickerEl.addEventListener('input', onInput)

function onInput(evt) {
    newDate = new Date(evt.target.value);
    isDateBigger = newDate > options.defaultDate;
    btnEl.disabled = isDateBigger ? false : true;
    console.log(options);
    return
}

btnEl.addEventListener('click', onClick)

function onClick() {
    toggle(btnEl, datetimePickerEl);
    let timer = Math.floor((newDate - new Date()) / 1000);
    idTimer = setInterval(() => {
        timer -= 1;
        updateTimer(objTimer(timer));
        if (timer <= 0) stopTimer();
    }, 1000);
}

function stopTimer() {
    clearInterval(idTimer);
    Report.success('That time has come!', '', 'Okay');
    toggle(btnEl, datetimePickerEl)
}

function objTimer(sec) {
    return {
        days: Math.floor(sec / 60 / 60 / 24).toString().padStart(2, 0),
        hours: Math.floor((sec % (60 * 60 * 24)) / 60 / 60).toString().padStart(2, 0),
        minutes: Math.floor((sec % (60 * 60)) / 60).toString().padStart(2, 0),
        seconds: Math.floor(sec % 60).toString().padStart(2, 0),
    }
}

function updateTimer(obj) {
    dataTimerEls.forEach(i => {
        if (i.hasAttribute('data-days')) i.textContent = obj.days;
        if (i.hasAttribute('data-hours')) i.textContent = obj.hours;
        if (i.hasAttribute('data-minutes')) i.textContent = obj.minutes;
        if (i.hasAttribute('data-seconds')) i.textContent = obj.seconds;
    });
}

function toggle(...items) { items.forEach(i => i.toggleAttribute('disabled')) };
