export function MonacoEditorPlaceholder() {
  return (
    <div className="flex h-full flex-col rounded-md border border-border bg-code-bg/30">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="text-xs text-text-h/80">code.ts</div>
        <div className="text-[11px] text-text-h/60">Monaco wrapper pending</div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="text-center">
          <div className="text-sm font-medium text-text-h">Monaco Editor</div>
          <div className="mt-1 text-xs text-text">Placeholder — no business logic yet.</div>
        </div>
      </div>
    </div>
  )
}

