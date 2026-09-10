/**
 * Rangée de menus déroulants. `champs` : [{ id, label, valeur, options, onChange }].
 * Utilisé par le Dictionnaire (thème / niveau / type) et par la Grammaire.
 */
export default function Filtres({ champs, onEffacer }) {
  const actifs = champs.some((champ) => champ.valeur !== '')

  return (
    <div className="flex flex-wrap items-end gap-3 border-b-4 border-tinta px-4 py-3">
      {champs.map((champ) => (
        <label key={champ.id} className="flex min-w-32 flex-1 flex-col gap-1">
          <span className="font-display text-[11px] uppercase tracking-widest text-tinta/60">
            {champ.label}
          </span>
          <select
            value={champ.valeur}
            onChange={(e) => champ.onChange(e.target.value)}
            className="decoupe cursor-pointer bg-white px-2 py-2 text-sm"
          >
            <option value="">Tous</option>
            {champ.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      ))}

      {actifs && (
        <button
          type="button"
          onClick={onEffacer}
          className="cursor-pointer border-b-2 border-tinta px-1 py-2 font-display text-[11px] uppercase tracking-widest"
        >
          Effacer
        </button>
      )}
    </div>
  )
}
