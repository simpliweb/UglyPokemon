const app = {};

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// grab button from index.html
const button = document.getElementById("getPokemon");

app.init = () => {
  // add click event to the button 
  button.addEventListener('click', e => {
  // grab input from index.html  
  const pokemonInput = document.getElementById("pokemonInput");
  // print search result from input value
    app.getApp(pokemonInput.value);
  })
};

app.getApp = (pokemon) => {

  fetch(`${baseUrl}${pokemon}`)
    .then((res) => {
      console.log(res);
      if (res.ok === true) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((pokemonInfo) => {
      const imgSrc = pokemonInfo.sprites.front_default;
      const imgContainer = document.querySelector(".imageContainer");
      const img = document.createElement("img");
      // clear inside image container 
      imgContainer.innerHTML = ``;
      img.src = imgSrc;
      img.alt = `picture of ${pokemonInfo.name}`;
      imgContainer.appendChild(img);
    })
    .catch((error) => {
      console.log(error);
      if (error.message === "Not Found") {
        alert("pick a pokemon that exists! input the correct pokemon name.");
      } else {
        alert("something is wrong");
      }
    });
};

// app.init();
