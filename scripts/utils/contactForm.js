/** @param {MouseEvent | KeyboardEvent} e */
export function toggleModal(e) {
	e.preventDefault();
	let element = /** @type {HTMLElement} */ (e.target);

	if (element.tagName !== "BUTTON") {
		element = element.parentElement;
	}
	/**@type {HTMLDivElement}*/
	const modal = document.querySelector(element.getAttribute("data-modal"));
	modal.classList.toggle("hidden");
	modal.ariaHidden = modal.getAttribute("aria-hidden") === "true" ? "false" : "true";
	modal.querySelectorAll("button")[0].focus();
	document.body.classList.toggle("overflow-hidden");
}

/** @param {MouseEvent} e */
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
