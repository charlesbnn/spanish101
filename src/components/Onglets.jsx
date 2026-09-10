import { COULEURS } from '../couleurs.js'

/**
 * Barre d'onglets réutilisable (nav principale et sous-onglets).
 * `onglets` : [{ id, label, couleur }]
 * `variante` : 'principal' (sur fond encre) | 'secondaire' (sur fond blanc)
 */
export default function Onglets({ onglets, actif, onChange, variante = 'principal' }) {
  const surEncre = variante === 'principal'

  return (
    <nav
      className={`grid ${surEncre ? 'bg-tinta' : 'border-b-4 border-tinta bg-white'}`}
      style={{ gridTemplateColumns: `repeat(${onglets.length}, minmax(0, 1fr))` }}
    >
      {onglets.map((onglet) => {
        const couleur = COULEURS[onglet.couleur]
        const estActif = onglet.id === actif
        const styleActif = `${couleur.fond} ${couleur.sur}`
        const styleInactif = surEncre
          ? 'bg-tinta text-white/55 hover:text-white'
          : 'bg-white text-tinta/45 hover:text-tinta'

        return (
          <button
            key={onglet.id}
            type="button"
            onClick={() => onChange(onglet.id)}
            aria-current={estActif ? 'page' : undefined}
            className={`cursor-pointer px-3 py-4 font-display text-sm uppercase leading-tight tracking-wide sm:text-lg ${
              estActif ? styleActif : styleInactif
            }`}
          >
            {onglet.label}
          </button>
        )
      })}
    </nav>
  )
}
