/**
 * @typedef {import('../../@types/index').Media} Media
 * @typedef {import('../../@types/index').Photographer} Photographer
 * @typedef {import('../../@types/index').Data} Data
 */

export class Figure {
	/**
	 * @param {import('../../scripts/factories/photographer').GalleryFactory} Factory
	 * @param {Media} media
	 * @param {HTMLElement} figure
	 * @param {HTMLDivElement} gallery
	 * @param {string} src
	 * @param {string} type
	 * @param {number} i
	 * @param {HTMLDivElement} wrapper
	 */
	constructor(Factory, media, figure, gallery, src, type, i, wrapper, tabIndex) {
		this._Factory = Factory;
		this._figure = figure;
		this._media = media;
		this._gallery = gallery;
		this._src = src;
		this._type = type;
		this._i = i;
		this._wrapper = wrapper;
		this._tabIndex = tabIndex;
	}

	render() {
		const figcaption = document.createElement("figcaption");
		figcaption.classList.add("gallery-figcaption");

		const title = document.createElement("h3");
		title.classList.add("gallery-title");
		title.textContent = this._media.title;

		const likes = document.createElement("p");
		likes.tabIndex = this._tabIndex;
		likes.classList.add("gallery-likes");
		likes.innerHTML =
			this._media.likes +
			`<img src='../../assets/icons/heart${
				!this._media.isLiked ? "-empty" : ""
			}.svg' class='like' alt='likes' />`;

		likes.addEventListener("click", () => {
			this._Factory.like(this._media);
		});

		likes.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				this._Factory.like(this._media);
			}
		});

		const currentImage = {
			title: this._media.title,
			src: this._src,
			id: this._i,
			type: this._type,
		};

		this._Factory.images.push(currentImage);
		figcaption.append(title, likes);
		this._figure.append(this._wrapper, figcaption);

		this._figure.children[0].addEventListener(
			"click",
			/**@param {MouseEvent} e */
			(e) => {
				this._Factory.openImage(e, currentImage);
			}
		);

		this._figure.children[0].addEventListener(
			"keydown",
			/**@param {KeyboardEvent} e */
			(e) => {
				if (e.key === "Enter") {
					this._Factory.openImage(e, currentImage);
				}
			}
		);

		this._gallery.append(this._figure);
		return this._tabIndex++;
	}
}
