import { useCallback, useMemo, useState } from 'react'
import BarreOutils from '../components/BarreOutils.jsx'
import FicheConjugaison from '../components/FicheConjugaison.jsx'
import Filtres from '../components/Filtres.jsx'
import ListeMots from '../components/ListeMots.jsx'
import Onglets from '../components/Onglets.jsx'
import { CONJUGAISONS_PAR_INFINITIF, DICO } from '../donnees.js'
import { appliquerFiltres, valeursDistinctes } from '../filtres.js'
import { melanger } from '../melanger.js'
import { SENS } from '../sens.js'
import { NIVEAUX, TYPES_MOT } from '../validation.js'

const AUCUNE_REVELEE = { 'fr-es': new Set(), 'es-fr': new Set() }
const SANS_FILTRE = { theme: '', niveau: '', type: '' }

export default function Dictionnaire() {
  const [sensId, setSensId] = useState(SENS[0].id)
  // Ordre d'affichage : celui du fichier au départ (mots groupés par thème),
  // retiré au sort à chaque réinitialisation.
  const [mots, setMots] = useState(DICO)
  // Cartes révélées, mémorisées par onglet : passer d'un sens à l'autre et
  // revenir ne fait pas perdre la progression.
  const [revelees, setRevelees] = useState(AUCUNE_REVELEE)
  const [filtres, setFiltres] = useState(SANS_FILTRE)
  const [verbeOuvert, setVerbeOuvert] = useState(null)

  const sens = SENS.find((s) => s.id === sensId)
  const motsAffiches = useMemo(() => appliquerFiltres(mots, filtres), [mots, filtres])

  // Les listes déroulantes sont construites sur le dico chargé, pas en dur :
  // un dico importé propose donc automatiquement ses propres thèmes.
  const champs = useMemo(
    () => [
      { id: 'theme', label: 'Thème', options: valeursDistinctes(DICO, 'theme') },
      { id: 'niveau', label: 'Niveau', options: valeursDistinctes(DICO, 'niveau', NIVEAUX) },
      { id: 'type', label: 'Type', options: valeursDistinctes(DICO, 'type', TYPES_MOT) },
    ],
    [],
  )

  const reveler = useCallback(
    (cle) => {
      setRevelees((etat) => ({ ...etat, [sensId]: new Set(etat[sensId]).add(cle) }))
    },
    [sensId],
  )

  const ouvrirConjugaison = useCallback((fiche) => setVerbeOuvert(fiche), [])

  // Re-masque tout (les deux onglets) et retire un nouvel ordre au sort.
  function reinitialiser() {
    setRevelees(AUCUNE_REVELEE)
    setMots(melanger(DICO))
  }

  return (
    <div>
      <Onglets onglets={SENS} actif={sensId} onChange={setSensId} variante="secondaire" />

      <Filtres
        champs={champs.map((champ) => ({
          ...champ,
          valeur: filtres[champ.id],
          onChange: (valeur) => setFiltres((etat) => ({ ...etat, [champ.id]: valeur })),
        }))}
        onEffacer={() => setFiltres(SANS_FILTRE)}
      />

      <BarreOutils
        sens={sens}
        nombreMots={motsAffiches.length}
        nombreReveles={revelees[sensId].size}
        onReinitialiser={reinitialiser}
      />

      <ListeMots
        mots={motsAffiches}
        sens={sens}
        revelees={revelees[sensId]}
        conjugaisons={CONJUGAISONS_PAR_INFINITIF}
        onReveler={reveler}
        onConjugaison={ouvrirConjugaison}
      />

      {verbeOuvert && (
        <FicheConjugaison fiche={verbeOuvert} onFermer={() => setVerbeOuvert(null)} />
      )}
    </div>
  )
}
