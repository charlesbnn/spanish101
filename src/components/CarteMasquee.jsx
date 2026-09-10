import { COULEURS } from '../couleurs.js'

/**
 * Une traduction cachée par un rectangle opaque.
 * Le mot reste dans le flux (la hauteur de la ligne ne bouge pas au clic) mais
 * est rendu invisible : il n'est ni lisible, ni trouvable au Ctrl+F tant que le
 * rectangle est en place. Le retrait est net — aucune transition.
 */
export default function CarteMasquee({ traduction, couleur, revele, onReveler }) {
  const c = COULEURS[couleur]

  return (
    <div className="relative min-h-11">
      <span
        className={`block px-3 py-2 font-semibold ${revele ? '' : 'invisible'}`}
        aria-hidden={!revele}
      >
        {traduction}
      </span>

      {!revele && (
        <button
          type="button"
          onClick={onReveler}
          aria-label="Révéler la traduction"
          className={`decoupe absolute inset-0 w-full cursor-pointer ${c.fond}`}
        />
      )}
    </div>
  )
}
