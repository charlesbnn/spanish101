// Correspondance nom de couleur -> classes Tailwind.
// Tailwind ne peut pas construire les classes dynamiquement (`bg-${x}` est
// invisible au moment du build) : on passe donc par ce dictionnaire.
export const COULEURS = {
  azul: { fond: 'bg-azul', texte: 'text-azul', bord: 'border-azul', sur: 'text-white' },
  magenta: { fond: 'bg-magenta', texte: 'text-magenta', bord: 'border-magenta', sur: 'text-white' },
  amarillo: { fond: 'bg-amarillo', texte: 'text-amarillo', bord: 'border-amarillo', sur: 'text-tinta' },
  verde: { fond: 'bg-verde', texte: 'text-verde', bord: 'border-verde', sur: 'text-white' },
  rojo: { fond: 'bg-rojo', texte: 'text-rojo', bord: 'border-rojo', sur: 'text-white' },
  tinta: { fond: 'bg-tinta', texte: 'text-tinta', bord: 'border-tinta', sur: 'text-white' },
}
