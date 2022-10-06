import { PhotographerFactory } from "../factories/photographer.js";
async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographers = await fetch("../../data/photographers.json")
        .then((response) => response.json())
        .then((data) => data.photographers);
    // et bien retourner le tableau photographers seulement une fois
    return { photographers };
}
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = new PhotographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection?.appendChild(userCardDOM);
    });
}
export async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}
//# sourceMappingURL=index.js.map