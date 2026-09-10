// Vérifie les trois fichiers de données du repo : `npm run valider`.
// À lancer après avoir modifié un JSON à la main (sur GitHub ou en local).
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import {
  conjugaisonDuMot,
  validerConjugaisons,
  validerDico,
  validerGrammaire,
} from '../src/validation.js'

const lire = (nom) =>
  JSON.parse(readFileSync(fileURLToPath(new URL(`../src/data/${nom}`, import.meta.url)), 'utf8'))

const dico = lire('dico.json')
const grammaire = lire('grammaire.json')
const conjugaisons = lire('conjugaisons.json')

let echec = false

for (const [nom, donnees, resultat] of [
  ['dico.json', dico, validerDico(dico)],
  ['grammaire.json', grammaire, validerGrammaire(grammaire)],
  ['conjugaisons.json', conjugaisons, validerConjugaisons(conjugaisons)],
]) {
  if (resultat.ok) {
    console.log(`OK  ${nom} — ${donnees.length} entrées`)
  } else {
    echec = true
    console.error(`KO  ${nom} — ${resultat.erreurs.length} erreur(s) :`)
    for (const erreur of resultat.erreurs) console.error(`      ${erreur}`)
  }
}

// Lien dico -> conjugaisons : chaque verbe devrait avoir sa fiche.
const verbes = dico.filter((mot) => mot.type === 'verbe')
const sansFiche = verbes.filter((mot) => !conjugaisonDuMot(mot, conjugaisons))
console.log(
  `    verbes du dico : ${verbes.length} — avec conjugaison : ${verbes.length - sansFiche.length}`,
)
if (sansFiche.length > 0) {
  console.log(`    sans fiche de conjugaison : ${sansFiche.map((m) => m.es).join(', ')}`)
}

const orphelines = conjugaisons.filter(
  (fiche) => !dico.some((mot) => mot.type === 'verbe' && mot.es === fiche.infinitif),
)
if (orphelines.length > 0) {
  console.log(`    conjugaisons sans mot correspondant : ${orphelines.map((f) => f.infinitif).join(', ')}`)
}

process.exit(echec ? 1 : 0)
