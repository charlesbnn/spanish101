import { memo } from 'react'
import { cleMot } from '../donnees.js'
import CarteMasquee from './CarteMasquee.jsx'

// Une ligne mémoïsée : sur un clic, seule la ligne touchée se redessine, pas
// les 528 autres. `onReveler` doit donc rester stable côté Dictionnaire.
const LigneMot = memo(function LigneMot({ source, cible, couleur, cle, revele, onReveler }) {
  return (
    <li className="grid grid-cols-2 gap-3 border-b border-tinta/15 px-4 py-1">
      <span className="self-center px-3 py-2">{source}</span>
      <CarteMasquee
        traduction={cible}
        couleur={couleur}
        revele={revele}
        onReveler={() => onReveler(cle)}
      />
    </li>
  )
})

/**
 * Les deux colonnes : mot source visible à gauche, traduction masquée à droite.
 * Composant d'affichage pur — l'état des cartes révélées vit dans Dictionnaire.
 */
export default function ListeMots({ mots, sens, revelees, onReveler }) {
  return (
    <ol>
      {mots.map((mot) => {
        const cle = cleMot(mot)
        return (
          <LigneMot
            key={cle}
            cle={cle}
            source={mot[sens.source]}
            cible={mot[sens.cible]}
            couleur={sens.couleur}
            revele={revelees.has(cle)}
            onReveler={onReveler}
          />
        )
      })}
    </ol>
  )
}
