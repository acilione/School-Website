function getTeachersList()
{
    return fetch('teachers')
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function getClassesList()
{
    return fetch('classes')
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function getSubjectsList()
{
    return fetch('subjects')
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function getWeekDays()
{
    return fetch('week-days')
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function getTimes()
{
    return fetch('hours')
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function updateOptions()
{
    const addTeachingForm = document.forms['add_teaching_form'];
    allSelect = addTeachingForm.querySelectorAll('select');
    for (sel of allSelect)
        removeAllChildren(sel);
    getTeachersList().then((data) => {
        for (let elem of data)
        {
            const option = document.createElement('option');
            option.setAttribute('value', elem['id']);
            const optionText = document.createTextNode(elem['cf']+' '+elem['nome']+' '+elem['cognome']);
            addTeachingForm.teacher.appendChild(option);
            option.appendChild(optionText);
        }
    });
    getClassesList().then((data) => {
        for (let elem of data)
        {
            const option = document.createElement('option');
            option.setAttribute('value', elem['id']);
            const optionText = document.createTextNode(elem['numero']+' '+elem['sezione']);
            addTeachingForm.class.appendChild(option);
            option.appendChild(optionText);
        }
    });
    getSubjectsList().then((data) => {
        for (let elem of data)
        {
            const option = document.createElement('option');
            option.setAttribute('value', elem['id']);
            const optionText = document.createTextNode(elem['nome_disciplina']);
            addTeachingForm.subject.appendChild(option);
            option.appendChild(optionText);
        }  
    });
    getWeekDays().then((data) => {
        for (let elem of data)
        {
            const option = document.createElement('option');
            option.setAttribute('value', elem['id']);
            const optionText = document.createTextNode(elem['giorno']);
            addTeachingForm.week_day.appendChild(option);
            option.appendChild(optionText);
        }
    });
    getTimes().then((data) => {
        for (let elem of data)
        {
            const option = document.createElement('option');
            option.setAttribute('value', elem['id']);
            const optionText = document.createTextNode(elem['orario']);
            addTeachingForm.time.appendChild(option);
            option.appendChild(optionText);
        }
    });
}
function postTeachingData(formData)
{
    return fetch('teaching-addition', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
    },     
    method: 'POST',
    credentials: "same-origin",
    body: JSON.stringify({
        teacher: formData.teacher.value,
        class: formData.class.value,
        subject: formData.subject.value,
        week_day: formData.week_day.value,
        time: formData.time.value,
    }),
    })    
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function handleTeachingSubmition(event)
{
    event.preventDefault();
    postTeachingData(event.target).then((data) => {
        updateFeedbackMessageSpanContent('add-teaching-form-block', data);
    });
}
const addTeachingForm = document.forms['add_teaching_form'];
addTeachingForm.addEventListener('submit', handleTeachingSubmition);
