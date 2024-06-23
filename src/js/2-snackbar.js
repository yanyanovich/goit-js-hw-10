import iziToast from 'izitoast';
const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const delay = form.querySelector('input[name="delay"]').value;
  const state = form.querySelector('input[type="radio"]:checked').value;

  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  myPromise
    .then(delay => {
      iziToast.show({
        title: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: 'green',
        titleColor: '#ffff',
        messageColor: '#ffff',
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
    })
    .catch(delay => {
      iziToast.show({
        title: `❌ Rejected promise in ${delay}ms`,
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
    });
}
