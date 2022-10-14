import { GalleryFactory } from "../factories/photographer.js";
import { sendForm, toggleModal } from "../utils/contactForm.js";

export async function build() {
	const factory = new GalleryFactory();
	await factory.fetchPhotographer();
	await factory.fetchMediaFromPhotographer();
	factory.buildPhotographerPresentation();
	factory.buildPhotographerGallery(factory.media);

	// Add event listeners

	// --- On select ---
	/**@type {HTMLSelectElement} */
	const $selection = document.querySelector("select");
	$selection.onchange = () => factory.buildPhotographerGallery(factory.media);

	// --- On click ---
	const $buttonsOpenModal = /** @type {NodeListOf<HTMLButtonElement>} */ (
		document.querySelectorAll("[data-js-action='toggleModal']")
	);
	$buttonsOpenModal.forEach(($button) => {
		$button.onclick = (e) => {
			console.log("click");
			toggleModal(e);
		};
	});

	const $buttonsSendForm = /** @type {NodeListOf<HTMLButtonElement>} */ (
		document.querySelectorAll("[data-js-action='send-form']")
	);

	$buttonsSendForm.forEach(($button) => {
		$button.onclick = (e) => {
			sendForm(e);
		};
	});
}
