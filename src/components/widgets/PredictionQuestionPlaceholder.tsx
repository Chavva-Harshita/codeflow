export function PredictionQuestionPlaceholder() {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-text-h/80">Prediction</div>
        <div className="mt-1 text-sm font-medium text-text-h">What will happen next?</div>
        <div className="mt-2 text-xs text-text">
          Placeholder question component. No prediction loop yet.
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-2">
        <button className="rounded-md border border-border bg-code-bg px-3 py-2 text-xs text-text-h hover:bg-accent-bg/30">
          Option A
        </button>
        <button className="rounded-md border border-border bg-code-bg px-3 py-2 text-xs text-text-h hover:bg-accent-bg/30">
          Option B
        </button>
      </div>
    </div>
  )
}

