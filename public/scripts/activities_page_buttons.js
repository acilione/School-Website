function handleSelectContentBlock(event) 
{
    let contentBlocks = document.querySelectorAll('.content-block');
    for (let c of contentBlocks)
        c.classList.add('hidden');
    if (event.target.innerHTML.toLowerCase() === "risolvi equazioni")
    {
        document.querySelector('#equationsAPI-block').classList.remove('hidden');
        addMathAPIDiv();
    }
    else if (event.target.innerHTML.toLowerCase() === "harvard museum gallery")
    {
        document.querySelector('#harvardMuseumAPI-block').classList.remove('hidden');
        updateHarvardMuseumGalleries();
    }
}

buttonsBlock = document.querySelectorAll('#buttons-block .btn');
for (let b of buttonsBlock)
{
    b.addEventListener('click', handleSelectContentBlock);
}

let contentBlocks = document.querySelectorAll('.content-block');
for (let c of contentBlocks)
    c.classList.add('hidden');