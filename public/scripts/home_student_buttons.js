function handleSelectContentBlock(event) 
{
    let contentBlocks = document.querySelectorAll('.content-block');
    for (c of contentBlocks)
        c.classList.add('hidden');
    if (event.target.innerHTML.toLowerCase() === "orario scolastico")
    {
        document.querySelector('#student-calendar-block').classList.remove('hidden');
        updateStudentCalendar();
    }
    else if (event.target.innerHTML.toLowerCase() === "voti")
    {
        document.querySelector('#student-grades-block').classList.remove('hidden');
        addFilterByDateRangeForm('student-grades-block', 'student-grades-table-block', 'filterGradesByDateRangeForm', updateGrades);
    }    
    else if (event.target.innerHTML.toLowerCase() === "presenze")
    {
        document.querySelector('#student-attendance-block').classList.remove('hidden');
        addFilterByDateRangeForm('student-attendance-block', 'student-attendance-table-block', 'filterAttendancesByDateRangeForm', updateAttendance);
    }
    else if (event.target.innerHTML.toLowerCase() === "messaggi classe")
    {
        document.querySelector('#class-messages-block').classList.remove('hidden');
        updateClassMessages();
    }
}

let buttonsBlock = document.querySelectorAll('#buttons-block .btn');
for (b of buttonsBlock)
{
    b.addEventListener('click', handleSelectContentBlock);
}

let contentBlocks = document.querySelectorAll('.content-block');
for (c of contentBlocks)
    c.classList.add('hidden');