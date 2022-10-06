export class PhotographerFactory {
    _name;
    _portrait;
    _pictureURL;
    _city;
    _tagline;
    _price;
    constructor(data) {
        this._name = data.name;
        this._portrait = data.portrait;
        this._pictureURL = `/assets/photos/Photographers ID Photos/${this._portrait}`;
        this._city = data.city;
        this._tagline = data.tagline;
        this._price = data.price;
    }
    getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", this._pictureURL);
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
//# sourceMappingURL=photographer.js.map