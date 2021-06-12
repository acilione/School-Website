function getWorkersListJson() 
{
    return fetch('all-workers')
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function updateWorkersList() 
{
    getWorkersListJson().then(function(data){
        const c = document.querySelector('#workers-table-block');
        c.classList.add('scrollable');
        removeAllChildren(c);
        const workersFilterOptions = document.querySelector('#workers-filter-options');
        removeAllChildren(workersFilterOptions);
        const contentDiv = document.querySelector('#workers-table-block');
        const title = document.createElement('h2');
        const table = document.createElement('table');
        table.setAttribute('id', 'workers-list');
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
            workersFilterOptions.appendChild(option);
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
function filterWorkersTableRows(string, column_class)
{
    let text = string.toLowerCase();
    let rows = document.querySelectorAll('#workers-table-block #workers-list tr');
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
    const filter_opt = document.querySelector('#workers-filter-options').value;
    filterWorkersTableRows(event.target.value, filter_opt);
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
    showElementOnCondition(radioButtonIsChecked(), modifyWorkerButton);
}
function showModifyWorkerForm()
{
    modify_worker_form = document.querySelector('form[name=modify_worker]')
    modify_worker_form.classList.remove('hidden');
    radioButtons = document.querySelectorAll('input[type=radio]');
    for (r of radioButtons)
    {
        if (r.checked === true)
            checkedRow = r.parentElement;
    }
    modify_worker_form.id.value = checkedRow.querySelector('.id').textContent;
    modify_worker_form.cf.value = checkedRow.querySelector('.cf').textContent;
    modify_worker_form.name.value = checkedRow.querySelector('.nome').textContent;
    modify_worker_form.surname.value = checkedRow.querySelector('.cognome').textContent;
    modify_worker_form.email.value = checkedRow.querySelector('.email').textContent;
    modify_worker_form.date.value = checkedRow.querySelector('.data_nascita').textContent;
    modify_worker_form.sex.value = checkedRow.querySelector('.sesso').textContent;
    modify_worker_form.role.value = checkedRow.querySelector('.ruolo').textContent;
    modify_worker_form.beginning_date.value = checkedRow.querySelector('.inizio').textContent;
    modify_worker_form.profile_img.value = checkedRow.querySelector('.profile_img').textContent;
}
function postModifyWorkerData(formData)
{
    return fetch('worker-modification', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
    },
    method: 'POST',
    credentials: "same-origin",
    body: JSON.stringify({
        id: formData.id.value,
        cf: formData.cf.value,
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
function handleModifyWorkerSubmission(event)
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
        postModifyWorkerData(event.target).then((data) => {
            updateFeedbackMessageSpanContent('view-workers-block', data);
        });
    }    
}
document.querySelector('#workers-rows-filter-bar').addEventListener('keyup', handleSearch);
const modifyWorkerButton = document.querySelector('#modify-worker-btn');
modifyWorkerButton.addEventListener('click', showModifyWorkerForm);

const modifyWorkerForm = document.forms['modify_worker'];
modifyWorkerForm.classList.add('hidden');
modifyWorkerForm.addEventListener('submit', handleModifyWorkerSubmission);

const workerCfInputField = modifyWorkerForm.cf;
workerCfInputField.addEventListener('keyup', handleCfInput);

const workerNameInputField = modifyWorkerForm.name;
workerNameInputField.addEventListener('keyup', handleNameInput);

const workerSurnameInputField = modifyWorkerForm.surname;
workerSurnameInputField.addEventListener('keyup', handleSurnameInput);

const workerEmailInputField = modifyWorkerForm.email;
workerEmailInputField.addEventListener('keyup', handleEmailInput);

const workerDateInputField = modifyWorkerForm.date;
workerDateInputField.addEventListener('change', handleDateInput);

