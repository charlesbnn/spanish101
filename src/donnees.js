// Point d'entrée unique des données de l'app.
// Les JSON du repo sont inclus dans le bundle au build (aucune requête réseau).
// C'est ici que viendra se greffer la priorité au fichier importé (localStorage).
import conjugaisons from './data/conjugaisons.json'
import dico from './data/dico.json'
import grammaire from './data/grammaire.json'

export const DICO = dico
export const GRAMMAIRE = grammaire
export const CONJUGAISONS = conjugaisons

/** Identifiant stable d'un mot : la paire elle-même (le dico n'a pas d'ID). */
export function cleMot(mot) {
  return `${mot.fr}|${mot.es}`
}
