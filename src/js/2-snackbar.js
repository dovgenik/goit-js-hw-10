import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const promisForm = document.querySelector('.form');

const makePromise = (delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

iziToast.settings({
  position: 'topRight', 
  timeout: 5000,
  progressBar: false,
  icon: '',
  close: false,
  maxWidth: 300,
});

promisForm.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  makePromise(data.delay, data.state === 'fulfilled' ? true : false)
    .then(value =>
      iziToast.success({ message: `✅ Fulfilled promise in ${value}ms` })
    )
    .catch(error =>
      iziToast.error({ message: `❌ Rejected promise in ${error}ms` })
    );

  promisForm.reset();
});

