export class Video {
	/**
	 * @param {string} src
	 */
	constructor(src) {
		this._src = src;
	}

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
		// wrapper.append(canvas);
		const type = "video";

		return { wrapper, type };
	}
}
