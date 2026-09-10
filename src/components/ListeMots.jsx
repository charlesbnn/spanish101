import { COULEURS } from '../couleurs.js'
import { cleMot } from '../donnees.js'
import CarteMasquee from './CarteMasquee.jsx'

const LIBELLES = { fr: 'Français', es: 'Espagnol' }

/**
 * Les deux colonnes : mot source visible à gauche, traduction masquée à droite.
 * Composant d'affichage pur — l'état des cartes révélées vit dans Dictionnaire.
 */
export default function ListeMots({ mots, sens, revelees, onReveler }) {
  const c = COULEURS[sens.couleur]

  return (
    <div>
      <div
        className={`sticky top-0 grid grid-cols-2 gap-3 border-b-4 border-tinta px-4 py-2 font-display text-xs uppercase tracking-widest ${c.fond} ${c.sur}`}
      >
        <span className="px-3">{LIBELLES[sens.source]}</span>
        <span className="px-3">{LIBELLES[sens.cible]}</span>
      </div>

      <ol>
        {mots.map((mot) => {
          const cle = cleMot(mot)
          return (
            <li
              key={cle}
              className="grid grid-cols-2 gap-3 border-b border-tinta/15 px-4 py-1"
            >
              <span className="self-center px-3 py-2">{mot[sens.source]}</span>
              <CarteMasquee
                traduction={mot[sens.cible]}
                couleur={sens.couleur}
                revele={revelees.has(cle)}
                onReveler={() => onReveler(cle)}
              />
            </li>
          )
        })}
      </ol>
    </div>
  )
}
