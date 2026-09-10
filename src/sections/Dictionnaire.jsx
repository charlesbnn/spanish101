import { useState } from 'react'
import ListeMots from '../components/ListeMots.jsx'
import Onglets from '../components/Onglets.jsx'
import { DICO } from '../donnees.js'
import { SENS } from '../sens.js'

export default function Dictionnaire() {
  const [sensId, setSensId] = useState(SENS[0].id)
  // Cartes révélées, mémorisées par onglet : passer d'un sens à l'autre et
  // revenir ne fait pas perdre la progression.
  const [revelees, setRevelees] = useState(() => ({ 'fr-es': new Set(), 'es-fr': new Set() }))

  const sens = SENS.find((s) => s.id === sensId)

  function reveler(cle) {
    setRevelees((etat) => ({ ...etat, [sensId]: new Set(etat[sensId]).add(cle) }))
  }

  return (
    <div>
      <Onglets onglets={SENS} actif={sensId} onChange={setSensId} variante="secondaire" />

      <p className="px-4 py-3 text-sm text-tinta/60">
        {DICO.length} mots — touche un rectangle pour révéler la traduction.
      </p>

      <ListeMots mots={DICO} sens={sens} revelees={revelees[sensId]} onReveler={reveler} />
    </div>
  )
}
