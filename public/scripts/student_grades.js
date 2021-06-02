//fetch voti insegnante
function getStudentGrades() 
{
    return fetch('student-grades')
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function updateGrades()
{
    getStudentGrades().then(function(data){
        let cont = document.querySelector('#student-grades-block');
        removeAllChildren(cont);
        const contentDiv = document.querySelector('#student-grades-block');
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