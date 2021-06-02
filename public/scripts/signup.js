function postWorkerData(formData)
{
    return fetch('signup', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
    },
    method: 'POST',
    credentials: "same-origin",
    body: JSON.stringify({
        cf: formData.cf.value,
        password: formData.password.value,
        email: formData.email.value,
        name: formData.name.value,
        surname: formData.surname.value,
        date: formData.date.value,
        sex: formData.sex.value,
        role: formData.role.value,
        beginning_date: formData.beginning_date.value,
        profile_img: formData.profile_img.value
    }),
    })    
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function handleSignupSubmission(event)
{
    event.preventDefault();
    if (
      !cfValid(event.target.cf.value) || 
      !nameValid(event.target.name.value) ||
      !surnameValid(event.target.surname.value) ||
      !emailValid(event.target.email.value) ||
      !passwordValid(event.target.password.value) ||
      !dateValid(event.target.date.value) ||
      !dateValid(event.target.beginning_date.value) ||
      !sexValid(event.target.sex.value)
      )
    {
        alert('FIELDS EMPTY OR WRONG');
        event.preventDefault();
    }
    else if (mailAlreadyTaken)
    {
        alert('EMAIL gia\' utilizzata!');
        event.preventDefault();
    }
    else if (cfAlreadyTaken)
    {
        alert('Codice Fiscale gia\' utilizzato!');
        event.preventDefault();
    }
    else 
    {
        postWorkerData(event.target).then((data) => {
            const insertFeedbackSpan = document.querySelector('.insert-feedback-message');
            removeAllChildren(insertFeedbackSpan);
            const insertFeedbackSpanText = document.createTextNode(data);
            insertFeedbackSpan.appendChild(insertFeedbackSpanText);
        });
    }    
}
const signupForm = document.forms['signup_form'];
signupForm.addEventListener('submit', handleSignupSubmission);

const cfInputField = signupForm.cf;
cfInputField.addEventListener('keyup', handleCfInput);

const nameInputField = signupForm.name;
nameInputField.addEventListener('keyup', handleNameInput);

const surnameInputField = signupForm.surname;
surnameInputField.addEventListener('keyup', handleSurnameInput);

const emailInputField = signupForm.email;
emailInputField.addEventListener('keyup', handleEmailInput);

const dateInputField = signupForm.date;
dateInputField.addEventListener('change', handleDateInput);

const passwordInputField = signupForm.password;
passwordInputField.addEventListener('keyup', handlePasswordInput);

const beginninDateInputField = signupForm.beginning_date;
beginninDateInputField.addEventListener('change', handleBeginningDateInput);