import thumbnailCreator from "../../scripts/utils/thumbnailCreator.js";

export class Video {
	/**
	 * @param {string} src
	 */
	constructor(src) {
		this._src = src;
	}

	create() {
		const canvas = thumbnailCreator(this._src);
		const wrapper = document.createElement("div");
		wrapper.classList.add("canvas-wrapper");
		wrapper.append(canvas);
		const type = "video";

		return { wrapper, type };
	}
}
