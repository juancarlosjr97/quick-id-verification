/**
 * Get Image Base 64 Plain
 *
 * @param {string} imageBase64
 *
 * @returns {string}
 */
const getImageBase64Plain = (imageBase64) => imageBase64.split("base64,")[1];

/**
 * Get Image as a String Buffer
 *
 * @param {string} imageBase64
 *
 * @returns {string}
 */
const getImageFromBase64ToBuffer = (imageBase64) => Buffer.from(getImageBase64Plain(imageBase64), "base64");

export { getImageFromBase64ToBuffer };
