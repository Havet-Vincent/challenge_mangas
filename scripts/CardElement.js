class CardElement
{
    constructor(container, template) {
        this.container = container
        this.template = template

        console.log(this.container)
    }

    get templateClone() {
        return document.importNode(this.template.content, true)
    }

    addAnime(anime_data) {
        this.container.appendChild(this.templateClone)
    }
}