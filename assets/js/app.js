const form = document.getElementById('search-form')
const searchField = document.getElementById('search-keyword')
const responseContainer = document.getElementById('response-container')
let searchedForText;

form.addEventListener('submit', function(e) {
    e.preventDefault()
    responseContainer.innerHTML = ''
    searchedForText = searchField.value
    getNews();
})

function getNews() {
    const articleRequest = new XMLHttpRequest()
    articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=2e7171139a2344318f252dbd9ae8c59c`)
    articleRequest.onload = addNews
    articleRequest.onerror = handleError;
    articleRequest.send()
}

function handleError() {
    console.log('Se ha presentado un error')
}

function addNews() {
    const data = JSON.parse(this.responseText)
    const article = data.response.docs[0]
    const title = article.headline.main
    const snippet = article.snippet

    let li = document.createElement('li')
    li.className = 'articleClass'
    li.innerText = snippet

    responseContainer.appendChild(li)
}
