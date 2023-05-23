/**
 * 
 * @param {string} tagName 
 * @param {object} attributes 
 * @return {HTMLElement}
 */

//* 3: Fichier qui contient toutes les fonctions qui ont un lien avec le DOM

export function createElement(tagName, attributes = {}) {
  const element = document.createElement(tagName)
  for (const [attribute, value] of Object.entries(attributes)) {
    if (value !== null) {
      element.setAttribute(attribute, value)
    }
  }
  return element
}