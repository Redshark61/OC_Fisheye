import thumbnailCreator from "../utils/thumbnailCreator.js";

/**
 * @typedef {import('../../@types/index').Media} Media
 * @typedef {import('../../@types/index').Photographer} Photographer
 * @typedef {import('../../@types/index').Data} Data
 */
export class GalleryFactory {
	constructor() {
		/** @private*/
		this._id = new URLSearchParams(window.location.search).get("id");
		/** @type {Data} @private*/
		this._data;
		/** @type {Photographer} @private*/
		this._photographer;
		/** @type {Media[]} @private*/
		this._media;
		/** @private */
		this._totalLikes = 0;
		/**
		 * @private
		 * @typedef {{ title: string, src: string, id: number, type:string } } Image
		 * @type {Image[]}
		 */
		this._images = [];
		/** @private */
		this._currentIndex = 0;
		/** @private */
	}

	/** @private */
	async _fetchData() {
		this._data = await fetch("../../data/photographers.json")
			.then((response) => response.json())
			.then(
				/**
				 * @param {Data} data
				 * @returns {Data}
				 * */
				(data) => data
			);

		return this;
	}

	async fetchPhotographer() {
		if (!this._data) {
			await this._fetchData();
		}

		this._photographer = this._data.photographers.find(
			/**
			 *
			 * @param {Photographer} photographer
			 * @returns {boolean}
			 */
			(photographer) => photographer.id === +this._id
		);

		return this;
	}

	async fetchMediaFromPhotographer() {
		if (!this._data) {
			await this._fetchData();
		}

		this._media = this._data.media.filter(
			/**
			 * @param {Media} media
			 * @returns {boolean}
			 */
			(media) => media.photographerId === +this._id
		);

		return this;
	}

	buildPhotographerPresentation() {
		const header = document.querySelector(".photograph-header");
		const description = document.querySelector(".photograph-description");

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

		description.append(title, location, tagline);
		header.append(image);
	}

	/**@param {Media[]} medias*/
	buildPhotographerGallery(medias) {
		this._images = [];
		const gallery = document.querySelector(".photograph-gallery");
		if (gallery.childElementCount > 0) {
			gallery.innerHTML = "";
		}

		medias.forEach(
			/**
			 * @param {Media} media
			 * @param {number} i
			 */
			(media, i) => {
				this._totalLikes += media.likes;

				const figure = document.createElement("figure");
				figure.classList.add("gallery-figure");

				let wrapper;
				let type = "image";
				const src = `${this._getPath()}${media?.image ?? media?.video}`;
				if (media.image) {
					const image = document.createElement("img");
					wrapper = document.createElement("div");
					wrapper.classList.add("image-wrapper");
					image.setAttribute("alt", media.title);
					image.classList.add("gallery-image");
					image.src = src;
					wrapper.append(image);
				} else {
					const canvas = thumbnailCreator(src);
					wrapper = document.createElement("div");
					wrapper.classList.add("canvas-wrapper");
					wrapper.append(canvas);
					type = "video";
				}

				const figcaption = document.createElement("figcaption");
				figcaption.classList.add("gallery-figcaption");

				const title = document.createElement("h3");
				title.classList.add("gallery-title");
				title.textContent = media.title;

				const likes = document.createElement("p");
				likes.classList.add("gallery-likes");
				likes.innerHTML =
					media.likes +
					"<img src='../../assets/icons/heart.svg' class='like' alt='likes' />";

				const currentImage = { title: media.title, src, id: i, type };
				this._images.push(currentImage);

				figure.addEventListener("click", (e) => {
					this._openImage(e, currentImage);
				});
				figcaption.append(title, likes);
				figure.append(wrapper, figcaption);
				gallery.append(figure);
			}
		);

		const totalLikes = document.querySelector(".total-likes");
		totalLikes.innerHTML = `<span>${this._totalLikes}<i class="fa-solid fa-heart"></i></span><span>${this._photographer.price}€/jour</span>`;
	}

