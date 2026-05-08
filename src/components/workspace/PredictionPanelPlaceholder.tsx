import { PredictionInteractionMock } from '../execution/PredictionInteractionMock'


export function PredictionPanelPlaceholder() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-text-h/80">
            Prediction
          </div>
          <div className="mt-1 text-sm font-medium text-text-h">Interaction</div>
        </div>
        <div className="rounded-md border border-border bg-code-bg px-2 py-1 text-[11px] text-text-h/80">core loop</div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
        <PredictionInteractionMock />
      </div>
    </div>
  )
}


