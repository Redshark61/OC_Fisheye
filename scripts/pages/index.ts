import type { Photographer, Data } from "../../@types";
import { photographerFactory } from "../factories/photographer.js";

async function getPhotographers(): Promise<{ photographers: Photographer[] }> {
	// Penser à remplacer par les données récupérées dans le json
	const photographers = await fetch("../../data/photographers.json")
		.then((response) => response.json())
		.then((data: Data) => data.photographers);
	// et bien retourner le tableau photographers seulement une fois
	return { photographers };
}

async function displayData(photographers: Photographer[]) {
	const photographersSection = document.querySelector<HTMLDivElement>(".photographer_section");

	photographers.forEach((photographer) => {
		const photographerModel = new photographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection?.appendChild(userCardDOM);
	});
}

export async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
}