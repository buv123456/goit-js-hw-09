import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const data = getData(evt);
  for (let i = 1; i <= data.amount; i += 1) {
    const delayPromise = data.delay + (i - 1) * data.step;
    createPromise(i, delayPromise)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay })// Fulfill
      } else {
        rej({ position, delay })// Reject
      }
    }, delay)
  })
}

function getData(evt) {
  return {
    delay: parseInt(evt.target.elements.delay.value),
    amount: parseInt(evt.target.elements.amount.value),
    step: parseInt(evt.target.elements.step.value),
  }
}
