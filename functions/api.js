//* 1: Fonction qui permet de récupérer un JSON

export async function fetchJSON (url, options = {}) {
  // Je crée un header où je lui dis de prendre les options qu'on a déjà envoyé
  const headers = {Accept: 'application/json', ...options.headers}
  // Je récupère la réponse 'r'
  const r = await fetch(url, {...options, headers})
  // Si 'r' est ok
  if(r.ok) {
    // Je returne et je parse sous format JSON
    return r.json()
  }
  throw new Error('Erreur serveur', {cause: r})
}