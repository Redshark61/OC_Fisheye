/** @typedef {import('../../@types/index').Media} Media*/

export class Photo {
	/**
	 * @param {Media} media
	 * @param {string} src
	 * @param {number} tabIndex
	 */
	constructor(media, src, tabIndex) {
		this._media = media;
		this._src = src;
		this._tabIndex = tabIndex;
	}

	/** @returns {[HTMLButtonElement, number]} */
	create() {
		const image = document.createElement("img");
		const wrapper = document.createElement("button");
		wrapper.classList.add("image-wrapper", "no-button");
		image.alt = this._media.title;
		image.classList.add("gallery-image");
		image.src = this._src;
		image.decoding = "async";
		wrapper.append(image);

		return [wrapper, this._tabIndex];
	}
}
