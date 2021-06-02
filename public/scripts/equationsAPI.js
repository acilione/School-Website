function sendEquation(expression) 
{
    return fetch('mathAPI', {
        headers: {
         "Content-Type": "application/json",
         "Accept": "application/json, text-plain, */*",
         "X-Requested-With": "XMLHttpRequest",
         "X-CSRF-TOKEN": token
        },
        method: 'POST',
        credentials: "same-origin",
        body: JSON.stringify({
            equation: expression,
        }),
        })    
        .then(onResponse)
        .then(onJSON)
        .catch(onError);
}

function onMathJson(json) {
    let div = document.querySelector('#equationsAPI-block');
    let answser_div = document.createElement('div');
    let p = document.createElement('p');
    let pText = document.createTextNode(json);
    div.appendChild(answser_div);
    answser_div.appendChild(p);
    p.appendChild(pText);
}

function handleEquationSubmition(event) {
    event.preventDefault();
    const expression = document.querySelector('#equation-input').value;
    const encodedExpression = encodeURIComponent(expression);
    sendEquation(encodedExpression).then((data) => {
        onMathJson(data);
    });
}
function addMathAPIDiv() {
    let eqAPIDiv = document.querySelector('#equationsAPI-block');
    removeAllChildren(eqAPIDiv);
    let div = document.createElement('div');
    let p = document.createElement('p');
    let pText = document.createTextNode('Inserisci equazione');
    let form = document.createElement('form');
    let inputField = document.createElement('input');
    let submitButton = document.createElement('input');
    eqAPIDiv = document.querySelector('#equationsAPI-block')
    eqAPIDiv.appendChild(div);
    div.appendChild(p);
    p.appendChild(pText);
    div.appendChild(form);
    form.appendChild(inputField);
    form.appendChild(submitButton);
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('name', 'equation');
    inputField.setAttribute('id', 'equation-input');
    div.setAttribute('id', 'modal-content');
    submitButton.setAttribute('type', 'submit');
    form.addEventListener('submit', handleEquationSubmition);
}