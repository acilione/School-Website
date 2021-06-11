function showElementOnCondition(condition, obj_to_display)
{
    if (condition)
        obj_to_display.classList.remove('hidden');
    else
        obj_to_display.classList.add('hidden');
}

function removeAllChildren(parentElem)
{
    while(parentElem.firstChild)
        parentElem.removeChild(parentElem.firstChild);
}

function updateFeedbackMessageSpanContent(formBlockID, jsonData)
{
    const insertFeedbackSpan = document.querySelector('#'+formBlockID+' '+'.insert-feedback-message');
    removeAllChildren(insertFeedbackSpan);
    const insertFeedbackSpanText = document.createTextNode(jsonData);
    insertFeedbackSpan.appendChild(insertFeedbackSpanText);
}

function addFilterByDateRangeForm(divBlockID, tableBlockID, formName, submitHandlerFunction)
{
    const divBlock = document.querySelector('#'+divBlockID);
    removeAllChildren(divBlock);
    const form = document.createElement('form')
    form.setAttribute('name', formName)
    const fromDateLabel = document.createElement('label');
    const toDateLabel = document.createElement('label');
    const fromDateLabelText = document.createTextNode('Dal: ');
    const toDateLabelText = document.createTextNode('Al: ');
    fromDateLabel.appendChild(fromDateLabelText);
    toDateLabel.appendChild(toDateLabelText);
    const fromDateField = document.createElement('input');
    const toDateField = document.createElement('input');
    fromDateField.setAttribute('type', 'date');
    toDateField.setAttribute('type', 'date');
    fromDateField.setAttribute('name', 'from_date');
    toDateField.setAttribute('name', 'to_date');
    fromDateLabel.appendChild(fromDateField);
    toDateLabel.appendChild(toDateField);
    const submitBtn = document.createElement('input');
    submitBtn.setAttribute('type', 'submit');
    form.appendChild(fromDateLabel);
    form.appendChild(toDateLabel);
    form.appendChild(submitBtn);
    divBlock.appendChild(form);
    const tableBlock = document.createElement('div');
    tableBlock.setAttribute('id', tableBlockID);
    divBlock.appendChild(tableBlock);
    form.addEventListener('submit', submitHandlerFunction);
}