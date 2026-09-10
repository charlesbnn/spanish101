// Filtrage en mémoire : les listes sont déjà chargées, aucune requête déclenchée.

/** Valeurs distinctes d'un champ, dans l'ordre imposé si `ordre` est fourni. */
export function valeursDistinctes(liste, champ, ordre) {
  const valeurs = [...new Set(liste.map((item) => item[champ]).filter(Boolean))]
  if (ordre) return ordre.filter((valeur) => valeurs.includes(valeur))
  return valeurs.sort((a, b) => a.localeCompare(b, 'fr'))
}

/** Ne garde que les entrées correspondant à tous les filtres non vides. */
export function appliquerFiltres(liste, filtres) {
  const actifs = Object.entries(filtres).filter(([, valeur]) => valeur !== '')
  if (actifs.length === 0) return liste
  return liste.filter((item) => actifs.every(([champ, valeur]) => item[champ] === valeur))
}
