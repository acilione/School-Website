function postStudentAttendanceData(formData)
{
    return fetch('student-attendance-addition', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
    },
    method: 'POST',
    credentials: "same-origin",
    body: JSON.stringify({
        student_attending: formData.student_attending.value,
        attendance_date: formData.attendance_date.value,
        attendance_value: formData.attendance_value.value,
    }),
    })    
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function handleStudentAttendanceSubmition(event)
{
    event.preventDefault();
    if (!dateValid(event.target.attendance_date.value))
    {
        alert('data non valida!');
    }
    else 
    {
        postStudentAttendanceData(event.target).then((data) => {
            updateFeedbackMessageSpanContent('add-students-attendance-form-block', data);
        });
    }    
}
function handleAttendanceClassChange(event)
{
    const cfSelector = document.querySelector('#student_attending');
    removeAllChildren(cfSelector);
    let classNumValue = document.querySelector('#student_attending_class_num').value;
    let classSectionValue = document.querySelector('#student_attending_class_section').value;
    postClassGetStudents(classNumValue, classSectionValue)
    .then(function(data){
        const cfSelector = document.querySelector('#student_attending');
        for (d of data)
        {
            const cfOption = document.createElement('option');
            cfOption.setAttribute('value', d['cf']);
            const cfFullNameValue = document.createTextNode(d['cf']+" - "+d['nome']+" "+d['cognome']);
            cfSelector.appendChild(cfOption);
            cfOption.appendChild(cfFullNameValue);
        }
    });
}
function updateAttendanceTeacherClasses(){
getTeacherClassesNums().then(function(data)
    {
        classNum = document.querySelector('#student_attending_class_num');
        removeAllChildren(classNum);
        for (d of data)
        {
            numOption = document.createElement('option');
            numValue = document.createTextNode(d['numero']);
            classNum.appendChild(numOption);
            numOption.appendChild(numValue)
            numOption.setAttribute('value', d['numero']);
        }
        classNum.addEventListener('change', handleAttendanceClassChange);
    });
    //genera opzioni con sezioni classi relative a un dato insegnante
    getTeacherClassesSections().then(function(data)
    {
        let classSection = document.querySelector('#student_attending_class_section');
        removeAllChildren(classSection);
        for (d of data)
        {
            sectionOption = document.createElement('option');
            sectionValue = document.createTextNode(d['sezione']);
            classSection.appendChild(sectionOption);
            sectionOption.appendChild(sectionValue)
            sectionOption.setAttribute('value', d['sezione']);
        }
        classSection.addEventListener('change', handleAttendanceClassChange);
        handleAttendanceClassChange();

        const addStudentAttendanceForm = document.forms['add_student_attendance'];
        addStudentAttendanceForm.addEventListener('submit', handleStudentAttendanceSubmition);
        addStudentAttendanceForm.attendance_date.addEventListener('change', handleDateInput);
    });
}