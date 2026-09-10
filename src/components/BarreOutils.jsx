import { COULEURS } from '../couleurs.js'

const LIBELLES = { fr: 'Français', es: 'Espagnol' }

/**
 * Barre collée en haut de l'écran : compteur, bouton Réinitialiser, et
 * en-tête des deux colonnes (qui s'inverse selon le sens de révision).
 */
export default function BarreOutils({ sens, nombreMots, nombreReveles, onReinitialiser }) {
  const c = COULEURS[sens.couleur]

  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="flex items-center justify-between gap-3 border-b-4 border-tinta px-4 py-3">
        <p className="text-sm text-tinta/70">
          <span className="font-display text-base text-tinta">{nombreMots}</span> mots ·{' '}
          {nombreReveles} révélé{nombreReveles > 1 ? 's' : ''}
        </p>

        <button
          type="button"
          onClick={onReinitialiser}
          className="decoupe cursor-pointer bg-rojo px-4 py-2 font-display text-sm uppercase tracking-wide text-white"
        >
          ↻ Réinitialiser
        </button>
      </div>

      <div
        className={`grid grid-cols-2 gap-3 border-b-4 border-tinta px-4 py-2 font-display text-xs uppercase tracking-widest ${c.fond} ${c.sur}`}
      >
        <span className="px-3">{LIBELLES[sens.source]}</span>
        <span className="px-3">{LIBELLES[sens.cible]}</span>
      </div>
    </div>
  )
}
