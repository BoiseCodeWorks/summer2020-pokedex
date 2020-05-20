import PokeService from "../Services/PokeService.js";
import store from "../store.js";

//Private
function _drawApiPokemon() {
    let pokemon = store.State.apiPokemon;
    let template = ''
    pokemon.forEach(name => {
        template += `<li class="action" onclick="app.pokeController.getPokeDetails('${name}')">${name}</li>`
    });
    document.getElementById('api-pokemon').innerHTML = template;
}

function _drawActivePokemon() {
    let pokemon = store.State.activePokemon
    if (pokemon) {
        document.getElementById("active-pokemon").innerHTML = pokemon.Template
    } else {
        document.getElementById("active-pokemon").innerHTML = ""
    }
}

function _drawMyPokemon() {
    let pokemon = store.State.myPokemon;
    let template = ''
    pokemon.forEach(poke => {
        template += `<li class="action" onclick="app.pokeController.setActivePokemon('${poke.id}')">${poke.name}</li>`
    });
    document.getElementById('my-pokemon').innerHTML = template;
}

//Public
export default class PokeController {
    constructor() {
        store.subscribe("apiPokemon", _drawApiPokemon);
        store.subscribe("myPokemon", _drawMyPokemon);
        store.subscribe("activePokemon", _drawActivePokemon);
    }

    getPokeDetails(name) {
        PokeService.getPokeDetails(name);
    }

    catch() {
        PokeService.catch()
    }
    release() {
        PokeService.release()
    }

    setActivePokemon(id) {
        PokeService.setActivePokemon(id)
    }

    editPokemon(event) {
        event.preventDefault();
        let update = { description: event.target.description.value }
        PokeService.editPokemon(update);
    }
}
