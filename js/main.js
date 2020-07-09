'use strict';

const seriesName = document.querySelector(".js-series-name");
let current;

function paintElement(dataElement) {
    let codeHTML = '';
    codeHTML +='<div class="js-series-container">';
    codeHTML +='<div>'
    codeHTML += dataElement.show.name;
    codeHTML +='</div>'
    codeHTML +='<div>'
    if (dataElement.show.image) {
        codeHTML += `<img src="${dataElement.show.image.original}" alt="${dataElement.show.name}" title="${dataElement.show.name}" class="js-image"/>`;
    }  else {
        codeHTML += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?
        text=TV" alt="${dataElement.show.name}" title="${dataElement.show.name}" class="js-image"/>`;
    } 
    codeHTML +='</div>'
    codeHTML +='</div>';
    return codeHTML;
}

function addFavorite(event) {
    console.log(event.currentTarget);
    current = event.currentTarget;
    console.log(current.children[0].innerText);
    // Con esto cogemos el texto que hay en el div, es decir, el nombre de la serie
    // current.children[0].innerText
    //seriesName.innerHTML = event.currentTarget.innerHTML;
}

function addEventListenerToSeries () {
    const seriesContainers = document.querySelectorAll(".js-series-container");
    for (let index = 0; index < seriesContainers.length; index += 1){
        seriesContainers[index].addEventListener('click', addFavorite);
    }
}

function manageDataResult(data){
    let codeHTML='';
    // Mirar lo que hay en data por si no hay datos
    if (data.length === 0){
        console.log('No hay datos');
    }
    for (let index = 0; index < data.length; index += 1){
        codeHTML += paintElement(data[index])
    }
    seriesName.innerHTML = codeHTML;
    addEventListenerToSeries();
};

function getInfo() {
    event.preventDefault()
    const name = document.querySelector('.js-input').value;
    fetch(`http://api.tvmaze.com/search/shows?q=:${name}`)
      .then(response => response.json())
      .then(data => {
        manageDataResult(data);
      });
}

  
  const btn = document.querySelector(".js-button");
  btn.addEventListener("click",getInfo);