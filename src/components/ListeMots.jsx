import { memo } from 'react'
import { cleMot } from '../donnees.js'
import CarteMasquee from './CarteMasquee.jsx'

function BoutonConjugaison({ fiche, onOuvrir }) {
  return (
    <button
      type="button"
      onClick={() => onOuvrir(fiche)}
      aria-label={`Voir la conjugaison de ${fiche.infinitif}`}
      className="cursor-pointer border-2 border-tinta bg-amarillo px-2 py-0.5 font-display text-[10px] uppercase tracking-wide text-tinta"
    >
      Conjug.
    </button>
  )
}

// Une ligne mémoïsée : sur un clic, seule la ligne touchée se redessine, pas
// les 528 autres. `mot`, `sens` et `fiche` sont des références stables.
const LigneMot = memo(function LigneMot({ mot, sens, fiche, revele, onReveler, onConjugaison }) {
  const bouton = fiche ? <BoutonConjugaison fiche={fiche} onOuvrir={onConjugaison} /> : null
  // Le bouton n'apparaît qu'à côté du mot espagnol — et jamais avant qu'il soit
  // révélé, sinon la fiche donnerait la réponse.
  const boutonAGauche = sens.source === 'es' ? bouton : null
  const boutonADroite = sens.cible === 'es' ? bouton : null

  return (
    <li className="grid grid-cols-2 gap-3 border-b border-tinta/15 px-4 py-1">
      <div className="self-center px-3 py-2">
        <div className="flex flex-wrap items-center gap-2">
          <span>{mot[sens.source]}</span>
          {boutonAGauche}
        </div>
        <p className="mt-0.5 font-display text-[10px] uppercase tracking-widest text-tinta/40">
          {mot.type} · {mot.niveau}
        </p>
      </div>

      <CarteMasquee
        traduction={mot[sens.cible]}
        couleur={sens.couleur}
        revele={revele}
        onReveler={() => onReveler(cleMot(mot))}
      >
        {boutonADroite}
      </CarteMasquee>
    </li>
  )
})

/**
 * Les deux colonnes : mot source visible à gauche, traduction masquée à droite.
 * Composant d'affichage pur — l'état des cartes révélées vit dans Dictionnaire.
 */
export default function ListeMots({ mots, sens, revelees, conjugaisons, onReveler, onConjugaison }) {
  if (mots.length === 0) {
    return (
      <p className="px-4 py-10 text-center text-tinta/60">
        Aucun mot ne correspond à ces filtres.
      </p>
    )
  }

  return (
    <ol>
      {mots.map((mot) => (
        <LigneMot
          key={cleMot(mot)}
          mot={mot}
          sens={sens}
          fiche={mot.type === 'verbe' ? (conjugaisons.get(mot.es) ?? null) : null}
          revele={revelees.has(cleMot(mot))}
          onReveler={onReveler}
          onConjugaison={onConjugaison}
        />
      ))}
    </ol>
  )
}
