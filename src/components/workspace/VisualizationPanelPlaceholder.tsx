export function VisualizationPanelPlaceholder() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-text-h/80">Visualization</div>
          <div className="text-sm font-medium text-text-h">Array View</div>
        </div>
        <div className="rounded-md border border-border bg-code-bg px-2 py-1 text-[11px] text-text-h/80">UI</div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="rounded-md border border-border bg-code-bg/30 p-3">
          <div className="text-xs text-text-h/80">Array</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded border border-border bg-bg/40 text-xs text-text-h/80"
              >
                {i}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto rounded-md border border-border bg-code-bg/20 p-3">
          <div className="text-xs text-text-h/80">Prediction output</div>
          <div className="mt-2 space-y-2">
            <div className="h-3 w-3/4 rounded bg-accent-bg/50" />
            <div className="h-3 w-2/3 rounded bg-accent-bg/30" />
            <div className="h-3 w-1/2 rounded bg-accent-bg/20" />
          </div>
        </div>
      </div>
    </div>
  )
}

