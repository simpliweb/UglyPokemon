const app = {};

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const pokemonInput = document.getElementById("pokemonInput");
const getPokemonButton = document.getElementById("getPokemon");
const uglyPokemonButton = document.getElementById("uglyRandom");
const uglyName = document.getElementById("uglyName");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const heightUnit = document.getElementById("heightUnit");
const weightUnit = document.getElementById("weightUnit");
const type = document.getElementById("type");
const heightTag = document.getElementById("heightTag");
const weightTag = document.getElementById("weightTag");
const typeTag = document.getElementById("typeTag");
const imgContainer = document.querySelector(".imageContainer");
const pokeDetails = document.querySelector(".pokeDetails");
const nameImageContainer = document.querySelector(".nameImageContainer");

const uglyPokemonList = [
  "dracovish",
  "gurdurr",
  "probopass",
  "mr-mime",
  "bruxish",
  "kricketune",
  "exploud",
  "crabominable",
  "grimer",
  "muk",
  "guzzlord",
  "amoonguss",
  "vullaby",
  "slurpuff",
  "toxel",
  "cursola",
  "hippopotas",
  "rhyperior",
  "snubbull",
  "exeggcute",
  "drowzee",
  "seismitoad",
  "feebas",
  "purugly",
  "barbaracle",
  "electivire",
  "magmortar",
  "garbodor",
  "jynx",
];

app.init = () => {
  app.getUglyPokemon();
  app.inputResult();
};

// app.getUglyPokemon grabs random list of ugly pokemons from uglyPokemonList array and displays inside .contentCotainer
app.getUglyPokemon = () => {
  uglyPokemonButton.addEventListener("click", (e) => {
    let result =
      uglyPokemonList[Math.floor(Math.random() * uglyPokemonList.length)];
    uglyName.textContent = `${result}`;
    app.getApp(result);
  });
};

// app.inputResult shows searched Pokemon from input and displays pokemon inside .contentCotainer
app.inputResult = () => {
  getPokemonButton.addEventListener("click", (e) => {
    e.preventDefault();
    uglyName.textContent = pokemonInput.value;
    app.getApp(pokemonInput.value.toLowerCase());
    imgContainer.innerHTML = "";
    heightTag.innerHTML = "";
    heightUnit.innerHTML = "";
    weightTag.innerHTML = "";
    weightUnit.innerHTML = "";
    typeTag.innerHTML = "";
    height.innerHTML = "";
    weight.innerHTML = "";
    type.innerHTML = "";
    pokeDetails.style.background = "";
  });
};

app.getApp = (pokemon) => {
  fetch(`${baseUrl}${pokemon}`)
    .then((res) => {
      if (res.ok === true) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((pokemonInfo) => {
      const imgSrc =
        pokemonInfo.sprites.other["official-artwork"].front_default;
      const img = document.createElement("img");
      imgContainer.innerHTML = "";
      pokemonInput.value = "";
      img.src = imgSrc;
      img.alt = `picture of ${pokemonInfo.name}`;
      imgContainer.appendChild(img);
      heightUnit.innerHTML = `dm`;
      weightUnit.innerHTML = `hg`;
      heightTag.innerHTML = `Height:`;
      weightTag.innerHTML = `Weight:`;
      typeTag.innerHTML = `Type:`;
      height.innerHTML = `${pokemonInfo.height}`;
      weight.innerHTML = `${pokemonInfo.weight}`;
      type.innerHTML = `${pokemonInfo.types["0"].type.name}`;
      pokeDetails.style.backgroundColor = `rgba(255, 255, 255, 0.45)`;
      nameImageContainer.style.backgroundColor = `rgba(255, 255, 255, 0.45)`;
    })
    .catch((error) => {
      if (error.message === "Not Found") {
        alert("Pick a pokemon that exists! Input the correct pokemon name.");
      } else {
        alert("Waiting for your input!");
      }
    });
};

app.init();
