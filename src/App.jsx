import { useState } from 'react'
import Onglets from './components/Onglets.jsx'
import { SECTIONS } from './sections.js'

export default function App() {
  const [sectionId, setSectionId] = useState(SECTIONS[0].id)
  const section = SECTIONS.find((s) => s.id === sectionId)
  const Vue = section.composant

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col bg-white">
      <header className="bg-tinta text-white">
        <div className="flex items-baseline justify-between px-5 pt-5 pb-4">
          <h1 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
            Vocabulario
          </h1>
          <span className="font-display text-xs uppercase tracking-[0.3em] text-amarillo">
            Español
          </span>
        </div>
        <Onglets onglets={SECTIONS} actif={sectionId} onChange={setSectionId} />
      </header>

      <main className="flex-1">
        <Vue />
      </main>
    </div>
  )
}
