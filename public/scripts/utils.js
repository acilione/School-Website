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