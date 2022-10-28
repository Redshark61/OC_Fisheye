/**
 * @param {MouseEvent} e
 */
export function toggleModal(e) {
	e.preventDefault();
	const element = /** @type {HTMLElement} */ (e.target);

	/**@type {HTMLDivElement}*/
	const modal = document.querySelector(element.getAttribute("data-modal"));
	modal.classList.toggle("hidden");
	modal.setAttribute(
		"aria-hidden",
		modal.getAttribute("aria-hidden") === "true" ? "false" : "true"
	);

	document.body.classList.toggle("overflow-hidden");
}

/**
 * @param {MouseEvent} e
 */
export function sendForm(e) {
	e.preventDefault();
	const button = /** @type {HTMLButtonElement} */ (e.target);
	const form = button.closest("form");
	const formData = new FormData(form);
	const data = Object.fromEntries(formData);
	const actionType = button.getAttribute("data-send-to");
	if (actionType === "log") {
		console.log(data);
	}
}
