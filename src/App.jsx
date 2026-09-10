export default function App() {
  return (
    <div className="min-h-dvh">
      <header className="bg-azul px-5 py-6 text-white">
        <h1 className="font-display text-4xl uppercase tracking-tight">
          Vocabulario
        </h1>
        <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-amarillo">
          Étape 1 — setup
        </p>
      </header>

      <main className="p-5">
        <p className="max-w-prose">
          Le projet tourne : React + Vite, Tailwind avec la palette du brief, et
          les deux typographies (Archivo Black pour les titres, Inter pour le
          corps de texte).
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            ['azul', 'bg-azul text-white'],
            ['magenta', 'bg-magenta text-white'],
            ['amarillo', 'bg-amarillo text-tinta'],
            ['verde', 'bg-verde text-white'],
            ['rojo', 'bg-rojo text-white'],
            ['tinta', 'bg-tinta text-white'],
          ].map(([nom, classes]) => (
            <li
              key={nom}
              className={`decoupe px-3 py-6 font-display text-lg uppercase ${classes}`}
            >
              {nom}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
