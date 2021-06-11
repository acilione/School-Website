function getStudentAttendanceFilteredByDateRange(formData) 
{
    return fetch('student-attendances', {
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
function updateAttendance(event)
{
    event.preventDefault();
    getStudentAttendanceFilteredByDateRange(event.target).then(function(data){
        const contentDiv = document.querySelector('#student-attendance-table-block');
        removeAllChildren(contentDiv);
        const absences_array = data.filter(function(attendance_val){
            return attendance_val['presenza'] === 'A';
        });
        
        const absencesNum = document.createTextNode('Numero assenze: '+absences_array.length);
        const abcensesDiv = document.createElement('div');
        abcensesDiv.setAttribute('id', 'absences-div');
        abcensesDiv.appendChild(absencesNum);
        contentDiv.appendChild(abcensesDiv);
        const title = document.createElement('h2');
        const table = document.createElement('table');
        table.setAttribute('id', 'student-attendance-table');
        contentDiv.appendChild(title);
        contentDiv.appendChild(table);
        //aggiungo riga che contiene nomi valori
        const namesRow = document.createElement('tr');
        table.appendChild(namesRow);
        //aggiungo colonne con relativi nomi
        for (key in data[0])
        {
            const column = document.createElement('th');
            const colValue = document.createTextNode(key);
            namesRow.appendChild(column);
            column.appendChild(colValue);
        }
        //aggiungo righe con relativi contenuti
        for(let d of data)
        {
            const tableRow = document.createElement('tr');
            table.appendChild(tableRow);
            for(key in d)
            {
                const rowCol = document.createElement('th');
                const colValue = document.createTextNode(d[key]);
                tableRow.appendChild(rowCol);
                rowCol.appendChild(colValue);
            }
        }
    })
}