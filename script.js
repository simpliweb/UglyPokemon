const app = {};

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const pokemonInput = document.getElementById("pokemonInput");

// grab getPokemon button from index.html
const button = document.getElementById("getPokemon");
// grab uglyRandomButton from index.html
const uglyPokemonButton = document.getElementById("uglyRandom");
const uglyName = document.getElementById("uglyName");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const type = document.getElementById("type");
const heightTag = document.getElementById("heightTag");
const weightTag = document.getElementById("weightTag");
const typeTag = document.getElementById("typeTag");

const uglyPokemonList = [
  "dracovish",
  "gurdurr",
  "probopass",
  "mr-mime",
  "bruxish",
  "kricketune",
  "exploud",
  "crabominable",
  "grimer-alola",
  "guzzlord",
  "amoonguss",
  "vullaby",
  "slurpuff",
  "toxel",
  "cursola",
  "hippopotas",
  "rhyperior",
];

app.init = () => {
  app.getUglyPokemon();
  app.inputResult();
};

app.getUglyPokemon = () => {
  uglyPokemonButton.addEventListener("click", (e) => {
    // create a variable to get random result from the array
    let result =
      uglyPokemonList[Math.floor(Math.random() * uglyPokemonList.length)];
    uglyName.textContent = `${result}`;
    // link button result to the api call to show image inside image container
    app.getApp(result);
  });
};

app.inputResult = () => {
  // add click event to the button
  button.addEventListener("click", (e) => {
    // print search result from input value
    uglyName.innerHTML = pokemonInput.value;
    app.getApp(pokemonInput.value);
  });
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
      const imgSrc =
        pokemonInfo.sprites.other["official-artwork"].front_default;
      const imgContainer = document.querySelector(".imageContainer");
      const img = document.createElement("img");
      // clear inside image container
      imgContainer.innerHTML = "";
      pokemonInput.value = "";
      img.src = imgSrc;
      img.alt = `picture of ${pokemonInfo.name}`;
      imgContainer.appendChild(img);
      heightTag.innerHTML = `Height:`;
      weightTag.innerHTML = `Weight:`;
      typeTag.innerHTML = `Type:`;
      height.innerHTML = `${pokemonInfo.height}`;
      weight.innerHTML = `${pokemonInfo.weight}`;
      type.innerHTML = `${pokemonInfo.types["0"].type.name}`;
    })

    .catch((error) => {
      console.log(error);
      if (error.message === "Not Found") {
        alert("Pick a pokemon that exists! Input the correct pokemon name.");
      } else {
        alert("Waiting for your input!");
      }
    });
};

app.init();
