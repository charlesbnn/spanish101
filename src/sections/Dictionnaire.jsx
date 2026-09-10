import { useState } from 'react'
import Onglets from '../components/Onglets.jsx'
import { SENS } from '../sens.js'

export default function Dictionnaire() {
  const [sensId, setSensId] = useState(SENS[0].id)
  const sens = SENS.find((s) => s.id === sensId)

  return (
    <div>
      <Onglets onglets={SENS} actif={sensId} onChange={setSensId} variante="secondaire" />

      <div className="p-5">
        <p className="font-display text-2xl uppercase">
          {sens.source.toUpperCase()} → {sens.cible.toUpperCase()}
        </p>
        <p className="mt-2 text-tinta/70">
          Les colonnes de mots et les rectangles de masquage arrivent à l'étape 3.
        </p>
      </div>
    </div>
  )
}
