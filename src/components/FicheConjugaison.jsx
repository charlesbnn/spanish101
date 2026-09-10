import { useEffect } from 'react'

// Libellés affichés pour les six personnes du présent.
const PERSONNES = [
  ['yo', 'yo'],
  ['tu', 'tú'],
  ['el_ella_usted', 'él / ella / usted'],
  ['nosotros', 'nosotros'],
  ['vosotros', 'vosotros'],
  ['ellos_ellas_ustedes', 'ellos / ellas / ustedes'],
]

/** Fiche de conjugaison en surimpression (présent de l'indicatif). */
export default function FicheConjugaison({ fiche, onFermer }) {
  useEffect(() => {
    const surTouche = (e) => {
      if (e.key === 'Escape') onFermer()
    }
    document.addEventListener('keydown', surTouche)
    return () => document.removeEventListener('keydown', surTouche)
  }, [onFermer])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Conjugaison de ${fiche.infinitif}`}
      onClick={onFermer}
      className="fixed inset-0 z-50 flex items-center justify-center bg-tinta/80 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="decoupe max-h-full w-full max-w-md overflow-y-auto bg-white"
      >
        <div className="flex items-start justify-between gap-3 bg-azul px-4 py-3 text-white">
          <div>
            <p className="font-display text-2xl uppercase leading-none">{fiche.infinitif}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-amarillo">{fiche.groupe}</p>
          </div>
          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer"
            className="cursor-pointer bg-amarillo px-3 py-1 font-display text-lg leading-tight text-tinta"
          >
            ✕
          </button>
        </div>

        <p className="border-b-4 border-tinta px-4 py-2 font-display text-[11px] uppercase tracking-widest text-tinta/60">
          Présent de l'indicatif
        </p>

        <table className="w-full">
          <tbody>
            {PERSONNES.map(([cle, libelle]) => (
              <tr key={cle} className="border-b border-tinta/15">
                <th scope="row" className="w-1/2 px-4 py-2 text-left font-normal text-tinta/60">
                  {libelle}
                </th>
                <td className="px-4 py-2 font-semibold">{fiche.present[cle]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
