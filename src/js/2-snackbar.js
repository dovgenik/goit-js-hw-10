import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const promisForm = document.querySelector('.form');

const makePromise = ( delay, shouldResolve) => {
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

promisForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target); 
    const data = Object.fromEntries(formData.entries()); 
    
  makePromise( data.delay, (data.state === 'fulfilled' ? true : false))
    .then(value => console.log(`✅ Fulfilled promise in ${value}ms`)) 
    .catch(error => console.log(`❌ Rejected promise in ${error}ms`));
    promisForm.reset();
});