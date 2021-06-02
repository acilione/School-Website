function getClassMessages() 
{
    return fetch('list_class_messages.php')
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function updateClassMessages()
{
    getClassMessages().then(function(data){
        const msgsBlock = document.querySelector('#view-messages-block');
        removeAllChildren(msgsBlock);
        msgsBlock.classList.add('scrollable');
        for (let elem of data)
        {
            const fullname = document.createElement('span');
            const fullnameText = document.createTextNode(elem['nome']+' '+elem['cognome']);
            fullname.appendChild(fullnameText);
            const p_msg = document.createElement('p');
            const msg_content = document.createTextNode(elem['testo_messaggio']);
            const timestamp = document.createElement('span');
            const timestampText = document.createTextNode(elem['post_timestamp']);
            timestamp.appendChild(timestampText);
            p_msg.appendChild(msg_content);
            msgsBlock.appendChild(fullname);
            msgsBlock.appendChild(timestamp);
            msgsBlock.appendChild(p_msg);
            p_msg.classList.add('msg_content');
        }
    })
}
function sendPostMessage(msg_text)
{
    return fetch('add_class_message.php', {
        method: 'POST',
        body: JSON.stringify({
            msg: msg_text,
        }),
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
        })    
        .then(onResponse)
        .then(onJSON)
        .catch(onError);
}
function addClassMsgFormValid(form)
{
    return (!fieldEmpty(form.msg_text.value))
}
function handleClassMsgFormSubmit(event)
{
    if (!addClassMsgFormValid(event.target))
    {
        alert('campi vuoti!');
        event.preventDefault();
    }
    else
    {
        event.preventDefault();
        sendPostMessage(event.target.msg_text.value);
        event.target.msg_text.value = '';
        updateClassMessages();
    }
}

const addMsgForm = document.forms['add_class_message_form'];
addMsgForm.addEventListener('submit', handleClassMsgFormSubmit)