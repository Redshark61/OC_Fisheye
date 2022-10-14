import { GalleryFactory } from "../factories/photographer.js";

export async function build() {
	const factory = new GalleryFactory();
	await factory.fetchPhotographer();
	await factory.fetchMediaFromPhotographer();
	factory.buildPhotographerPresentation();
	factory.buildPhotographerGallery(factory.media);

	/**@type {HTMLSelectElement} */
	const selection = document.querySelector("select");
	selection.onchange = () => factory.buildPhotographerGallery(factory.media);
}
