//fetch voti insegnante
function getStudentGrades(formData) 
{
    return fetch('student-grades', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": token
        },
        method: 'POST',
        credentials: "same-origin",
        body: JSON.stringify({
            from_date: formData.from_date.value,
            to_date: formData.to_date.value,
        }),
        })
        .then(onResponse)
        .then(onJSON)
        .catch(onError);
}
function updateGrades(event)
{
    event.preventDefault()
    getStudentGrades(event.target).then(function(data){
        const contentDiv = document.querySelector('#student-grades-table-block');
        removeAllChildren(contentDiv);
        title = document.createElement('h2');
        table = document.createElement('table');
        table.setAttribute('id', 'student-grades-table');
        contentDiv.appendChild(title);
        contentDiv.appendChild(table);
        //aggiungo riga che contiene nomi valori
        namesRow = document.createElement('tr');
        table.appendChild(namesRow);
        //aggiungo colonne con relativi nomi
        for (key in data[0])
        {
            column = document.createElement('th');
            colValue = document.createTextNode(key);
            namesRow.appendChild(column);
            column.appendChild(colValue);
        }
        //aggiungo righe con relativi contenuti
        for(d of data)
        {
            tableRow = document.createElement('tr');
            table.appendChild(tableRow);
            for(key in d)
            {
                rowCol = document.createElement('th');
                colValue = document.createTextNode(d[key]);
                tableRow.appendChild(rowCol);
                rowCol.appendChild(colValue);
            }
        }
    })
}