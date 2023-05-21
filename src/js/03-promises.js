import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  firstDelay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  createPromiseBtn:document.querySelector('button[type="submit"]'),
}

refs.createPromiseBtn.addEventListener('click', onStart);

function onStart(event) {
  event.preventDefault();

  let firstDelay = Number(refs.firstDelay.value);
  let delayStep = Number(refs.delayStep.value);
  let amount = Number(refs.amount.value);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i+1, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
  }
  setTimeout(() => { event.target.form.reset() }, 3000)
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  
}; 




