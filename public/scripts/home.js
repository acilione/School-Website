function handleFilterHomeSections(event) 
{
    let text = event.target.value.toLowerCase();
    const contentBlocks = document.querySelectorAll('#content .row-div');
    if (text !== "")
    {
        for (let cont of contentBlocks)
        {
            let title = cont.querySelector('h1').firstChild.textContent.toLowerCase();
            if (title.indexOf(text) === -1) {
                cont.classList.add('hidden');
            }
            else {
                cont.classList.remove('hidden');
            }
        }
    }
    else 
    {
        for (let cont of contentBlocks) {
            cont.classList.remove('hidden');
        }
    }
}

function handleHomeClientSearch(event) 
{
    let text = event.target.value.toLowerCase();
    let boxes = document.querySelectorAll('#allElements .box-text-img');
    if (text !== "") {
        for(let b of boxes){
            let title = b.querySelector('.text h2 a').firstChild.textContent.toLowerCase();
            if (title.indexOf(text) === -1) {
                b.classList.add('hidden');
            }
            else {
                b.classList.remove('hidden');
            }
        }
    }
    else {
        for (let b of boxes) {
            b.classList.remove('hidden');
        }
    }
}
function activeTeachersDBSearch(searchVal, filterVal)
{
    return fetch('api/list_search_results', {
    headers: {
     "Content-Type": "application/json",
     "Accept": "application/json, text-plain, */*",
     "X-Requested-With": "XMLHttpRequest",
     "X-CSRF-TOKEN":  token
    },
    method: 'POST',
    credentials: "same-origin",
    body: JSON.stringify({
        searchValue: searchVal,
        filterValue: filterVal
    }),
    }).then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function circularsDBSearch(searchVal, filterVal)
{
    return fetch('api/list_search_results', {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": token
    },
    method: 'POST',
    credentials: "same-origin",
    body: JSON.stringify({
        searchValue: searchVal,
        filterValue: filterVal
    }),
    }).then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function handleDBSearchFormSubmission(event)
{
    event.preventDefault();
    if (event.target.filter_selection.value === "docenti")
        activeTeachersDBSearch(event.target.db_search_bar.value, event.target.filter_selection.value).then((data) => {
            const noSearchResultSpan = document.querySelector('#no-search-result');
            if (data.length !== 0)
            {
                openSearchedContentDiv();
                renderTeachersElements(data, '#searched-content', 'searched-teachers-div-block');
                noSearchResultSpan.classList.add('hidden');
            }
            else
                noSearchResultSpan.classList.remove('hidden');
        });
    else if(event.target.filter_selection.value === "circolari")
        circularsDBSearch(event.target.db_search_bar.value, event.target.filter_selection.value).then((data) => {
            const noSearchResultSpan = document.querySelector('#no-search-result');
            if (data.length !== 0)
            {
                openSearchedContentDiv();
                renderCircularsElements(data, '#searched-content', 'searched-circulars-div-block');
                noSearchResultSpan.classList.add('hidden')
            }
            else
                noSearchResultSpan.classList.remove('hidden');
        });
}
function getCirculars()
{
    return fetch("api/list_circulars").then(onResponse).then(onJSON).catch(onError);
}
function getTeachers()
{
    return fetch("api/list_active_teachers").then(onResponse).then(onJSON).catch(onError);
}
function getBuildings()
{
    return fetch("api/list_buildings").then(onResponse).then(onJSON).catch(onError);
}
function showNext(event)
{
    const contentDivs = document.querySelectorAll('#'+event.target.parentElement.id+' '+'.div-content-block');
    for (let i=0;i<contentDivs.length;i++)
    {
        if (!contentDivs[i].classList.contains('hidden'))
        {
            contentDivs[i].classList.add('hidden')
            if (i === (contentDivs.length - 1))
                contentDivs[0].classList.remove('hidden');
            else
                contentDivs[i+1].classList.remove('hidden');
            break;
        }
    }
}
function showPrev(event)
{
    const contentDivs = document.querySelectorAll('#'+event.target.parentElement.id+' '+'.div-content-block');
    for (let i=0;i<contentDivs.length;i++)
    {
        if (!contentDivs[i].classList.contains('hidden'))
        {
            contentDivs[i].classList.add('hidden')
            if (i === 0)
                contentDivs[contentDivs.length - 1].classList.remove('hidden');
            else
                contentDivs[i-1].classList.remove('hidden');
            break;
        }
    }
}
function renderCircularsElements(data, appendToID, divBlockID)
{
    const allContentSection = document.querySelector(appendToID);
    const rowDiv = document.createElement('div');
    allContentSection.appendChild(rowDiv);
    rowDiv.classList.add('row-div')
    const title = document.createElement('h1');
    title.classList.add('row-title');
    const titleText = document.createTextNode('Circolari');
    title.appendChild(titleText);
    title.classList.add('row-title');
    rowDiv.appendChild(title);
    const div = document.createElement('div');
    div.classList.add('div-block');
    div.setAttribute('id', divBlockID);
    rowDiv.appendChild(div);
    const showNextBtn = document.createElement('img');
    const showPrevBtn = document.createElement('img');
    showNextBtn.classList.add('arrow-img');
    showPrevBtn.classList.add('arrow-img');
    showNextBtn.classList.add('forward-arrow-img');
    showPrevBtn.classList.add('prev-arrow-img');
    showNextBtn.src = 'imgs/right-arrow.png';
    showPrevBtn.src = 'imgs/left-arrow.png';
    showNextBtn.addEventListener('click', showNext);
    showPrevBtn.addEventListener('click', showPrev);
    div.appendChild(showPrevBtn);
    for (elem of data)
    {
        const divContent = document.createElement('div');
        divContent.classList.add('div-content-block');
        const date = document.createElement('span');
        const dateText = document.createTextNode(elem['data']);
        date.appendChild(dateText);
        divContent.appendChild(date);
        const circularTitle = document.createElement('h3');
        const circularTitleText = document.createTextNode(elem['titolo']);
        circularTitle.appendChild(circularTitleText);
        divContent.appendChild(circularTitle);
        const circularParag = document.createElement('p');
        circularParag.classList.add('scrollable');
        const circularParagText = document.createTextNode(elem['contenuto']);
        circularParag.appendChild(circularParagText)
        divContent.appendChild(circularParag);
        div.appendChild(divContent);
    }
    div.appendChild(showNextBtn);
    const contentDivs = document.querySelectorAll("#"+divBlockID+" .div-content-block");
    for (i=1; i<contentDivs.length; i++)
        contentDivs[i].classList.add('hidden');
}
function renderBuildingsElements(data)
{
    const allContentSection = document.querySelector('#content');
    const rowDiv = document.createElement('div');
    allContentSection.appendChild(rowDiv);
    rowDiv.classList.add('row-div')
    const title = document.createElement('h1');
    title.classList.add('row-title');
    const titleText = document.createTextNode('Le sedi');
    title.appendChild(titleText);
    title.classList.add('row-title');
    rowDiv.appendChild(title);
    const div = document.createElement('div');
    div.classList.add('div-block');
    div.setAttribute('id', 'buildings-div-block');
    rowDiv.appendChild(div);
    const showNextBtn = document.createElement('img');
    const showPrevBtn = document.createElement('img');
    showNextBtn.classList.add('arrow-img');
    showPrevBtn.classList.add('arrow-img');
    showNextBtn.classList.add('forward-arrow-img');
    showPrevBtn.classList.add('prev-arrow-img');
    showNextBtn.src = 'imgs/right-arrow.png';
    showPrevBtn.src = 'imgs/left-arrow.png';
    showNextBtn.addEventListener('click', showNext);
    showPrevBtn.addEventListener('click', showPrev);
    div.appendChild(showPrevBtn);
    for (elem of data)
    {
        const divContent = document.createElement('div');
        divContent.classList.add('div-content-block');
        const address = document.createElement('p');
        const addressText = document.createTextNode(elem['via']+', '+elem['civico']);
        address.appendChild(addressText);
        const buildingImg = document.createElement('img');
        buildingImg.src = elem['img_src'];
        divContent.appendChild(address);
        divContent.appendChild(buildingImg);
        div.appendChild(divContent);
    }
    div.appendChild(showNextBtn);
    const contentDivs = document.querySelectorAll('#buildings-div-block .div-content-block');
    for (i=1; i<contentDivs.length; i++)
        contentDivs[i].classList.add('hidden');
}
function renderTeachersElements(data, sectionID, divBlockID) 
{
    const allContentSection = document.querySelector(sectionID);
    const rowDiv = document.createElement('div');
    allContentSection.appendChild(rowDiv);
    rowDiv.classList.add('row-div')
    const title = document.createElement('h1');
    title.classList.add('row-title');
    const titleText = document.createTextNode('I docenti');
    title.appendChild(titleText);
    title.classList.add('row-title');
    rowDiv.appendChild(title);
    const div = document.createElement('div');
    div.classList.add('div-block');
    div.setAttribute('id', divBlockID);
    rowDiv.appendChild(div);
    const showNextBtn = document.createElement('img');
    const showPrevBtn = document.createElement('img');
    showNextBtn.classList.add('arrow-img');
    showPrevBtn.classList.add('arrow-img');
    showNextBtn.classList.add('forward-arrow-img');
    showPrevBtn.classList.add('prev-arrow-img');
    showNextBtn.src = 'imgs/right-arrow.png';
    showPrevBtn.src = 'imgs/left-arrow.png';
    showNextBtn.addEventListener('click', showNext);
    showPrevBtn.addEventListener('click', showPrev);
    div.appendChild(showPrevBtn);
    let teachersCfCodes = [];
    for (let i = 0; i < data.length; i++)
    {
        if (!teachersCfCodes.includes(data[i]['cf']))
            teachersCfCodes.push(data[i]['cf']);
    }
    for (let cfCode of teachersCfCodes)
    {
        const divContent = document.createElement('div');
        divContent.classList.add('div-content-block');    
        const filteredArray = data.filter(function(teacher){ 
            return teacher['cf'] === cfCode;
        });
        const fullname = document.createElement('p');
        const fullnameText = document.createTextNode(filteredArray[0]['nome']+' '+filteredArray[0]['cognome']);
        fullname.appendChild(fullnameText);
        divContent.appendChild(fullname);
        let allDistinctSubjects = [];
        for (let i = 0; i < filteredArray.length; i++)
        {
            if (!allDistinctSubjects.includes(filteredArray[i]['nome_disciplina']))
                allDistinctSubjects.push(filteredArray[i]['nome_disciplina'])
        }
        for (let subj of allDistinctSubjects)
        {
            const subject = document.createElement('span');
            const subjectText = document.createTextNode(subj);
            subject.appendChild(subjectText);
            divContent.appendChild(subject);
        }
        const proPic = document.createElement('img');
        proPic.src = filteredArray[0]['profile_img'];
        divContent.appendChild(proPic);
        div.appendChild(divContent);
    }
    div.appendChild(showNextBtn);
    const contentDivs = document.querySelectorAll("#"+divBlockID+" .div-content-block");
    for (i=1; i<contentDivs.length; i++)
        contentDivs[i].classList.add('hidden');
}
function openSearchedContentDiv()
{
    const searchedContent = document.querySelector('#searched-content');
    removeAllChildren(searchedContent);
    const exitButtonImg = document.createElement('img');
    searchedContent.classList.remove('hidden');
    exitButtonImg.src = 'imgs/exit-icon.png';
    exitButtonImg.setAttribute('id', 'exit-img');
    exitButtonImg.addEventListener('click', closeSearchedContentDiv);
    searchedContent.appendChild(exitButtonImg);
}
function closeSearchedContentDiv()
{
    const searchedContent = document.querySelector('#searched-content')
    removeAllChildren(searchedContent);
    searchedContent.classList.add('hidden')
}

getBuildings().then((data) => {
    renderBuildingsElements(data)
});
getCirculars().then((data) => {
    renderCircularsElements(data, '#content', 'circulars-div-block');
});
getTeachers().then((data) => {
    renderTeachersElements(data, '#content', 'teachers-div-block');
});
const dbSearchForm = document.forms['db_search'];
dbSearchForm.addEventListener('submit', handleDBSearchFormSubmission)

const filterRowBar = document.querySelector('#content #filter-bar');
filterRowBar.addEventListener('keyup', handleFilterHomeSections);