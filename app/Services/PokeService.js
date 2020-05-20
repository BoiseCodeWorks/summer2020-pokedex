import store from "../store.js";
import Pokemon from "../Models/Pokemon.js";

// @ts-ignore
const _pokeApi = axios.create({
    baseURL: "https://pokeapi.co/api/v2/pokemon",
    timeout: 3000
})

// @ts-ignore
const _sandboxApi = axios.create({
    baseURL: "https://bcw-sandbox.herokuapp.com/api/mark/pokemon",
    timeout: 15000
})

class PokeService {
    constructor() {
        this.getApiPokemon()
        this.getMyPokemon()
    }

    setActivePokemon(id) {
        let pokemon = store.State.myPokemon.find(p => p.id == id)
        if (pokemon) {
            store.commit('activePokemon', pokemon)
        }
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
        store.State.activePokemon.description = "A brand new shiny " + store.State.activePokemon.name
        _sandboxApi.post("", store.State.activePokemon)
            .then(res => {
                this.getMyPokemon();
            })
            .catch(e => console.error(e))
    }

    // PUT
    editPokemon(update) {
        _sandboxApi.put(store.State.activePokemon.id, update)
            .then(res => {
                this.getMyPokemon()
            })
            .catch(e => console.error(e))
    }
    // DELETE
    release() {
        _sandboxApi.delete(store.State.activePokemon.id)
            .then(res => {
                this.getMyPokemon();
                store.commit("activePokemon", null)
            })
            .catch(e => console.error(e))
    }
}

const service = new PokeService();
export default service;
