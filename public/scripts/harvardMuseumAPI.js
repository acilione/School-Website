function getHarvardMuseumGalleries() 
{
    return fetch('harvardMuseumAPI')
    .then(onResponse)
    .then(onJSON)
    .catch(onError);
}
function updateHarvardMuseumGalleries() {
    const harvardMuseumGalleriesDiv = document.querySelector('#harvardMuseumAPI-block');
    removeAllChildren(harvardMuseumGalleriesDiv);
    harvardMuseumGalleriesDiv.classList.add('scrollable');
    getHarvardMuseumGalleries().then((data) =>{
        const parsedData = JSON.parse(data);
        for (let elem of parsedData.records)
        {
            const galleryName = document.createElement('a');
            const galleryNameText = document.createTextNode(elem.name);
            galleryName.appendChild(galleryNameText);
            const galleryLink = elem.url;
            galleryName.setAttribute('href', galleryLink);
            harvardMuseumGalleriesDiv.appendChild(galleryName);
            if (elem.labeltext !== null)
            {
                const galleryDescription = document.createElement('p');
                const galleryDescriptionText = document.createTextNode(elem.labeltext);
                galleryDescription.appendChild(galleryDescriptionText);
                harvardMuseumGalleriesDiv.appendChild(galleryDescription);
            }
            else
            {
                const galleryDescription = document.createElement('p');
                const galleryDescriptionText = document.createTextNode('descrizione non disponibile');
                galleryDescription.appendChild(galleryDescriptionText);
                harvardMuseumGalleriesDiv.appendChild(galleryDescription);
            }
        }
    });
}