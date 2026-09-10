import Dictionnaire from './sections/Dictionnaire.jsx'
import Grammaire from './sections/Grammaire.jsx'

// Registre des sections de l'app : pour ajouter un mode plus tard
// (quiz, audio...), il suffit d'ajouter une entrée ici.
export const SECTIONS = [
  { id: 'dictionnaire', label: 'Dictionnaire', couleur: 'amarillo', composant: Dictionnaire },
  { id: 'grammaire', label: 'Grammaire', couleur: 'verde', composant: Grammaire },
]
