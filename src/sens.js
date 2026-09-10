// Les deux sens de révision du dictionnaire. Une seule liste de mots sert aux
// deux : seul l'ordre des colonnes (source / cible) change.
export const SENS = [
  { id: 'fr-es', label: 'Français → Espagnol', couleur: 'azul', source: 'fr', cible: 'es' },
  { id: 'es-fr', label: 'Espagnol → Français', couleur: 'magenta', source: 'es', cible: 'fr' },
]
