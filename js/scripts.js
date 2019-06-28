var pokemonRepository=(function () {

// Array of every pokemonObject
 var pokemonList=[];


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

  $button.classList.add('button');
  $button.innerText= pokemon.name;

  $listItem.appendChild($button);
  $pokemonList.appendChild($listItem);
}


// Display them on the DOM as a list
function addThemAll () {
  pokemonRepository.getAll().forEach (function (item) {
  pokemonRepository.addItem (item);
  console.log(item);

  });


//Load the list from the API
function loadList ()  {

}



}
/// Function globaly accessible
  return {
  add: add,
  getAll: getAll,
  addItem: addItem,
  addThemAll: addThemAll,
  };

})();




pokemonRepository.add({name:"A middle night summer dream"});
pokemonRepository.add({name:"Anne frank"});
pokemonRepository.add({name:"Anne Pranki"});
pokemonRepository.add({name:"JeAnne frankette"});


pokemonRepository.addThemAll();
