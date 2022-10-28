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
	 * @returns {[{wrapper: HTMLDivElement, type:string}, number]}
	 */
	create() {
		// const canvas = thumbnailCreator(this._src);
		const wrapper = document.createElement("div");
		const video = document.createElement("video");
		video.classList.add("gallery-image");
		const source = document.createElement("source");
		source.src = this._src;
		video.appendChild(source);
		wrapper.appendChild(video);
		wrapper.classList.add("image-wrapper");
		wrapper.tabIndex = this._tabIndex;
		this._tabIndex++;
		// wrapper.append(canvas);
		const type = "video";

		return [{ wrapper, type }, this._tabIndex];
	}
}
