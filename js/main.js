'use strict';

const seriesName = document.querySelector(".js-series-name");


function paintElement(dataElement) {
    let codeHTML = '';
    codeHTML +='<div>';
    codeHTML +='<div>'
    codeHTML += dataElement.show.name;
    codeHTML +='</div>'
    codeHTML +='<div>'
    if (dataElement.show.image) {
        codeHTML += `<img src="${dataElement.show.image.original}" alt="${dataElement.show.name} title="${dataElement.show.name} class="js-image"/>`;
    }  else {
        codeHTML += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?
        text=TV" alt="${dataElement.show.name} title="${dataElement.show.name} class="js-image"/>`;
    } 
    codeHTML +='</div>'
    codeHTML +='</div>';
    return codeHTML;
}

function manageDataResult(data){
    let codeHTML='';
    for (let index = 0; index < data.length; index += 1){
        codeHTML += paintElement(data[index])
    }
    seriesName.innerHTML = codeHTML;
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