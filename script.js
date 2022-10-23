const app = {};

// const pokemon = "charizard";

//next step is to conenct input box from HTML to our API call using 'pokemon' const

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// app.init = () => {
//   // app.getApp();
// };

let pokemon = document.getElementById("pokemonInput").value;

// console.log(pokemon);

const btn = document.getElementById("getPokemon");

btn.addEventListener(`click`, function (event) {
  app.getApp();
});

app.getApp = () => {
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
      img.src = imgSrc;
      img.alt = `picture of ${pokemonInfo.name}`;
      imgContainer.appendChild(img);
    })
    .catch((error) => {
      console.log(error);
      if (error.message === "Not Found") {
        alert("pick a pokemon that exists! use a new number or name.");
      } else {
        alert("something is wrong");
      }
    });

  pokemon.value = "";
};

// app.init();
