function createCard(icon, title){
    
    const pokeDiv = document.createElement("div")
    const pokeImg = document.createElement("img")
    const pokeName = document.createElement("h2")

    pokeDiv.classList.add("pokedex")
    pokeImg.classList.add("pokemon__img")
    pokeName.classList.add("pokemon__name")

    pokeImg.src = icon
    pokeName.innerText = title

    pokeDiv.append(pokeImg, pokeName)

    return pokeDiv
}


function renderCard(icon, title){
    const divCard = document.querySelector(".cards")

    const render = createCard(icon, title)

    divCard.append(render)

    return divCard
}