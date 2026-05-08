import { useMemo, useState } from 'react'

import { useCodeFlowStore } from '../../state/store'

export function PredictionInteractionMock() {
  const snapshot = useCodeFlowStore((s) => s.currentSnapshot)
  const predictionFeedback = useCodeFlowStore((s) => s.predictionFeedback)
  const isLocked = useCodeFlowStore((s) => s.isPredictionLocked)
  const submitPrediction = useCodeFlowStore((s) => s.submitPrediction)

  const predictionInput = useCodeFlowStore((s) => s.predictionInput)
  const setPredictionInput = useCodeFlowStore((s) => s.setPredictionInput)


  // No local copy: bind directly to store so SubmitPrediction always uses latest input.
  useMemo(() => {}, [snapshot?.stepId])


  if (!snapshot) {
    return (
      <div className="rounded-lg border border-border bg-code-bg/20 p-4 shadow-soft">
        Loading snapshot...
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-code-bg/20 p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-wide text-text-h/80">Prediction</div>
          <div className="mt-1 text-sm font-medium text-text-h">What happens next?</div>
          <div className="mt-2 text-xs text-text">{snapshot.prediction.prompt}</div>
        </div>

        <div className="shrink-0 text-[11px] text-text-h/70">
          step {snapshot.stepId}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <input
          className="h-10 rounded-md border border-border bg-bg/20 px-3 text-sm text-text-h placeholder:text-text-h/40"
          placeholder="Enter your answer"
          value={predictionInput}
          onChange={(e) => setPredictionInput(e.target.value)}

          disabled={isLocked}
        />

        <button
          className={
            'mt-1 w-full rounded-md border border-border px-4 py-3 text-sm ' +
            (isLocked
              ? 'bg-code-bg/60 text-text-h/60 cursor-not-allowed'
              : 'bg-accent-bg/60 text-text-h hover:bg-accent-bg/80')
          }
          onClick={() => {
            // Store currently doesn't have setter for predictionInput; keep simple for now.
            // We rely on local value by setting via a synthetic DOM read not possible; so use submitPrediction by patching store next.
            // For now: if locked, ignore.
            if (isLocked) return
            submitPrediction()

          }}
          disabled={isLocked}
        >
          Submit prediction
        </button>
      </div>

      {predictionFeedback ? (
        <div
          className={
            'mt-3 rounded-md border p-3 ' +
            (predictionFeedback.status === 'correct'
              ? 'border-accent-border/50 bg-accent-bg/10'
              : 'border-red-500/40 bg-red-500/10')
          }
        >
          <div className="text-xs uppercase tracking-wide text-text-h/80">Feedback</div>
          <div className="mt-1 text-sm font-medium text-text-h">
            {predictionFeedback.message}
          </div>
          {predictionFeedback.status === 'incorrect' ? (
            <div className="mt-2 text-xs text-text">{predictionFeedback.explanation}</div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

