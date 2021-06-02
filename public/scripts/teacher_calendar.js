function getTeacherCalendar() 
{
    return fetch('teacher-calendar')
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function updateTeacherCalendar() {
    getTeacherCalendar().then(function(data) {
        const contentDiv = document.querySelector('#teacher-calendar-block'); //primo da modificare
        removeAllChildren(contentDiv);
        const table = document.createElement('table');
        table.setAttribute('id', 'teacher-calendar-table'); //secondo parametro da cambiare
        contentDiv.appendChild(table);
        const daysRow = document.createElement('tr');
        let days = [];
        let hours = [];
        for (let elem of data)
        {
            if (!days.includes(elem['giorno_settimana']))
                days.push(elem['giorno_settimana']);
            if (!hours.includes(elem['ora']))
                hours.push(elem['ora']);
        }
        for (let i=0; i < (days.length)+1; i++)
        {
            const col = document.createElement('th');
            daysRow.appendChild(col);
            table.appendChild(daysRow); 
            if (i !== 0)
            {
                const colText = document.createTextNode(days[i-1]);
                col.appendChild(colText);
            }
        }
        hours.sort();
        for (let h of hours)
        {
            const row = document.createElement('tr');
            table.appendChild(row);
            for (let i = 0; i < (days.length)+1; i++)
            {
                const col = document.createElement('th');
                row.appendChild(col);
                if (i === 0)
                {
                    const hourText = document.createTextNode(h);
                    col.appendChild(hourText);
                } 
            }
        }
        const allRows = table.querySelectorAll('tr');
        for (let i = 1; i < (allRows.length); i++)
        {
            const rowCols = allRows[i].querySelectorAll('th');
            daysCols = daysRow.querySelectorAll('th')
            for (let j = 1; j < (daysCols.length); j++)
            {
                for (let elem of data)
                {
                    if (daysCols[j].textContent === elem['giorno_settimana'] && rowCols[0].textContent === elem['ora'])
                    {
                        const subjectText = document.createTextNode(elem['disciplina']+'-'+elem['anno']+' '+elem['sezione']);
                        rowCols[j].appendChild(subjectText);
                    }
                }
            }
        }
        contentDiv.appendChild(table);
    })
}