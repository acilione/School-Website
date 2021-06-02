function handleSelectContentBlock(event) 
{
    let contentBlocks = document.querySelectorAll('.content-block');
    for (c of contentBlocks)
        c.classList.add('hidden');
    if (event.target.innerHTML.toLowerCase() === "aggiungi circolare")
    {
        document.querySelector('#add-circular-form-block').classList.remove('hidden');
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