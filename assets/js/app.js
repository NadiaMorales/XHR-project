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
    const articles = data.response.docs
    articles.forEach(article => {
    const title = article.headline.main
    const snippet = article.snippet
    const url = article.web_url

    let li = document.createElement('li')
    let h2 = document.createElement('h2')
    let p = document.createElement('p')
    let h6 = document.createElement('a')
    li.className = 'articleClass'
    p.innerText = snippet
    h2.innerText = title
    h6.innerText = url
    h6.setAttribute('href', url)


    li.appendChild(h2)
    li.appendChild(p)
    li.appendChild(h6)
    responseContainer.appendChild(li)
    console.log(articles)
    });
}