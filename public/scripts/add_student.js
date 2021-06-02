function postStudentData(formData)
{
    return fetch('student-addition', {
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
        email: formData.email.value,
        name: formData.name.value,
        surname: formData.surname.value,
        class_num: formData.class_num.value,
        class_section: formData.class_section.value,
        date: formData.date.value,
        sex: formData.sex.value
    }),
    })    
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function handleStudentSubmition(event)
{
    event.preventDefault();
    if (
        !cfValid(event.target.cf.value) || 
        !nameValid(event.target.name.value) ||
        !surnameValid(event.target.surname.value) ||
        !emailValid(event.target.email.value) ||
        !dateValid(event.target.date.value)
        )
    {
        alert('FIELDS EMPTY OR WRONG');
    }
    else if (mailAlreadyTaken)
    {
        alert('EMAIL gia\' utilizzata!');
    }
    else if (cfAlreadyTaken)
    {
        alert('Codice Fiscale gia\' utilizzato!');
    }
    else 
    {
        postStudentData(event.target).then((data) => {
            updateFeedbackMessageSpanContent('add-student-form-block', data);
        });
    }    
}

addStudentForm = document.forms['add_student'];
addStudentForm.addEventListener('submit', handleStudentSubmition);

cfInputField = addStudentForm.cf;
cfInputField.addEventListener('keyup', handleCfInput);

nameInputField = addStudentForm.name;
nameInputField.addEventListener('keyup', handleNameInput);

surnameInputField = addStudentForm.surname;
surnameInputField.addEventListener('keyup', handleSurnameInput);

emailInputField = addStudentForm.email;
emailInputField.addEventListener('keyup', handleEmailInput);

dateInputField = addStudentForm.date;
dateInputField.addEventListener('change', handleDateInput);