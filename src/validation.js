// Règles de forme des trois fichiers de données.
// Servent au script `npm run valider` (fichiers du repo) et à la validation
// des fichiers importés par l'utilisateur — une seule source de vérité.

export const NIVEAUX = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
export const TYPES_MOT = [
  'nom',
  'verbe',
  'adjectif',
  'adverbe',
  'preposition',
  'pronom',
  'article',
  'expression',
]
export const TYPES_FICHE = [
  'conjugaison',
  'accords',
  'articles',
  'pronoms',
  'prepositions',
  'syntaxe',
  'orthographe',
  'faux-amis',
]
export const PERSONNES = [
  'yo',
  'tu',
  'el_ella_usted',
  'nosotros',
  'vosotros',
  'ellos_ellas_ustedes',
]

const estTexte = (valeur) => typeof valeur === 'string' && valeur.trim() !== ''

function verifierTableau(donnees, erreurs) {
  if (!Array.isArray(donnees)) {
    erreurs.push('Le fichier doit contenir une liste (un tableau JSON).')
    return false
  }
  if (donnees.length === 0) {
    erreurs.push('La liste est vide.')
    return false
  }
  return true
}

/** Valide un dico. Rend { ok, erreurs } — `erreurs` est vide si ok. */
export function validerDico(donnees) {
  const erreurs = []
  if (!verifierTableau(donnees, erreurs)) return { ok: false, erreurs }

  donnees.forEach((mot, i) => {
    const ou = `mot n°${i + 1}`
    if (typeof mot !== 'object' || mot === null) {
      erreurs.push(`${ou} : ce n'est pas un objet.`)
      return
    }
    if (!estTexte(mot.fr)) erreurs.push(`${ou} : champ "fr" manquant ou vide.`)
    if (!estTexte(mot.es)) erreurs.push(`${ou} : champ "es" manquant ou vide.`)
    if (!NIVEAUX.includes(mot.niveau)) {
      erreurs.push(`${ou} ("${mot.fr ?? '?'}") : "niveau" doit valoir ${NIVEAUX.join(', ')}.`)
    }
    if (!TYPES_MOT.includes(mot.type)) {
      erreurs.push(`${ou} ("${mot.fr ?? '?'}") : "type" doit valoir ${TYPES_MOT.join(', ')}.`)
    }
    if (mot.theme !== undefined && !estTexte(mot.theme)) {
      erreurs.push(`${ou} : "theme" doit être un texte.`)
    }
  })

  return { ok: erreurs.length === 0, erreurs }
}

/** Valide un fichier de règles de grammaire. */
export function validerGrammaire(donnees) {
  const erreurs = []
  if (!verifierTableau(donnees, erreurs)) return { ok: false, erreurs }

  donnees.forEach((fiche, i) => {
    const ou = `fiche n°${i + 1}`
    if (typeof fiche !== 'object' || fiche === null) {
      erreurs.push(`${ou} : ce n'est pas un objet.`)
      return
    }
    for (const champ of ['titre', 'explication', 'exemple']) {
      if (!estTexte(fiche[champ])) erreurs.push(`${ou} : champ "${champ}" manquant ou vide.`)
    }
    if (!NIVEAUX.includes(fiche.niveau)) {
      erreurs.push(`${ou} ("${fiche.titre ?? '?'}") : "niveau" doit valoir ${NIVEAUX.join(', ')}.`)
    }
    if (!TYPES_FICHE.includes(fiche.type)) {
      erreurs.push(`${ou} ("${fiche.titre ?? '?'}") : "type" doit valoir ${TYPES_FICHE.join(', ')}.`)
    }
  })

  return { ok: erreurs.length === 0, erreurs }
}

/** Valide un fichier de conjugaisons. */
export function validerConjugaisons(donnees) {
  const erreurs = []
  if (!verifierTableau(donnees, erreurs)) return { ok: false, erreurs }

  const vus = new Set()
  donnees.forEach((fiche, i) => {
    const ou = `verbe n°${i + 1}`
    if (typeof fiche !== 'object' || fiche === null) {
      erreurs.push(`${ou} : ce n'est pas un objet.`)
      return
    }
    if (!estTexte(fiche.infinitif)) {
      erreurs.push(`${ou} : champ "infinitif" manquant ou vide.`)
    } else if (vus.has(fiche.infinitif)) {
      erreurs.push(`${ou} : l'infinitif "${fiche.infinitif}" apparaît plusieurs fois.`)
    } else {
      vus.add(fiche.infinitif)
    }
    if (fiche.groupe !== undefined && !estTexte(fiche.groupe)) {
      erreurs.push(`${ou} : "groupe" doit être un texte.`)
    }

    const present = fiche.present
    if (typeof present !== 'object' || present === null) {
      erreurs.push(`${ou} ("${fiche.infinitif ?? '?'}") : champ "present" manquant.`)
      return
    }
    for (const personne of PERSONNES) {
      if (!estTexte(present[personne])) {
        erreurs.push(`${ou} ("${fiche.infinitif ?? '?'}") : forme "${personne}" manquante.`)
      }
    }
    for (const cle of Object.keys(present)) {
      if (!PERSONNES.includes(cle)) {
        erreurs.push(`${ou} ("${fiche.infinitif ?? '?'}") : clé inattendue "${cle}" dans "present".`)
      }
    }
  })

  return { ok: erreurs.length === 0, erreurs }
}

/** Cherche la fiche de conjugaison d'un mot (correspondance exacte sur `es`). */
export function conjugaisonDuMot(mot, conjugaisons) {
  if (mot.type !== 'verbe') return null
  return conjugaisons.find((fiche) => fiche.infinitif === mot.es) ?? null
}
