import type { Photographer } from '../../@types/'

export class PhotographerFactory {
    private _name: string
    private _portrait: string
    private _pictureURL: string
    private _city: string
    private _tagline: string
    private _price: number

    constructor(data: Photographer) {
        this._name = data.name;
        this._portrait = data.portrait;
        this._pictureURL = `/assets/photos/Photographers ID Photos/${this._portrait}`;
        this._city = data.city
        this._tagline = data.tagline;
        this._price = data.price;
    }

    getUserCardDOM() {
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute("src", this._pictureURL)

        const h2 = document.createElement('h2');
        h2.textContent = this._name;

        const h3 = document.createElement('h3');
        h3.textContent = this._city;

        const h4 = document.createElement('h4');
        h4.textContent = this._tagline;

        const p = document.createElement('p');
        p.textContent = `${this._price}€/jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(p);

        return (article);
    }
}