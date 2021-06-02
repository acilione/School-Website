function handleSelectContentBlock(event) 
{
    let contentBlocks = document.querySelectorAll('.content-block');
    for (c of contentBlocks)
        c.classList.add('hidden');
    if (event.target.innerHTML.toLowerCase() === "aggiungi studente")
    {
        document.querySelector('#add-student-form-block').classList.remove('hidden');
    }
    else if (event.target.innerHTML.toLowerCase() === "aggiungi lavoratore")
    {
        document.querySelector('#add-worker-form-block').classList.remove('hidden');
        addListenersAddWorkerForm();
    }
    else if (event.target.innerHTML.toLowerCase() === "visualizza studenti")
    {
        document.querySelector('#view-students-block').classList.remove('hidden');
        updateStudentsList();
    }
    else if (event.target.innerHTML.toLowerCase() === "aggiungi insegnamento")
    {
        document.querySelector('#add-teaching-form-block').classList.remove('hidden');
        updateOptions();
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