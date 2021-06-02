function postStudentSubjectGetGrades(studentCF, subject) {
    return fetch('student-subject-grades', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
    },
	method: 'POST',
    credentials: "same-origin",
	body: JSON.stringify({
		student_cf: studentCF,
        selected_subject: subject
	}),
    })    
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function postStudentModifyMarkData(formData)
{
    return fetch('student-mark-modification', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
    },
    method: 'POST',
    credentials: "same-origin",
    body: JSON.stringify({
        student_id: formData.student_modify_grade_ID.value,
        grade_date: formData.student_modify_grade_date.value,
        subject: formData.student_modify_grade_subject.value,
        mark: formData.selection_modify_grade.value,
    }),
    })    
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function filterRows(string, column_class)
{
    let text = string.toLowerCase();
    let rows = document.querySelectorAll('#grades-table-block #students-grades-list tr');
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
    const filter_opt = document.querySelector('#filter-options').value;
    filterRows(event.target.value, filter_opt);
}
function handleStudentGradesRecordClassChange()
{
    const cfSelector = document.querySelector('#student-to-view-grades-record');
    const subjectSelector = document.querySelector('#subject-view-grades');
    removeAllChildren(cfSelector);
    removeAllChildren(subjectSelector);
    const classNumValue = document.querySelector('#student-view-grades-class-num').value;
    const classSectionValue = document.querySelector('#student-view-grades-class-section').value;
    postClassGetStudents(classNumValue, classSectionValue)
    .then(function(data){
        const cfSelector = document.querySelector('#student-to-view-grades-record');
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
        let subjectSelector = document.querySelector('#subject-view-grades');
        for (d of data)
        {
            const subjectOption = document.createElement('option');
            const subjectValue = document.createTextNode(d['disciplina']);
            subjectSelector.appendChild(subjectOption);
            subjectOption.appendChild(subjectValue);
        }
    });
}
function updateTeacherStudentsGradesList() 
{
    //genera opzioni con numeri classi relative un dato insegnante
    getTeacherClassesNums().then(function(data)
    {
        const classNum = document.querySelector('#student-view-grades-class-num'); 
        removeAllChildren(classNum);
        for (d of data)
        {
            const numOption = document.createElement('option');
            const numValue = document.createTextNode(d['numero']);
            classNum.appendChild(numOption);
            numOption.appendChild(numValue)
            numOption.setAttribute('value', d['numero']);
        }
        classNum.addEventListener('change', handleStudentGradesRecordClassChange);
    });
    //genera opzioni con sezioni classi relative a un dato insegnante
    getTeacherClassesSections().then(function(data)
    {
        classSection = document.querySelector('#student-view-grades-class-section');
        removeAllChildren(classSection);
        for (d of data)
        {
            sectionOption = document.createElement('option');
            sectionValue = document.createTextNode(d['sezione']);
            classSection.appendChild(sectionOption);
            sectionOption.appendChild(sectionValue)
            sectionOption.setAttribute('value', d['sezione']);
        }
        classSection.addEventListener('change', handleStudentGradesRecordClassChange);
        handleStudentGradesRecordClassChange();
    });
    document.querySelector('#student-to-view-grades-record').addEventListener('change', handleStudentOptionChange);
    document.querySelector('#subject-view-grades').addEventListener('change', handleSubjectChange);
}
function handleStudentOptionChange(event)
{
    const cfValue = event.target.value;
    const subject = document.querySelector('#subject-view-grades').value;
    postStudentSubjectGetGrades(cfValue, subject).then(function(data){
        const c = document.querySelector('#grades-table-block');
        c.classList.add('scrollable');
        removeAllChildren(c);
        const filterOptions = document.querySelector('#filter-options');
        removeAllChildren(filterOptions);
        const contentDiv = document.querySelector('#grades-table-block');
        const title = document.createElement('h2');
        const table = document.createElement('table');
        table.setAttribute('id', 'students-grades-list');
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
            filterOptions.appendChild(option);
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
function handleSubjectChange(event)
{
    const subject = event.target.value;
    const cfValue = document.querySelector('#student-to-view-grades-record').value;
    postStudentSubjectGetGrades(cfValue, subject).then(function(data){
        const c = document.querySelector('#grades-table-block');
        c.classList.add('scrollable');
        removeAllChildren(c);
        const filterOptions = document.querySelector('#filter-options');
        removeAllChildren(filterOptions);
        const contentDiv = document.querySelector('#grades-table-block');
        const title = document.createElement('h2');
        const table = document.createElement('table');
        table.setAttribute('id', 'students-grades-list');
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
            filterOptions.appendChild(option);
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
function radioButtonIsChecked()
{
    const radioBtns = document.querySelectorAll('input[type=radio]');
    for (let radio of radioBtns)
    {
        if (radio.checked === true)
            return true;
    }
    return false;
}
function checkRadioButtonSelectedShowModifyBtn()
{
    const modifyStudentGradeButton = document.querySelector('#modify-student-grade-btn');
    showElementOnCondition(radioButtonIsChecked(), modifyStudentGradeButton);
}
function showModifyStudentGradeForm()
{
    const modifyStudentGradeForm = document.querySelector('form[name=modify_student_grade]')
    modifyStudentGradeForm.classList.remove('hidden');
    const radioButtons = document.querySelectorAll('input[type=radio]');
    for (r of radioButtons)
    {
        if (r.checked === true)
            checkedRow = r.parentElement;
    }
    modifyStudentGradeForm.student_modify_grade_ID.value = checkedRow.querySelector('.id').textContent;
    modifyStudentGradeForm.student_modify_grade_name.value = checkedRow.querySelector('.nome').textContent;
    modifyStudentGradeForm.student_modify_grade_surname.value = checkedRow.querySelector('.cognome').textContent;
    modifyStudentGradeForm.student_modify_grade_subject.value = checkedRow.querySelector('.disciplina').textContent;
    modifyStudentGradeForm.student_modify_grade_date.value = checkedRow.querySelector('.data').textContent;
    modifyStudentGradeForm.student_modify_grade_mark_type.value = checkedRow.querySelector('.tipologia_voto').textContent;
}
function handleModifyStudentGradeSubmission(event)
{
    event.preventDefault();
    if (
        !nameValid(event.target.student_modify_grade_name.value) ||
        !surnameValid(event.target.student_modify_grade_surname.value) ||
        !dateValid(event.target.student_modify_grade_date.value) ||
        (event.target.student_modify_grade_mark_type.value !== "orale" && event.target.student_modify_grade_mark_type.value !== "scritto")
        )
    {
        alert('FIELDS EMPTY OR WRONG');
    }
    else 
    {
        postStudentModifyMarkData(event.target).then((data) => {
            updateFeedbackMessageSpanContent('teacher-students-grades-record-block', data);
        });
    }    
}
document.querySelector('#grades-rows-filter-bar').addEventListener('keyup', handleSearch);
const modifyStudentGradeButton = document.querySelector('#modify-student-grade-btn');
modifyStudentGradeButton.addEventListener('click', showModifyStudentGradeForm);
modifyStudentGradeButton.classList.add('hidden');
const modifyStudentGradeForm = document.forms['modify_student_grade'];
modifyStudentGradeForm.classList.add('hidden');
modifyStudentGradeForm.addEventListener('submit', handleModifyStudentGradeSubmission);