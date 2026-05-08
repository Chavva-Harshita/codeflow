import type React from 'react'

import { PredictionPanelPlaceholder } from '../../components/workspace/PredictionPanelPlaceholder'

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
      <div className="grid h-[100svh] grid-rows-[1fr_auto] gap-3 p-3 sm:gap-4">
        <div className="grid min-h-0 grid-cols-1 gap-3 md:grid-cols-[35%_1fr_32%] md:gap-4 lg:grid-cols-[35%_1fr_30%]">
          {/* LEFT PANEL */}
          <aside className="min-h-0 rounded-md border border-border bg-code-bg/10 shadow-soft">
            {main /* Editor lives here */}
          </aside>

          {/* CENTER PANEL (dominant) */}
          <main className="min-w-0 min-h-0 rounded-md border border-border bg-code-bg/10 shadow-soft">
            {visualization /* Execution visualization */}
          </main>

          {/* RIGHT PANEL */}
          <section className="min-h-0 rounded-md border border-border bg-code-bg/10 shadow-soft">
            {sidebar /* State / variables / timeline */}
          </section>
        </div>


        {/* BOTTOM PANEL */}
        <section className="min-h-[280px] rounded-md border border-border bg-code-bg/10 shadow-soft">
          <PredictionPanelPlaceholder />
        </section>
      </div>
    </div>
  )
}



