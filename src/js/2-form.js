let formData = {
  email: '',
  message: '',
};
const localStorageKey = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');

function inputGo(element) {
  formData[element.target.name] = element.target.value;
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

const feedbackFormElemInput = event => {
  inputGo(event);
};

formData =
  localStorage.getItem(localStorageKey) != null
    ? JSON.parse(localStorage.getItem(localStorageKey))
    : {
        email: '',
        message: '',
      };

for (const key in formData) {
  feedbackForm[key].value = formData[key];
}

feedbackForm.addEventListener('input', feedbackFormElemInput);

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  if (Object.values(formData).every(value => value != '')) {
    console.log(formData);
    localStorage.removeItem(localStorageKey);
    for (const key in formData) {
      formData[key] = '';
    }
    feedbackForm.reset();
  } else {
    alert('Fill please all fields');
  }
});
