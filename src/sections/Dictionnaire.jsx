import { useCallback, useState } from 'react'
import BarreOutils from '../components/BarreOutils.jsx'
import ListeMots from '../components/ListeMots.jsx'
import Onglets from '../components/Onglets.jsx'
import { DICO } from '../donnees.js'
import { melanger } from '../melanger.js'
import { SENS } from '../sens.js'

const AUCUNE_REVELEE = { 'fr-es': new Set(), 'es-fr': new Set() }

export default function Dictionnaire() {
  const [sensId, setSensId] = useState(SENS[0].id)
  // Ordre d'affichage : celui du fichier au départ (mots groupés par thème),
  // retiré au sort à chaque réinitialisation.
  const [mots, setMots] = useState(DICO)
  // Cartes révélées, mémorisées par onglet : passer d'un sens à l'autre et
  // revenir ne fait pas perdre la progression.
  const [revelees, setRevelees] = useState(AUCUNE_REVELEE)

  const sens = SENS.find((s) => s.id === sensId)

  const reveler = useCallback(
    (cle) => {
      setRevelees((etat) => ({ ...etat, [sensId]: new Set(etat[sensId]).add(cle) }))
    },
    [sensId],
  )

  // Re-masque tout (les deux onglets) et retire un nouvel ordre au sort.
  function reinitialiser() {
    setRevelees(AUCUNE_REVELEE)
    setMots(melanger(DICO))
  }

  return (
    <div>
      <Onglets onglets={SENS} actif={sensId} onChange={setSensId} variante="secondaire" />

      <BarreOutils
        sens={sens}
        nombreMots={mots.length}
        nombreReveles={revelees[sensId].size}
        onReinitialiser={reinitialiser}
      />

      <ListeMots mots={mots} sens={sens} revelees={revelees[sensId]} onReveler={reveler} />
    </div>
  )
}
