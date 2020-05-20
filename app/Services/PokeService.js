import store from "../store.js";
import Pokemon from "../Models/Pokemon.js";

// @ts-ignore
const _pokeApi = axios.create({
    baseURL: "https://pokeapi.co/api/v2/pokemon",
    timeout: 3000
})

const _sandboxApi = axios.create({
    baseURL: "https://bcw-sandbox.herokuapp.com/api/mark/pokemon",
    timeout: 15000
})

class PokeService {
    constructor() {
        this.getApiPokemon()
        this.getMyPokemon()
    }
    getApiPokemon() {
        _pokeApi.get('?limit=150')
            .then(res => {
                // NOTE this grabs only the string name of each pokemon
                let pokeNames = res.data.results.map(r => r.name)
                store.commit("apiPokemon", pokeNames)
            })
    }
    getPokeDetails(name) {
        _pokeApi.get(name)
            .then(res => {
                let pokemon = new Pokemon(res.data)
                store.commit('activePokemon', pokemon)
            })
    }

    getMyPokemon() {
        _sandboxApi.get('')
            .then(res => {
                let pokemon = res.data.data.map(p => new Pokemon(p))
                store.commit('myPokemon', pokemon)
            })
            .catch(e => console.error(e))
    }

    // POST
    catch() {
        _sandboxApi.post("", store.State.activePokemon)
            .then(res => {
                this.getMyPokemon();
            })
            .catch(e => console.error(e))
    }

    // PUT

    // DELETE
}

const service = new PokeService();
export default service;
