var pokemonRepository=(function () {

// Array of every pokemonObject
 var pokemonList=[];
 var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


function add( pokemon) {
   if ( typeof pokemon === 'object' ) {
 pokemonList.push (pokemon);  }
   else {
    console.log( ' not an object');
   }
  }


function getAll() {
return pokemonList;
}


// add li and button to the list
function addItem (pokemon) {

  var $pokemonList = document.querySelector('.pokemonList');

  var $listItem = document.createElement('li');
  var $button= document.createElement('button');
  $button.addEventListener('click', function(event){
    pokemonRepository.showDetails(pokemon);
    pokemonRepository.displayPicture(pokemon.imageUrl);
  });


  $button.classList.add('button');
  $button.innerText= pokemon.name;

  $listItem.appendChild($button);
  $pokemonList.appendChild($listItem);
}

function showDetails (pokemon) {

console.log(pokemon.imageUrl + " name  " +  pokemon.name);

}





function displayPicture(url) {



var $picture = document.createElement("img");
$picture.src =url;

 // var $elementToRemove = document.querySelector("image");
// src.parentElement.removeChild();
//
var src = document.getElementById("image");
src.appendChild($picture);

}




// Display them on the DOM as a list
function addThemAll () {
  pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addItem(pokemon);
      pokemonRepository.loadDetails(pokemon);
    });
  });
}




//Load the list from the API
function loadList ()  {
  return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
          var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        pokemonRepository.add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })

}


function loadDetails(pokemon) {
    var url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }





/// Function globaly accessible
  return {
  add: add,
  getAll: getAll,
  addItem: addItem,
  addThemAll: addThemAll,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,

  displayPicture: displayPicture
  };

})();



pokemonRepository.addThemAll();
pokemonRepository.displayPicture();
// pokemonRepository.add({name:"A middle night summer dream"});
// pokemonRepository.add({name:"Anne frank"});
// pokemonRepository.add({name:"Anne Pranki"});
// pokemonRepository.add({name:"JeAnne frankette"});


// pokemonRepository.addThemAll();
console.log(pokemonRepository.getAll());
