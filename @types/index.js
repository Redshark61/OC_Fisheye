/**
 * @typedef Photographer
 * @property {string} name
 * @property {number} id
 * @property {string} city
 * @property {string} country
 * @property {string} tagline
 * @property {number} price
 * @property {string} portrait
 */

export const Photographer = {};

/** @type {Photographer} */

/**
 * @typedef Media
 * @property {number} id
 * @property {number} photographerId
 * @property {string} title
 * @property {string} [image]
 * @property {string} [video]
 * @property {number} likes
 * @property {string} date
 * @property {number} price
 * @property {boolean} [isLiked]
 */

export const Media = {};

/** @type {Media} */

/**
 * @typedef Data
 * @property {Photographer[]} photographers
 * @property {Media[]} media
 */

export const Data = {}; /** @type {Data} */
