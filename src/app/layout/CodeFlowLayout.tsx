import type React from 'react'

export function CodeFlowLayout({
  sidebar,
  main,
  visualization,
}: {
  sidebar: React.ReactNode
  main: React.ReactNode
  visualization: React.ReactNode
}) {
  return (
    <div className="min-h-[100svh] bg-bg text-text">
      <div className="grid h-[100svh] grid-cols-[280px_1fr_340px] gap-0">
        <aside className="hidden border-r border-border md:block">{sidebar}</aside>

        <main className="min-w-0">{main}</main>

        <section className="hidden border-l border-border xl:block">{visualization}</section>
      </div>
    </div>
  )
}

