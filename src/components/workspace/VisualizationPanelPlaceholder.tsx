import { useCodeFlowStore } from '../../state/store'
import { ArrayVisualizationMock } from '../execution/ArrayVisualizationMock'

export function VisualizationPanelPlaceholder() {
  const visualization = useCodeFlowStore((s) => s.visualization)
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-text-h/80">Visualization</div>
          <div className="text-sm font-medium text-text-h">Array View</div>
        </div>
        <div className="rounded-md border border-border bg-code-bg px-2 py-1 text-[11px] text-text-h/80">mock</div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <ArrayVisualizationMock
          values={visualization.values}
          activeWindow={visualization.activeWindow}
          highlightedArrayIndices={visualization.highlightedArrayIndices}
        />

        <div className="mt-auto rounded-md border border-border bg-code-bg/20 p-3">
          <div className="text-xs text-text-h/80">Runtime state</div>
          <div className="mt-2 space-y-2">
            <div className="text-xs text-text-h/80">{visualization.pointersLabel}</div>
            <div className="text-xs text-text-h/80">{visualization.sumLabel}</div>
            <div className="text-[11px] text-text-h/60">
              highlighted: {visualization.highlightedArrayIndices.join(', ') || '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


