var cfAlreadyTaken = 0;

function handleCfInput(event)
{
    cfTakenErrorSpan = event.target.parentElement.querySelector('span.cf_taken_error');
    if (event.target.value.length > 0 && !cfValid(event.target.value)) 
    {
        error_span = event.target.parentElement.querySelector('span.cf_error');
        error_span.classList.remove('hidden');
        cfTakenErrorSpan.classList.add('hidden');
    }
    else
    {
        event.target.parentElement.querySelector('span.cf_error').classList.add('hidden');
        cfTaken(event.target.value).then((data) => {     
          if (data.length !== 0)
          {
            cfAlreadyTaken = 1;
            cfTakenErrorSpan.classList.remove('hidden');
          }
          else
          {
            cfAlreadyTaken = 0;
            cfTakenErrorSpan.classList.add('hidden');      
          }
        });
    }
}
function handleNameInput(event)
{
    const display_condition = (event.target.value.length > 0 && !nameValid(event.target.value))
    const error_span = event.target.parentElement.querySelector('span.name_error'); 
    showElementOnCondition(display_condition, error_span);
}
function handleSurnameInput(event)
{
    const display_condition = (event.target.value.length > 0 && !surnameValid(event.target.value));
    const error_span = event.target.parentElement.querySelector('span.surname_error');
    showElementOnCondition(display_condition, error_span);
}
function handleDateInput(event)
{
    const display_condition = (!dateValid(event.target.value));
    const error_date_span = event.target.parentElement.querySelector('span.date_error');
    showElementOnCondition(display_condition, error_date_span);
}
function handleBeginningDateInput(event)
{
    const display_condition = (!dateValid(event.target.value));
    const error_beginning_date_span = event.target.parentElement.querySelector('span.beginning_date_error');
    showElementOnCondition(display_condition, error_beginning_date_span);
}
function handlePasswordInput(event)
{
    const display_condition = (!passwordValid(event.target.value));
    const error_span = event.target.parentElement.querySelector('span.password_error');
    showElementOnCondition(display_condition, error_span);
}
var mailAlreadyTaken = 0;
function handleEmailInput(event)
{
    const mail_taken_error_span = event.target.parentElement.querySelector('span.email_taken_error');
    if (event.target.value.length > 0 && !emailValid(event.target.value)) 
    {
        const error_span = event.target.parentElement.querySelector('span.email_error');
        error_span.classList.remove('hidden');
        mail_taken_error_span.classList.add('hidden');
    }
    else
    {
        event.target.parentElement.querySelector('span.email_error').classList.add('hidden');
        emailTaken(event.target.value).then((data) => {     
          if (data.length !== 0)
            {
              mailAlreadyTaken = 1;
              mail_taken_error_span.classList.remove('hidden');
            }
            else
            {
              mailAlreadyTaken = 0;
              mail_taken_error_span.classList.add('hidden');      
            }
        });
    }
}
function cfTaken(cf_string)
{
    return fetch('cf-availability-check', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
    },
	method: 'POST',
    credentials: "same-origin",
	body: JSON.stringify({
		cf: cf_string
	}),
    })    
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function emailTaken(mail_string) 
{
    return fetch('email-availability-check', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
    },
	method: 'POST',
    credentials: "same-origin",
	body: JSON.stringify({
		email_address: mail_string
	}),
    })    
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}

//questa si puo cancellare
//function handleSubmission(event) 
//{
//    if (
//      !cfValid(event.target.cf.value) || 
//      !nameValid(event.target.name.value) ||
//      !surnameValid(event.target.surname.value) ||
//      !emailValid(event.target.email.value) ||
//      !dateValid(event.target.date.value)
//      )
//    {
//        alert('FIELDS EMPTY OR WRONG');
//        event.preventDefault();
//    }
//    else if (mailAlreadyTaken)
//    {
//        alert('EMAIL gia\' utilizzata!');
//        event.preventDefault();
//    }
//    else if (cfAlreadyTaken)
//    {
//        alert('Codic Fiscale gia\' utilizzato!');
//        event.preventDefault();
//    }
//}
