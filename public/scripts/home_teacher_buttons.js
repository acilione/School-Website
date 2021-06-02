function handleSelectContentBlock(event) 
{
    let contentBlocks = document.querySelectorAll('.content-block');
    for (c of contentBlocks)
        c.classList.add('hidden');
    if (event.target.innerHTML.toLowerCase() === "orario scolastico")
    {
        document.querySelector('#teacher-calendar-block').classList.remove('hidden');
        updateTeacherCalendar();
    }
    else if (event.target.innerHTML.toLowerCase() === "inserisci voti")
    {
        document.querySelector('#add-student-mark-form-block').classList.remove('hidden');
        updateMarkTeacherClasses();
    }
    else if (event.target.innerHTML.toLowerCase() === "visualizza voti")
    {
        document.querySelector('#teacher-students-grades-record-block').classList.remove('hidden');
        updateTeacherStudentsGradesList();
    }
    else if (event.target.innerHTML.toLowerCase() === "inserisci presenze")
    {
        document.querySelector('#add-students-attendance-form-block').classList.remove('hidden');
        updateAttendanceTeacherClasses();
    }
    else if (event.target.innerHTML.toLowerCase() === "visualizza presenze")
    {
        document.querySelector('#teacher-students-attendance-record-block').classList.remove('hidden');
        updateStudentAttendances();
    }
}

buttonsBlock = document.querySelectorAll('#buttons-block .btn');
for (b of buttonsBlock)
{
    b.addEventListener('click', handleSelectContentBlock);
}

let contentBlocks = document.querySelectorAll('.content-block');
for (c of contentBlocks)
    c.classList.add('hidden');