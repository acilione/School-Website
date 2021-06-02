function getTeacherClassesNums() 
{
    return fetch('teacher-classes-numbers')
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function getTeacherClassesSections() 
{
    return fetch('teacher-classes-sections')
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function postClassGetStudents(classNum, classSection) {
    return fetch('class-students', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
    },
	method: 'POST',
    credentials: "same-origin",
	body: JSON.stringify({
		numero: classNum,
        sezione: classSection
	}),
    })   
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function postTeacherGetSubjects(classNum, classSection) {
    return fetch('teacher-class-subjects', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
    },
	method: 'POST',
    credentials: "same-origin",
	body: JSON.stringify({
		numero: classNum,
        sezione: classSection
	}),
    })    
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
