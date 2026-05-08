import { useCodeFlowStore } from '../../state/store'
import { StepControls } from '../execution/StepControls'

export function SidebarPlaceholder() {
  const snapshot = useCodeFlowStore((s) => s.currentSnapshot)
  const visualization = useCodeFlowStore((s) => s.visualization)

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-text-h/80">Workspace</div>
          <div className="text-sm font-medium text-text-h">Prediction Simulator</div>
        </div>
        <div className="rounded-md border border-border bg-code-bg px-2 py-1 text-[11px] text-text-h/80">live</div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <StepControls />

        <div className="mt-auto rounded-md border border-border bg-code-bg/30 p-3">
          <div className="text-xs text-text-h/80">Current snapshot</div>
          <div className="mt-2 space-y-2 text-xs text-text-h/80">
            <div>stepId: {snapshot?.stepId ?? '—'}</div>
            <div>line: {snapshot?.currentLineNumber ?? '—'}</div>
            <div>pointers: {visualization.pointersLabel}</div>
            <div>sum: {visualization.sumLabel}</div>
          </div>
        </div>
      </div>
    </div>
  )
}


