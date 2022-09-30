export class photographerFactory {
    name;
    portrait;
    pictureURL;
    constructor(data) {
        this.name = data.name;
        this.portrait = data.portrait;
        this.pictureURL = `/assets/photos/Photographers ID Photos/${this.portrait}`;
    }
    getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", this.pictureURL);
        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
}
//# sourceMappingURL=photographer.js.map