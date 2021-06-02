function getStudentsListJson() 
{
    return fetch('all-students')
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function updateStudentsList() 
{
    getStudentsListJson().then(function(data){
        const c = document.querySelector('#table-block');
        c.classList.add('scrollable');
        removeAllChildren(c);
        const filterOptions = document.querySelector('#filter-options');
        removeAllChildren(filterOptions);
        const contentDiv = document.querySelector('#table-block');
        const title = document.createElement('h2');
        const table = document.createElement('table');
        table.setAttribute('id', 'students-list');
        contentDiv.appendChild(title);
        contentDiv.appendChild(table);
        const namesRow = document.createElement('tr');
        table.appendChild(namesRow);
        const selectionCol = document.createElement('th');
        const selectionColText = document.createTextNode('select');
        selectionCol.appendChild(selectionColText);
        namesRow.appendChild(selectionCol);
        for (key in data[0])
        {
            const option = document.createElement('option');
            option.setAttribute('value', key);
            const optionText = document.createTextNode(key);
            option.appendChild(optionText)
            filterOptions.appendChild(option);
            const column = document.createElement('th');
            const colValue = document.createTextNode(key);
            namesRow.appendChild(column);
            column.appendChild(colValue);
        }
        for(d of data)
        {
            const tableRow = document.createElement('tr');
            table.appendChild(tableRow);
            const btn = document.createElement('input');
            btn.setAttribute('type', 'radio');
            btn.setAttribute('name', 'student-selection');
            btn.setAttribute('value', d['id']);
            btn.addEventListener('change', checkRadioButtonSelectedShowModifyBtn);
            tableRow.appendChild(btn);
            for(key in d)
            {
                const rowCol = document.createElement('th');
                rowCol.setAttribute('class', key)
                colValue = document.createTextNode(d[key]);
                tableRow.appendChild(rowCol);
                rowCol.appendChild(colValue);
            }
        }
        checkRadioButtonSelectedShowModifyBtn();
    })
}
function filterRows(string, column_class)
{
    let text = string.toLowerCase();
    let rows = document.querySelectorAll('#table-block #students-list tr');
    if (text !== "") {
        for(let i=1; i<rows.length; i++){
            let row_content = rows[i].querySelector('.'+column_class).textContent.toLowerCase();
            if (row_content.indexOf(text) === -1) {
                rows[i].classList.add('hidden');
            }
            else {
                rows[i].classList.remove('hidden');
            }
        }
    }
    else {
        for (let i=1; i<rows.length; i++) {
            rows[i].classList.remove('hidden');
        }
    }
}
function handleSearch(event) 
{
    const filter_opt = document.querySelector('#filter-options').value;
    filterRows(event.target.value, filter_opt);
}
function radioButtonIsChecked()
{
    radioBtns = document.querySelectorAll('input[type=radio]');
    for (let radio of radioBtns)
    {
        if (radio.checked === true)
            return true;
    }
    return false;
}
function checkRadioButtonSelectedShowModifyBtn()
{
    showElementOnCondition(radioButtonIsChecked(), modifyStudentButton);
}
function showModifyStudentForm()
{
    modify_student_form = document.querySelector('form[name=modify_student]')
    modify_student_form.classList.remove('hidden');
    radioButtons = document.querySelectorAll('input[type=radio]');
    for (r of radioButtons)
    {
        if (r.checked === true)
            checkedRow = r.parentElement;
    }
    modify_student_form.student_id.value = checkedRow.querySelector('.id').textContent;
    modify_student_form.cf.value = checkedRow.querySelector('.cf').textContent;
    modify_student_form.name.value = checkedRow.querySelector('.nome').textContent;
    modify_student_form.surname.value = checkedRow.querySelector('.cognome').textContent;
    modify_student_form.email.value = checkedRow.querySelector('.email').textContent;
    modify_student_form.date.value = checkedRow.querySelector('.data_nascita').textContent;
    modify_student_form.sex.value = checkedRow.querySelector('.sesso').textContent;
    modify_student_form.class_num.value = checkedRow.querySelector('.numero').textContent;
    modify_student_form.class_section.value = checkedRow.querySelector('.sezione').textContent;
}
function postModifyStudentData(formData)
{
    return fetch('student-modification', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
    },
    method: 'POST',
    credentials: "same-origin",
    body: JSON.stringify({
        student_id: formData.student_id.value,
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
function handleModifyStudentSubmission(event)
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
        postModifyStudentData(event.target).then((data) => {
            updateFeedbackMessageSpanContent('view-students-block', data);
        });
    }    
}
document.querySelector('#students-rows-filter-bar').addEventListener('keyup', handleSearch);
const modifyStudentButton = document.querySelector('#modify-student-btn');
modifyStudentButton.addEventListener('click', showModifyStudentForm);

const modifyStudentForm = document.forms['modify_student'];
modifyStudentForm.classList.add('hidden');
modifyStudentForm.addEventListener('submit', handleModifyStudentSubmission);

const cfInputField = modifyStudentForm.cf;
cfInputField.addEventListener('keyup', handleCfInput);

const nameInputField = modifyStudentForm.name;
nameInputField.addEventListener('keyup', handleNameInput);

const surnameInputField = modifyStudentForm.surname;
surnameInputField.addEventListener('keyup', handleSurnameInput);

const emailInputField = modifyStudentForm.email;
emailInputField.addEventListener('keyup', handleEmailInput);

const dateInputField = modifyStudentForm.date;
dateInputField.addEventListener('change', handleDateInput);

