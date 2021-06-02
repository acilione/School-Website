function postStudentMarkData(formData)
{
    return fetch('student-mark-addition', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
    },
    method: 'POST',
    credentials: "same-origin",
    body: JSON.stringify({
        student_to_grade: formData.student_to_grade.value,
        grade_date: formData.grade_date.value,
        subject: formData.subject.value,
        mark: formData.mark.value,
        mark_type: formData.mark_type.value
    }),
    })
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
//check sui dati per inserire voto (data valida)
function handleMarkSubmition(event)
{
    event.preventDefault();
    if (!dateValid(event.target.grade_date.value))
    {
        alert('data non valida!');
    }
    else 
    {
        postStudentMarkData(event.target).then((data) => {
            updateFeedbackMessageSpanContent('add-student-mark-form-block', data);
        });
    }    
}
function handleMarkFormDateChange(event) 
{
    let obj = document.querySelector('add-student-mark-form-block .mark_date_error');
    showElementOnCondition(!dateValid(event.target.value), obj);
}
function updateMarkTeacherClasses()
{
    //genera opzioni con numeri classi relative un dato insegnante
    getTeacherClassesNums().then(function(data)
    {
        let classNum = document.querySelector('#student_to_grade_class_num');
        removeAllChildren(classNum);
        for (d of data)
        {
            numOption = document.createElement('option');
            numValue = document.createTextNode(d['numero']);
            classNum.appendChild(numOption);
            numOption.appendChild(numValue)
            numOption.setAttribute('value', d['numero']);
        }
        classNum.addEventListener('change', handleClassChange);
    });
    //genera opzioni con sezioni classi relative a un dato insegnante
    getTeacherClassesSections().then(function(data)
    {
        let classSection = document.querySelector('#student_to_grade_class_section');
        removeAllChildren(classSection);
        for (d of data)
        {
            sectionOption = document.createElement('option');
            sectionValue = document.createTextNode(d['sezione']);
            classSection.appendChild(sectionOption);
            sectionOption.appendChild(sectionValue)
            sectionOption.setAttribute('value', d['sezione']);
        }
        classSection.addEventListener('change', handleClassChange);
        handleClassChange();

        addStudentMarkForm = document.forms['add_mark'];
        addStudentMarkForm.addEventListener('submit', handleMarkSubmition);
        addStudentMarkForm.grade_date.addEventListener('change', handleDateInput);
    });
}
function handleClassChange()
{
    const cfSelector = document.querySelector('#student_to_grade');
    const subjectSelector = document.querySelector('#subject');
    removeAllChildren(cfSelector);
    removeAllChildren(subjectSelector);
    let classNumValue = document.querySelector('#student_to_grade_class_num').value;
    let classSectionValue = document.querySelector('#student_to_grade_class_section').value;
    postClassGetStudents(classNumValue, classSectionValue)
    .then(function(data){
        const cfSelector = document.querySelector('#student_to_grade');
        for (d of data)
        {
            const cfOption = document.createElement('option');
            cfOption.setAttribute('value', d['cf']);
            const cfFullNameValue = document.createTextNode(d['cf']+" - "+d['nome']+" "+d['cognome']);
            cfSelector.appendChild(cfOption);
            cfOption.appendChild(cfFullNameValue);
        }
    });
    postTeacherGetSubjects(classNumValue, classSectionValue)
    .then(function(data){
        let subjectSelector = document.querySelector('#subject');
        for (d of data)
        {
            subjectOption = document.createElement('option');
            subjectValue = document.createTextNode(d['disciplina']);
            subjectSelector.appendChild(subjectOption);
            subjectOption.appendChild(subjectValue);
        }
    });
}