"use strict";
//DIAGRAMA DE FLUJO CON FUNCIONES
/* Arranca la página y se ejecuta handlefavorites()

		  handleFavorites=> paintFavorites && eventListener(-de la X- addOrRemoveFromFavorite)

Tb favorites=getInfoFromLocalStorage()

Cuando se introduce búsqueda y click en botón Buscar => getInfoFromApi => manageDataResult=>

    	manageDataResult=>paintElement || paintElementWhenFavorite && addEventListenerToSeries=>

Cuando la usuaria hace click en un contenedor:

    	addEventListenerToSeries(en el contenedor)=>addOrRemoveFromFavorite

	    addOrRemoveFromFavorite	=>splice || push into favorites && =>handleFavorites && 	=>manageDataResult && =>saveInfoInLocalStorage
		
	  	handleFavorites=> paintFavorites && eventListener( -de la X- addOrRemoveFromFavorite)

Cuando la usuaria hace click en botón Borrar favoritos => addEventListener (deleteAllFavorites)
	    deleteAllFavorites=>handleFavorites && manageDataResult */


const seriesName = document.querySelector(".js-series-section");
const favoritesSection = document.querySelector(".favorites-container");
const deleteButton = document.querySelector(".js-delete-favorites-button");

let series = [];
let favorites = [];
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

//Añade la clase "favorite" a los elementos que se pintan al hacer una nueva búsqueda (si están en la lista favorites)
function paintElementWhenFavorite(dataElement) {
  let codeHTML = "";
  codeHTML += `<div class="js-series-container favorite" id="${dataElement.show.id}">`;
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
  codeHTML += `<article class="js-series-container-favorite" id="${dataElement.show.id}">`;
  codeHTML += "<section>";
  codeHTML += dataElement.show.name;
  codeHTML += "</section>";
  codeHTML += `<article class="image-cross-container">`;
  codeHTML += "<div>";
  if (dataElement.show.image) {
    codeHTML += `<img src="${dataElement.show.image.original}" alt="${dataElement.show.name}" title="${dataElement.show.name}" class="js-image"/>`;
  } else {
    codeHTML += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?
          text=TV" alt="${dataElement.show.name}" title="${dataElement.show.name}" class="js-image"/>`;
  }
  codeHTML += "</div>";
  codeHTML += `<span class="js-delete-favorite" id="${dataElement.show.id}">`;
  codeHTML += "☒";
  codeHTML += "</span>";
  codeHTML += "</article>";
  codeHTML += "</article>";
  return codeHTML;
}

function handleFavorites() {
  let codeHTML = "";
  for (let index = 0; index < favorites.length; index += 1) {
    codeHTML += paintFavorites(favorites[index]);
  }
  favoritesSection.innerHTML = codeHTML;

  const deleteFavorite = document.querySelectorAll(".js-delete-favorite");

  for (let index = 0; index < deleteFavorite.length; index += 1) {
    deleteFavorite[index].addEventListener("click", addOrRemoveFromFavorite);
  }
}

function addOrRemoveFromFavorite(event) {
  event.currentTarget.classList.toggle("favorite");
  const serieId = parseInt(event.currentTarget.id);

  // Buscamos si la serie ya está en el array de favoritos
  let notInFavorites = true;
  for (let index = 0; index < favorites.length; index += 1) {
    // Si está
    // la eliminamos
    if (serieId === favorites[index].show.id) {
      favorites.splice(index, 1);
      notInFavorites = false;
    }
  }

  // SI no ... (else)
  if (notInFavorites === true) {
    // Buscamos la serie en nuestro array de series y lo añadimos al array de favoritos
    for (let index = 0; index < series.length; index += 1) {
      if (serieId === series[index].show.id) {
        favorites.push(series[index]);
      }
    }
  }
  handleFavorites();
  manageDataResult()
  saveInfoInLocalStorage();
}

//EVENT LISTENER para contenedores de series (no botones)
function addEventListenerToSeries() {
  const seriesContainers = document.querySelectorAll(".js-series-container");
  for (let index = 0; index < seriesContainers.length; index += 1) {
    seriesContainers[index].addEventListener("click", addOrRemoveFromFavorite);
  }
}


//Recopila la info de pintar datos y el addEventListener

//Si devuelve un array de longitud 0 muestra mensaje de error
function manageDataResult() {
  let codeHTML = "";
  if (series.length === 0) {
    codeHTML = "No conozco esa serie, lo siento";
  }
  for (let index = 0; index < series.length; index += 1) {
    let notInFavorites = true;
    // for para saber si una serie está en favoritas
    for (let i = 0; i < favorites.length; i += 1) {
      if (favorites[i].show.id === series[index].show.id) {
        notInFavorites = false;
      }
    }

    // si no está en favoritas lo pinta todo con normalidad (sin la clase "favorite")
    if (notInFavorites === true) {
      codeHTML += paintElement(series[index]);
    } else {
      // si está en favoritas
      codeHTML += paintElementWhenFavorite(series[index]);
    }
  }
  seriesName.innerHTML = codeHTML;
  addEventListenerToSeries();
}

//API

function getInfoFromApi(event) {
  event.preventDefault();
  const name = document.querySelector(".js-input").value;
  fetch(`http://api.tvmaze.com/search/shows?q=${name}`)
    .then((response) => response.json())
    .then((data) => {
      series = data;
      manageDataResult();
    });
}

function saveInfoInLocalStorage() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function getInfofromLocalStorage() {
  const result = JSON.parse(localStorage.getItem("favorites"));
  if (result === null) {
    return [];
  } else {
    favorites = result;
    return favorites;
  }
}

function deleteAllFavorites(event){
    event.preventDefault();
    favorites = [];
    handleFavorites();
    manageDataResult();
    localStorage.setItem("favorites", JSON.stringify(favorites));
   
}

favorites = getInfofromLocalStorage()
handleFavorites();

const btn = document.querySelector(".js-button");
btn.addEventListener("click", getInfoFromApi);
deleteButton.addEventListener("click",deleteAllFavorites);
addEventListenerToSeries();


/* const serieToSave = {
  show: {
    name: favorites.show.name,
  }
};
 */