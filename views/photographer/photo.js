/** @typedef {import('../../@types/index').Media} Media*/

export class Photo {
	/**
	 * @param {Media} media
	 * @param {string} src
	 */
	constructor(media, src) {
		this._media = media;
		this._src = src;
	}

	create() {
		const image = document.createElement("img");
		const wrapper = document.createElement("div");
		wrapper.classList.add("image-wrapper");
		image.setAttribute("alt", this._media.title);
		image.classList.add("gallery-image");
		image.src = this._src;
		wrapper.append(image);

		return wrapper;
	}
}
