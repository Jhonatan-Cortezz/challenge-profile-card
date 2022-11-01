const card = document.querySelector('.card')
const pokemonAvatar = document.querySelectorAll('#pokemon-avatar')
const pokemonName = document.querySelector('.card-body-tittle')
const pokemonExp = document.querySelector('.card-body-text')
const pokemonAtack = document.querySelector('.card-footer-social.atack h3')
const pokemonSpecial = document.querySelector('.card-footer-social.special h3')
const pokemonDefend = document.querySelector('.card-footer-social.defend h3')

const loadData = () => {
  const ramdomNumber = getRamdomInit(1, 151)
  getDataFromPokeAPI(ramdomNumber)
}

const getRamdomInit = (min, max) => {
  return Math.floor(Math.random() * (max -min)) + min;
}

const getDataFromPokeAPI = async (idPokemon) => {
  try {
    const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
    const transformDataToJson = await request.json();

    const pokemonData = {
      img: transformDataToJson.sprites.other.dream_world.front_default,
      name: transformDataToJson.name,
      hp: transformDataToJson.stats[0].base_stat,
      experience: transformDataToJson.base_experience,
      atack: transformDataToJson.stats[1].base_stat,
      special: transformDataToJson.stats[3].base_stat,
      defense: transformDataToJson.stats[2].base_stat,  
    }

    printPokemonDataInCard(pokemonData)
  } catch (error) {
    console.log(error);
  }
}

const printPokemonDataInCard = (pokemon) => {
  pokemonAvatar.forEach(element => {
    element.src = pokemon.img
  });

  pokemonName.textContent = pokemon.name
  pokemonExp.textContent = pokemon.experience
  pokemonAtack.textContent = pokemon.atack
  pokemonSpecial.textContent = pokemon.special
  pokemonDefend.textContent = pokemon.defense
}

loadData()

card.addEventListener('mouseleave', event => {
  loadData()
}, false)