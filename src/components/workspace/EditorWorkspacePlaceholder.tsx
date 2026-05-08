import { PredictionQuestionPlaceholder } from '../widgets/PredictionQuestionPlaceholder'
import { MonacoEditorPlaceholder } from './MonacoEditorPlaceholder'

export function EditorWorkspacePlaceholder() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-text-h/80">Editor</div>
          <div className="text-sm font-medium text-text-h">Monaco (placeholder)</div>
        </div>
        <div className="text-xs text-text-h/70">No logic yet</div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 p-3">
          <MonacoEditorPlaceholder />
        </div>

        <div className="border-t border-border p-3">
          <PredictionQuestionPlaceholder />
        </div>
      </div>
    </div>
  )
}

