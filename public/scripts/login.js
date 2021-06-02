function postLoginData(formData)
{
    return fetch('login', {
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
        login_type: formData.login_type.value
    }),
    })    
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function handleLoginSubmition(event)
{
    event.preventDefault();
    loginForm = document.forms['login'];
    if (fieldEmpty(loginForm.cf.value))
    {
        alert('inserire cf!');
    }
    if (fieldEmpty(loginForm.password.value))
    {
        alert('inserire password!');
    }
    else
    {
        postLoginData(event.target).then((data) => {
            const insertFeedbackSpan = document.querySelector('.insert-feedback-message');
            removeAllChildren(insertFeedbackSpan);
            if (!data.error)
                window.location.replace(data.feedback_message);
            else
            {
                const insertFeedbackSpanText = document.createTextNode(data.feedback_message);
                insertFeedbackSpan.appendChild(insertFeedbackSpanText);
            }
        });
    }
}
loginForm = document.forms['login'];
loginForm.addEventListener('submit', handleLoginSubmition);