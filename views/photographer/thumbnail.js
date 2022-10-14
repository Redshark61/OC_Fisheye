/** @typedef {import('../../@types/index').Photographer} Photographer */

export class PhotographerThumbnail {
	/** @param {Photographer} photographer */
	constructor(photographer) {
		/** @private */
		this._photographer = photographer;
	}

	create() {
		const title = document.createElement("h1");
		title.classList.add("photograph-title");
		title.textContent = this._photographer.name;

		const location = document.createElement("h2");
		location.classList.add("photograph-location");
		location.textContent = this._photographer.city + ", " + this._photographer.country;

		const tagline = document.createElement("p");
		tagline.classList.add("photograph-tagline");
		tagline.textContent = this._photographer.tagline;

		const image = document.createElement("img");
		image.setAttribute("alt", this._photographer.name);
		image.classList.add("photograph-image");
		image.src = `../../assets/photos/Photographers ID Photos/${this._photographer.portrait}`;

		return { title, location, tagline, image };
	}
}
