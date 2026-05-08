export function SidebarPlaceholder() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-text-h/80">Workspace</div>
          <div className="text-sm font-medium text-text-h">Prediction Simulator</div>
        </div>
        <div className="rounded-md border border-border bg-code-bg px-2 py-1 text-[11px] text-text-h/80">UI</div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="rounded-md border border-border bg-code-bg/40 p-3">
          <div className="text-xs text-text-h/80">Static navigation</div>
          <div className="mt-2 space-y-2">
            <div className="h-3 w-10 rounded bg-accent-bg/60" />
            <div className="h-3 w-16 rounded bg-accent-bg/40" />
            <div className="h-3 w-12 rounded bg-accent-bg/30" />
          </div>
        </div>

        <div className="mt-auto rounded-md border border-border bg-code-bg/30 p-3">
          <div className="text-xs text-text-h/80">Examples</div>
          <div className="mt-2 text-sm text-text">(Static loader placeholder)</div>
        </div>
      </div>
    </div>
  )
}

