function getTeachingsListJson() 
{
    return fetch('all-teachings')
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function updateTeachingsList() 
{
    getTeachingsListJson().then(function(data){
        const c = document.querySelector('#teachings-table-block');
        c.classList.add('scrollable');
        removeAllChildren(c);
        const teachingsFilterOptions = document.querySelector('#teachings-filter-options');
        removeAllChildren(teachingsFilterOptions);
        const contentDiv = document.querySelector('#teachings-table-block');
        const title = document.createElement('h2');
        const table = document.createElement('table');
        table.setAttribute('id', 'teachings-list');
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
            teachingsFilterOptions.appendChild(option);
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
            btn.setAttribute('type', 'checkbox');
            btn.setAttribute('name', 'teaching-selection');
            btn.setAttribute('value', d['id']);
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
    })
}
function filterTeachingsTableRows(string, column_class)
{
    let text = string.toLowerCase();
    let rows = document.querySelectorAll('#teachings-table-block #teachings-list tr');
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
function handleTeachingsSearch(event) 
{
    const filter_opt = document.querySelector('#teachings-filter-options').value;
    filterWorkersTableRows(event.target.value, filter_opt);
}
function postDeleteTeachingsData(checkedIDs)
{
    return fetch('teachings-deletion', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
    },
    method: 'POST',
    credentials: "same-origin",
    body: JSON.stringify({
        ids: checkedIDs
    }),
    })    
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function handleDeleteTeachingsSubmition(event)
{
    event.preventDefault();
    const checkboxes = document.querySelectorAll('input[name="teaching-selection"]:checked');
    if (checkboxes.length === 0)
        alert('nessun box selezionato');
    else
    {
        let ids = [];
        checkboxes.forEach((checkbox) => {
            ids.push(checkbox.value);
        })
        postDeleteTeachingsData(ids).then((data) => {
            updateFeedbackMessageSpanContent('view-teachings-block', data);
        });
    }
}    
document.querySelector('#teachings-rows-filter-bar').addEventListener('keyup', handleTeachingsSearch);
document.forms['teachings'].addEventListener('submit', handleDeleteTeachingsSubmition);