import { useCodeFlowStore } from '../../state/store'
import { ExecutionEditorMock } from '../execution/ExecutionEditorMock'


export function EditorWorkspacePlaceholder() {
  const snapshot = useCodeFlowStore((s) => s.currentSnapshot)

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-text-h/80">Editor</div>
          <div className="text-sm font-medium text-text-h">Execution (mock)</div>
        </div>
        <div className="text-xs text-text-h/70">
          active line {snapshot?.currentLineNumber ?? 1}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 p-3">
          <ExecutionEditorMock snapshot={snapshot} />
        </div>
      </div>
    </div>
  )
}



