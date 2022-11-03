import { PhotographerFactory } from "../factories/index.js";

/**
 * @typedef {import('../../@types/index.js').Data} Data
 * @typedef {import("../../@types/index.js").Photographer} Photographer
 */

/** @returns {Promise<{photographers: Photographer[]}>}*/
async function getPhotographers() {
	// Penser à remplacer par les données récupérées dans le json
	const photographers = await fetch("../../data/photographers.json")
		.then((response) => response.json())
		.then(
			/** @param {Data} data*/
			(data) => data.photographers
		);

	// et bien retourner le tableau photographers seulement une fois
	return { photographers };
}

/**@param {Photographer[]} photographers*/
async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section");

	photographers.forEach((photographer, index) => {
		const photographerModel = new PhotographerFactory(photographer, index);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection?.appendChild(userCardDOM);
	});
}

export async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
}
