function postCircularData(formData)
{
    return fetch('circular-addition', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN":  token
    },
    method: 'POST',
    credentials: "same-origin",
    body: JSON.stringify({
        circular_date: formData.circular_date.value,
        circular_title: formData.circular_title.value,
        circular_content: formData.circular_content.value
    }),
    })
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function handleCircularSubmission(event)
{
    event.preventDefault();
    if (!dateValid(event.target.circular_date.value))
    {
        alert('inserire una data valida!');
    }
    else if (fieldEmpty(event.target.circular_title.value)
    || fieldEmpty(event.target.circular_content.value))
    {
        alert('titolo o contenuto vuoti!');
    }
    else 
    {
        postCircularData(event.target).then((data) => {
            updateFeedbackMessageSpanContent('add-circular-form-block', data);
        });
    }
}
const addCircularForm = document.forms['add_circular'];
const circularDateField = addCircularForm.circular_date;
circularDateField.addEventListener('change', handleDateInput);
addCircularForm.addEventListener('submit', handleCircularSubmission);


