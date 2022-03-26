let indice = 0;

const imageAnimation = document.getElementById("pokeImg");
const txtAnimation = document.getElementById("pokeAnima");

const animation = () => {

    imageAnimation.classList.remove('slide-in');
    txtAnimation.classList.remove('slide-in');

    setTimeout(() => imageAnimation.classList.add('slide-in'), 150);
    setTimeout(() => txtAnimation.classList.add('slide-in'), 150);
}



const fetchPokemon = () => {
    const pokeName = document.getElementById('pokeName');
    let pokeInput = pokeName.value.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`

    fetch(url).then((res) => {
        if (res.status != "2000") {
            pokeImage("./images/404.svg");
            pokeData("ERROR", "00");
        } else {
            return res.json();
        }

        return res.json();

    }).then((data) => {


        let pokeweight = data.weight;
        let pokeheight = data.height;
        let pokename = data.name;
        let pokenum = data.id;
        let poketype = data.types.map((type) => type.type.name).join(' ');
        let pokeabilities = data.abilities.map((ability) => ability.ability.name).join(' <br>');
        let imgurl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokenum}.png`;


        pokeImage(imgurl);
        pokeData(pokename, pokenum, pokeweight, pokeheight);
        pokeType(poketype, pokeabilities);
        indice = pokenum;
    })

}


const changePokemon = () => {




    const url = `https://pokeapi.co/api/v2/pokemon/${indice}`


    fetch(url).then((res) => {

        if (res.status != "2000") {

            pokeImage("./images/404.svg");
            pokeData("ERROR", "00");
        } else {
            return res.json();
        }
        return res.json();
    }).then((data) => {


        let pokeweight = data.weight;
        let pokeheight = data.height;
        let pokename = data.name;
        let pokenum = data.id;
        let poketype = data.types.map((type) => type.type.name).join(' ');
        let pokeabilities = data.abilities.map((ability) => ability.ability.name).join(' ');
        let imgurl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokenum}.png`;

        pokeImage(imgurl);
        pokeData(pokename, pokenum, pokeweight, pokeheight);
        pokeType(poketype, pokeabilities);

        imageAnimation.className = "main-image slide-in";

    })
}


const pokeData = (name, id, weight, height) => {

    const poketitle = document.getElementById("poketitle");
    const pokenum = document.getElementById("pokenum");
    const index = document.getElementById("pokeindex");
    const pokew = document.getElementById("pokew");
    const pokeh = document.getElementById("pokeh");
    const pokeKg = weight * 0.1;
    const pokeM = height * 0.1;
    poketitle.innerHTML = name.toUpperCase();
    pokenum.innerHTML = `#0${id}`;
    index.innerHTML = id;
    pokew.innerHTML = `${pokeKg.toFixed(1)}Kg`;
    pokeh.innerHTML = `${pokeM.toFixed(2)}m`;
}

const pokeImage = (url) => {

    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;

}

const pokeType = (types, abilities) => {

    const poketypes = document.getElementById("poketype");
    const pokeabilities = document.getElementById("abilities");
    const pokebg = document.getElementById("screen");

    poketypes.innerHTML = types;
    pokeabilities.innerHTML = abilities;
    pokebg.className = types;
}




var btnLeft = document.querySelector("#btnLeft");
var btnRight = document.querySelector("#btnRight");
var searchInput = document.querySelector("#pokeName");

btnRight.addEventListener("click", function onclick(event) {
    indice++;
    animation();
    changePokemon();
});

btnLeft.addEventListener("click", function onclick(event) {
    indice--;
    animation();
    changePokemon();
});



window.pokeName.addEventListener('change', () => {
    // console.log(window.pokeName.value);

    fetchPokemon();
    animation();
    namePoke = document.getElementById("pokeName").value = "";


});