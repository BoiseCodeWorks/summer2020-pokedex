export default class Pokemon {
    constructor(data) {
        this.id = data._id
        this.name = data.name
        this.img = data.img || data.sprites.front_default
        this.description = data.description || "A wild Pokemon"
        this.weight = data.weight
        this.height = data.height
    }

    get Template() {
        return `<div class="card">
                    <img class="card-img-top" src="${this.img}" alt="">
                    <div class="card-body">
                        <h4 class="card-title">${this.name}</h4>
                        <p class="card-text">Height: ${this.height} | Weight: ${this.weight}</p>
                        ${this.SubTemplate}
                    </div>
                </div>`
    }

    get SubTemplate() {
        if (!this.id) {
            return `
            <p class="card-text">Description: ${this.description}</p>
            <button class="btn btn-success" onclick="app.pokeController.catch()">Catch 'em!</button>`
        }
        return /*html*/`
        <form class="form-inline" onsubmit="app.pokeController.editPokemon(event)">
            <div class="form-group">
                <input type="text" name="description" id="description" class="form-control" value="${this.description}">
                <button type="submit" class="btn btn-info">Edit</button>
        </div>
        </form>
        <button class="btn btn-danger" onclick="app.pokeController.release()">Release</button>
        `
    }



}