/**
 * @typedef {import('../../@types/index.js').Photographer} Photographer
 */

export class PhotographerFactory {
	/** @param {Photographer} data */
	constructor(data) {
		this._name = data.name;
		this._portrait = data.portrait;
		this._pictureURL = `/assets/photos/Photographers ID Photos/${this._portrait}`;
		this._city = data.city;
		this._tagline = data.tagline;
		this._price = data.price;
		this._id = data.id;
	}

	/**@returns {HTMLAnchorElement} */
	getUserCardDOM() {
		const article = document.createElement("a");
		article.setAttribute("href", `./photographer.html?id=${this._id}`);
		article.classList.add("photographer");

		const img = document.createElement("img");
		const wrapper = document.createElement("div");
		wrapper.classList.add("image-wrapper");
		img.setAttribute("src", this._pictureURL);
		img.setAttribute("alt", this._name);
		img.classList.add("photographer__img");
		wrapper.appendChild(img);

		const h2 = document.createElement("h2");
		h2.textContent = this._name;
		h2.classList.add("photographer__name");

		const h3 = document.createElement("h3");
		h3.textContent = this._city;
		h3.classList.add("photographer__city");

		const h4 = document.createElement("h4");
		h4.textContent = this._tagline;
		h4.classList.add("photographer__tagline");

		const p = document.createElement("p");
		p.textContent = `${this._price}€/jour`;
		p.classList.add("photographer__price");

		article.appendChild(wrapper);
		article.appendChild(h2);
		article.appendChild(h3);
		article.appendChild(h4);
		article.appendChild(p);

		return article;
	}
}
