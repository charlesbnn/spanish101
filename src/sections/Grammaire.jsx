import { useMemo, useState } from 'react'
import Filtres from '../components/Filtres.jsx'
import { GRAMMAIRE } from '../donnees.js'
import { appliquerFiltres, valeursDistinctes } from '../filtres.js'
import { NIVEAUX, TYPES_FICHE } from '../validation.js'

const SANS_FILTRE = { type: '', niveau: '' }

export default function Grammaire() {
  const [filtres, setFiltres] = useState(SANS_FILTRE)
  const fiches = useMemo(() => appliquerFiltres(GRAMMAIRE, filtres), [filtres])

  const champs = useMemo(
    () => [
      { id: 'type', label: 'Type de règle', options: valeursDistinctes(GRAMMAIRE, 'type', TYPES_FICHE) },
      { id: 'niveau', label: 'Niveau', options: valeursDistinctes(GRAMMAIRE, 'niveau', NIVEAUX) },
    ],
    [],
  )

  return (
    <div>
      <Filtres
        champs={champs.map((champ) => ({
          ...champ,
          valeur: filtres[champ.id],
          onChange: (valeur) => setFiltres((etat) => ({ ...etat, [champ.id]: valeur })),
        }))}
        onEffacer={() => setFiltres(SANS_FILTRE)}
      />

      <p className="px-4 pt-4 text-sm text-tinta/60">
        <span className="font-display text-base text-tinta">{fiches.length}</span> fiche
        {fiches.length > 1 ? 's' : ''}
      </p>

      {fiches.length === 0 ? (
        <p className="px-4 py-10 text-center text-tinta/60">
          Aucune fiche ne correspond à ces filtres.
        </p>
      ) : (
        <ul className="space-y-4 p-4">
          {fiches.map((fiche) => (
            <li key={fiche.titre} className="decoupe">
              <header className="bg-verde px-4 py-3 text-white">
                <h3 className="font-display text-lg uppercase leading-tight">{fiche.titre}</h3>
                <p className="mt-1 font-display text-[11px] uppercase tracking-widest text-amarillo">
                  {fiche.type} · {fiche.niveau}
                </p>
              </header>

              <p className="px-4 py-3">{fiche.explication}</p>

              <p className="border-t-4 border-tinta bg-amarillo px-4 py-3 font-semibold">
                {fiche.exemple}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