	get media() {
		const select = document.querySelector("select");
		const value = select.value;

		if (value === "popularity") {
			return this._media.sort((a, b) => b.likes - a.likes);
		} else if (value === "date") {
			return this._media.sort(
				(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
			);
		} else if (value === "title") {
			return this._media.sort((a, b) => a.title.localeCompare(b.title));
		} else {
			return this._media;
		}
	}

	set media(value) {
		this._media = value;
	}

	/**
	 * @private
	 * @returns {string}
	 */
	_getPath() {
		const folderName = this._photographer.name.split(" ")[0].replace(/-/g, " ");
		return `../../assets/photos/${folderName}/`;
	}

	/**
	 * @private
	 * @param {MouseEvent} event
	 * @param {{title: string, src: string, id:number, type:string}} image
	 */
	_openImage(event, image) {
		this._currentIndex = image.id;
		const modal = document.createElement("figure");
		modal.classList.add("modal-photo");

		const modalContent = document.createElement("div");
		modalContent.classList.add("modal-content");

		let modalMedia;
		if (image.type === "image") {
			modalMedia = document.createElement("img");
			modalMedia.src = image.src;
			modalMedia.setAttribute("alt", image.title);
		} else {
			modalMedia = document.createElement("video");
			const source = document.createElement("source");
			source.src = image.src;
			source.type = "video/mp4";
			modalMedia.append(source);
			modalMedia.controls = true;
		}

		const modalTitle = document.createElement("figcaption");
		modalTitle.textContent = image.title;

		const modalClose = document.createElement("img");
		modalClose.src = "../../assets/icons/close-red.svg";
		modalClose.classList.add("modal-close");
		modalClose.addEventListener("click", () => this._closeModal());

		const divLeft = document.createElement("img");
		divLeft.src = "../../assets/icons/left.svg";
		divLeft.classList.add("div-left");

		const divRight = document.createElement("img");
		divRight.src = "../../assets/icons/right.svg";
		divRight.classList.add("div-right");

		divLeft.onclick = () => this._changeImage(-1);
		divRight.onclick = () => this._changeImage(1);

		window.onkeydown =
			/** @param {KeyboardEvent} e */
			(e) => {
				if (e.key === "ArrowLeft") {
					this._changeImage(-1);
				} else if (e.key === "ArrowRight") {
					this._changeImage(1);
				} else if (e.key === "Escape") {
					this._closeModal();
				}
			};

		modalContent.append(modalMedia, modalTitle);
		modal.append(modalClose, divLeft, modalContent, divRight);
		document.body.appendChild(modal);
	}

	/**
	 * @private
	 * @param {number} offset
	 */
	_changeImage(offset) {
		const nexImage = this._images[this._currentIndex + offset];

		/** @type {HTMLImageElement | HTMLVideoElement} */
		const image =
			document.querySelector(".modal-content img") ||
			document.querySelector(".modal-content video");

		const title = document.querySelector(".modal-content figcaption");
		if (nexImage) {
			title.textContent = nexImage.title;
			this._currentIndex += offset;
			if (nexImage.type === "image" && image.tagName === "IMG") {
				image.src = nexImage.src;
			} else if (nexImage.type === "video" && image.tagName === "VIDEO") {
				image.querySelector("source").src = nexImage.src;
			} else if (nexImage.type === "image" && image.tagName === "VIDEO") {
				const newImage = document.createElement("img");
				newImage.setAttribute("alt", nexImage.title);
				newImage.src = nexImage.src;
				image.parentNode.replaceChild(newImage, image);
			} else {
				const newVideo = document.createElement("video");
				const source = document.createElement("source");
				source.src = nexImage.src;
				source.type = "video/mp4";
				newVideo.append(source);
				newVideo.controls = true;
				image.parentNode.replaceChild(newVideo, image);
			}
		}
	}

	/** @private*/
	_closeModal() {
		const modal = document.querySelector(".modal-photo");
		modal.remove();
		window.onkeydown = null;
	}
}
