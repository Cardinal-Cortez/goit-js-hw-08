import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = "feedback-form-state";

const formData ={};

const form = document.querySelector(".feedback-form");
initForm();
form.addEventListener("submit", throttle(onFormSubmit, 500));
form.addEventListener("input", e => {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
  });


function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
function initForm() {
  let saveForm = localStorage.getItem(LOCALSTORAGE_KEY);
  if(saveForm){
    saveForm = JSON.parse(saveForm);
    Object.entries(saveForm).forEach(([name, value]) => {
      formData[name] = value;
      form.elements[name].value = value;
    })
  }
}
