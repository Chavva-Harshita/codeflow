import type { WindowState } from '../../state/types'

export function ArrayVisualizationMock({
  values,
  activeWindow,
  highlightedArrayIndices,
}: {
  values: number[]
  activeWindow: WindowState | null
  highlightedArrayIndices: number[]
}) {
  const isHighlighted = (i: number) => highlightedArrayIndices.includes(i)
  const isInActiveWindow = (i: number) => {
    if (!activeWindow) return false
    return i >= activeWindow.startIndex && i <= activeWindow.endIndex
  }

  return (
    <div className="rounded-md border border-border bg-code-bg/30 p-3">
      <div className="flex items-center justify-between">
        <div className="text-xs text-text-h/80">Array</div>
        {activeWindow ? (
          <div className="text-[11px] text-text-h/60">
            window [{activeWindow.startIndex}..{activeWindow.endIndex}]
          </div>
        ) : (
          <div className="text-[11px] text-text-h/60">window —</div>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((v, i) => {
          const highlighted = isHighlighted(i)
          const inWindow = isInActiveWindow(i)
          return (
            <div
              key={i}
              className={
                'flex h-10 w-10 flex-col items-center justify-center rounded border text-xs ' +
                (highlighted
                  ? 'border-accent-border bg-accent-bg/35 text-text-h'
                  : inWindow
                    ? 'border-accent-border/30 bg-accent-bg/10 text-text-h/80'
                    : 'border-border bg-bg/40 text-text-h/80')
              }
              aria-label={`arr[${i}]`}
            >
              <div className="text-[11px] font-medium">{v}</div>
              <div className="text-[9px] text-text-h/50">{i}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

