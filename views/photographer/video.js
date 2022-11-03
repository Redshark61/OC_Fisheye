export class Video {
	/**
	 * @param {string} src
	 * @param {number} tabIndex
	 */
	constructor(src, tabIndex) {
		this._src = src;
		this._tabIndex = tabIndex;
	}

	/**
	 *
	 * @returns {[{wrapper: HTMLButtonElement, type:string}, number]}
	 */
	create() {
		const wrapper = document.createElement("button");
		const video = document.createElement("video");
		video.classList.add("gallery-image");
		const source = document.createElement("source");
		source.src = this._src;
		video.appendChild(source);
		wrapper.appendChild(video);
		wrapper.classList.add("image-wrapper", "no-button");
		const type = "video";

		return [{ wrapper, type }, this._tabIndex];
	}
}
