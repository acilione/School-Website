var token = document.querySelector("meta[name='csrf-token']").getAttribute('content');

function onResponse(response) 
{
    if (response.ok)
        return response.json();
    return Promise.reject(response);
}
function onJSON(json)
{
    return json;
}
function onError(error)
{
    console.warn('Something went wrong.', error);
}