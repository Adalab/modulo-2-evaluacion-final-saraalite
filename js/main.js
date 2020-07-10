"use strict";

const seriesName = document.querySelector(".js-series-name");
const favoritesSection= document.querySelector(".favorites-container")
let series =  [];
const favorites =[];

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


/*     console.log(event.currentTarget);
    current = event.currentTarget;
    console.log(current)
    console.log(event)  */
// Con esto cogemos el texto que hay en el div, es decir, el nombre de la serie
// current.children[0].innerText !!
//seriesName.innerHTML = event.currentTarget.innerHTML;


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
}

function addEventListenerToSeries() {
  const seriesContainers = document.querySelectorAll(".js-series-container");
  for (let index = 0; index < seriesContainers.length; index += 1) {
    seriesContainers[index].addEventListener("click", addFavorite);
    console.log(seriesContainers[index]);
  }
}


function manageDataResult(data) {
  let codeHTML = "";
  // Mirar lo que hay en data por si no hay datos
  if (data.length === 0) {
    console.log("No hay datos");
  }
  for (let index = 0; index < data.length; index += 1) {
    codeHTML += paintElement(data[index]);
  }
  seriesName.innerHTML = codeHTML;
  /*     addEventListenerToSeries(); */
  addEventListenerToSeries();

}


/* const imgData= `data.path.currentSrc`;
console.log(imgData);
const seriesTitle=`data.path.0.alt`; */



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




/* function saveInfoInLocalStorage() {
    localStorage.setItem(, JSON.stringify(data));
  }
  
  function getInfofromLocalStorage() {
    return JSON.parse(localStorage.getItem('data'));
  }
   */



const btn = document.querySelector(".js-button");
btn.addEventListener("click", getInfoFromApi);
addEventListenerToSeries();
