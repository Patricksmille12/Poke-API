const loading = document.querySelector(".loading");
const cardsContainer = document.querySelector(".cards");

const inputSearch = document.querySelector(".input__search");
const buttonSearch = document.querySelector(".button__search");

async function getPokemons() {
  const pokemons = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((error) => console.log(error));

  return pokemons.results;
}

const pokemons = await getPokemons();

async function PokemonsImg(url) {
  const pokemonImg = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((error) => console.log(error));

  return pokemonImg.sprites.front_default;
}

function renderImgName(arrayPokemons) {
  let count = 0

  arrayPokemons.forEach(async (pokemon) => {
    const img = await PokemonsImg(pokemon.url);
    count++
    renderCard(img, `${count} - ${pokemon.name}`)
  });

  loading.style.display = "none";
  cardsContainer.style.display = "flex";
}
setTimeout(() => {
  renderImgName(pokemons);
}, 1000);

function searchRender() {
  buttonSearch.addEventListener("click", async (event) => {
    event.preventDefault();
    const input = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${inputSearch.value}?limit=100000&offset=0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => resp);

    const divCard = document.querySelector(".cards");

    divCard.innerHTML = "";

    loading.style.display = "none";
    cardsContainer.style.display = "flex";

    const img = input.sprites.front_default;
    const name = input.forms[0].name;

    renderCard(img, name);
  });
}

async function renderAll(){
  const renderAlls   = document.querySelector('#all');
  const pokemon = await getPokemons();

  renderAlls.addEventListener('click', () => {
    render(pokemon);
  })
}

searchRender();

renderAll()
