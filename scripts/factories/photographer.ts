import type { Photographer } from '../../@types/'

export class photographerFactory {
    name: string
    portrait: string
    pictureURL: string

    constructor(data: Photographer) {
        this.name = data.name;
        this.portrait = data.portrait;
        this.pictureURL = `/assets/photos/Photographers ID Photos/${this.portrait}`;
    }

    getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", this.pictureURL)
        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
}