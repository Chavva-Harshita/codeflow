import { useMemo } from 'react'

import { useCodeFlowStore } from '../../state/store'
import { Button } from '../ui/Button'

export function StepControls() {
  const timeline = useCodeFlowStore((s) => s.timeline)
  const activeStepIndex = useCodeFlowStore((s) => s.activeStepIndex)
  const isPredictionLocked = useCodeFlowStore((s) => s.isPredictionLocked)

  const nextStep = useCodeFlowStore((s) => s.nextStep)
  const previousStep = useCodeFlowStore((s) => s.previousStep)
  const replay = useCodeFlowStore((s) => s.replay)

  const total = timeline.length
  const canNext = !isPredictionLocked && activeStepIndex < total - 1
  const canPrev = activeStepIndex > 0

  const statusLabel = useMemo(() => {
    if (!total) return 'loading'
    if (isPredictionLocked) return 'awaiting prediction'
    return 'ready'
  }, [total, isPredictionLocked])

  return (
    <div className="rounded-md border border-border bg-code-bg/40 p-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-text-h/80">
            Execution
          </div>
          <div className="mt-1 text-sm font-medium text-text-h">
            {statusLabel}
          </div>
        </div>
        <div className="text-[11px] text-text-h/60">
          {Math.min(activeStepIndex + 1, total)}/{total}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Button
          variant="default"
          className="w-full"
          onClick={previousStep}
          disabled={!canPrev}
        >
          Prev
        </Button>
        <Button
          variant="primary"
          className="w-full"
          onClick={nextStep}
          disabled={!canNext}
        >
          Next
        </Button>
        <Button
          variant="default"
          className="w-full"
          onClick={replay}
        >
          Replay
        </Button>
      </div>

      <div className="mt-3 text-xs text-text">
        Prediction gate is enforced: you must answer to unlock Next.
      </div>
    </div>
  )
}

