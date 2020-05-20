export default class Pokemon {
    constructor(data) {
        this.name = data.name
        this.img = data.img || data.sprites.front_default
        this.description = "A brand new shiny " + this.name
        this.weight = data.weight
        this.height = data.height
    }

    get Template() {
        return `<div class="card">
                    <img class="card-img-top" src="${this.img}" alt="">
                    <div class="card-body">
                        <h4 class="card-title">${this.name}</h4>
                        <p class="card-text">Height: ${this.height} | Weight: ${this.weight}</p>
                        <p class="card-text">Description: ${this.description}</p>
                        <button class="btn btn-success" onclick="app.pokeController.catch()">Catch 'em!</button>
                    </div>
                </div>`
    }
}