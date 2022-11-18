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
			toggleModal(e);
		};
	});

	const $buttonsSendForm = /** @type {NodeListOf<HTMLButtonElement>} */ (
		document.querySelectorAll("[data-js-action='send-form']")
	);

	$buttonsSendForm.forEach(($button) => {
		$button.onclick = (e) => {
			sendForm(e);
			toggleModal(e);
		};

		$button.onfocus = () => {
			$button.onkeydown = (e) => {
				if (e.key === "Tab" && !e.shiftKey) {
					e.preventDefault();
					/**@type {HTMLDivElement}*/
					const $div = $button
						.closest("[role='dialog']")
						.querySelector("[data-js-action='toggleModal']");
					$div.focus();
				}
			};
		};
	});

	const buttonAsLink = /** @type {NodeListOf<HTMLButtonElement>} */ (
		document.querySelectorAll('button[role="link"]')
	);
	buttonAsLink.forEach(($button) => {
		$button.onkeydown = (e) => {
			if (e.key === "Enter") {
				window.location.href = /** @type {HTMLAnchorElement} */ ($button.children[0]).href;
			}
		};
	});
}
