"use strict";

const seriesName = document.querySelector(".js-series-section");
const favoritesSection= document.querySelector(".favorites-container")
let series =  [];
let favorites =[];
//Pinta elementos en lado derecho
function paintElement(dataElement) {
  let codeHTML = "";
  codeHTML += `<div class="js-series-container" id="${dataElement.show.id}">`;
  codeHTML += "<div>";
  codeHTML += dataElement.show.name;
  codeHTML += "</div>";
  codeHTML += "<div>";
  if (dataElement.show.image) {
    codeHTML += `<img src="${dataElement.show.image.original}" alt="${dataElement.show.name}" title="${dataElement.show.name}" class="js-image"/>`;
  } else {
    codeHTML += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?
        text=TV" alt="${dataElement.show.name}" title="${dataElement.show.name}" class="js-image"/>`;
  }
  codeHTML += "</div>";
  codeHTML += "</div>";
  return codeHTML;
}
//FAVORITOS
function paintFavorites(dataElement) {
    let codeHTML = "";
    codeHTML += `<div class="js-series-container-favorite" id="${dataElement.show.id}">`;
    codeHTML += "<div>";
    codeHTML += dataElement.show.name;
    codeHTML += "</div>";
    codeHTML += "<div>";
    if (dataElement.show.image) {
      codeHTML += `<img src="${dataElement.show.image.original}" alt="${dataElement.show.name}" title="${dataElement.show.name}" class="js-image"/>`;
    } else {
      codeHTML += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?
          text=TV" alt="${dataElement.show.name}" title="${dataElement.show.name}" class="js-image"/>`;
    }
    codeHTML += "</div>";
    codeHTML += "</div>";
    return codeHTML;
  }
  function handleFavorites(series) {
    let codeHTML = "";
    for (let index = 0; index < series.length; index += 1) {
      codeHTML += paintFavorites(series[index]);
    }
    favoritesSection.innerHTML = codeHTML;
  }

function addFavorite(event) {
  event.currentTarget.classList.toggle("favorite");
  console.log('Pint id selected serie', event.currentTarget.id);
  const serieId=  parseInt(event.currentTarget.id);

  for (let index = 0; index < series.length; index += 1) {
   if (serieId===series[index].show.id){
       favorites.push(series[index]);
       console.log(favorites);
   }
  }
handleFavorites(favorites);
saveInfoInLocalStorage();
}

//EVENT LISTENER
function addEventListenerToSeries() {
  const seriesContainers = document.querySelectorAll(".js-series-container");
  for (let index = 0; index < seriesContainers.length; index += 1) {
    seriesContainers[index].addEventListener("click", addFavorite);
    console.log(seriesContainers[index]);
  }
}
//RECOPILA la info de pintar datos y el addEventListener
function manageDataResult(data) {
  let codeHTML = "";
  if (data.length === 0) {
    codeHTML="No conozco esa serie, lo siento";
  }
  for (let index = 0; index < data.length; index += 1) {
    codeHTML += paintElement(data[index]);
  }
  seriesName.innerHTML = codeHTML;
  addEventListenerToSeries();

}

//API

function getInfoFromApi() {
  event.preventDefault();
  const name = document.querySelector(".js-input").value;
  fetch(`http://api.tvmaze.com/search/shows?q=${name}`)
    .then((response) => response.json())
    .then((data) => {
        series = data;
      manageDataResult(data);
    });

}




 function saveInfoInLocalStorage() {
    localStorage.setItem('favorites',JSON.stringify(favorites));
  }
  
 function getInfofromLocalStorage() {
    const result= JSON.parse(localStorage.getItem('favorites')) ;
    if (result===null){
        return [];
    }else {
        favorites = result;
        return favorites;
    }
}

handleFavorites(getInfofromLocalStorage());


const btn = document.querySelector(".js-button");
btn.addEventListener("click", getInfoFromApi);
addEventListenerToSeries();
