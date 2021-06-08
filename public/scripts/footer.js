function openContactsModal(event)
{
    const mail = 'liceoscientificogverga21@gmail.com';
    const phoneNum = '+39-345-5556-53';

    const modal = document.querySelector('#modal');
    modal.classList.remove('hidden');
    
    window.addEventListener('keydown', closeModal);
    document.body.classList.add('no-scroll');
    const exitButtonImg = document.createElement('img');
    const div = document.createElement('div');
    exitButtonImg.src = 'imgs/exit-icon.png';
    exitButtonImg.addEventListener('click', closeModal);
    div.appendChild(exitButtonImg);
    modal.appendChild(div);
    const pMail = document.createElement('p');
    const pPhoneNum = document.createElement('p');
    const pMailText = document.createTextNode(mail);
    const pPhoneNumText = document.createTextNode(phoneNum)
    pMail.appendChild(pMailText);
    pPhoneNum.appendChild(pPhoneNumText);
    div.appendChild(pMail);
    div.appendChild(pPhoneNum);
}

function closeModal(event)
{
    if(event.key === 'Escape' || event.button === 0)
	{
        while(modal.firstChild){
            modal.removeChild(modal.firstChild);
        }
		modal.classList.add('hidden');
		document.body.classList.remove('no-scroll');
	}
}

const contactsBtn = document.querySelector('#contacts-btn');
contactsBtn.addEventListener('click', openContactsModal);