var pokemonRepository=(function () {

  // Array of every pokemonObject
  var pokemonList=[];

  // API URL to fetch
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';



   // add pokemon to the array
  function add( pokemon) {
    if ( typeof pokemon === 'object' ) {
      pokemonList.push (pokemon);  }
      else {
        console.log( ' not an object');
      }
    }

   // return the complete array of pokemon
    function getAll() {
      return pokemonList;
    }


    // add li,button and event listener to the list
    function addItem (pokemon) {

      var $pokemonList = document.querySelector('.pokemonList');

      var $listItem = document.createElement('li');
      var $button= document.createElement('button');
      $button.addEventListener('click', function(event){
        pokemonRepository.showDetails(pokemon);

      });

      $button.addEventListener('click', function(event){
        pokemonRepository.showDetails(pokemon);

      });

      $button.classList.add('button');
      $button.innerText= pokemon.name;

      $listItem.appendChild($button);
      $pokemonList.appendChild($listItem);
    }


    // display the details after event listener
    function showDetails (pokemon) {
      var $modalContainer = document.querySelector('#modal-container');

      $modalContainer.innerHTML = '';

      var modal = document.createElement('div');
      modal.classList.add('modal');

      // Add the new modal content
      var closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';


      var titleElement = document.createElement('h1');
      titleElement.innerText = 'Name:   ' + pokemon.name;

      var contentElement = document.createElement('p');
      contentElement.innerText = 'Height   '  + pokemon.height + 'm';


      var pictureElement = document.createElement('Img');
      pictureElement.src =pokemon.imageUrl;
      pictureElement.classList.add('image');



      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(pictureElement);
      $modalContainer.appendChild(modal);

      $modalContainer.classList.add('is-visible');

      console.log(pokemon.imageUrl + " name  " +  pokemon.name);

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

    };

  })();



  pokemonRepository.addThemAll();
