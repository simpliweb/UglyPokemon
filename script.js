const app = {};

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const pokemonInput = document.getElementById("pokemonInput");  

// grab getPokemon button from index.html
const button = document.getElementById("getPokemon");
// grab uglyRandomButton from index.html
const uglyPokemonButton = document.getElementById("uglyRandom");
// console.log(uglyPokemonButton)

const uglyPokemonList = [ 
"dracovish",  
"darmanitan-standard",
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

app.inputResult = () => {
    // add click event to the button 
  button.addEventListener('click', e => {  
  // print search result from input value
    app.getApp(pokemonInput.value);
    // app.getUglyPokemon();
  })
}
app.getUglyPokemon = () => {
  uglyPokemonButton.addEventListener('click', e => {
    // create a variable to get random result from the array
    let result = uglyPokemonList[Math.floor(Math.random() * uglyPokemonList.length)];
    console.log(result);
    // link button result to the api call to show image inside image container
    app.getApp(result);
  })
}

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
      imgContainer.innerHTML = '';
      pokemonInput.value = '';
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

app.init();
