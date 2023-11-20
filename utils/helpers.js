// @ts-check

/**
 * Escapes HTML characters in a text argument to prevent potential security vulnerabilities.
 *
 * @param {string} HTMLText The text content to be sanitized for any potential HTML characters.
 * @returns {string} The text content with HTML characters properly escaped.
 */
const escapeHTML = (HTMLText) => {
	const tempDiv = document.createElement("div");
	tempDiv.textContent = HTMLText;

	return tempDiv.innerHTML;
};

export default escapeHTML;
