import { create } from 'zustand'

import type {
  ExecutionSnapshot,
  PlaygroundSnapshot,
  VisualizationModel,
} from './types'

export type CodeFlowState = {
  timeline: ExecutionSnapshot[]
  activeStepIndex: number

  currentSnapshot: PlaygroundSnapshot | null
  visualization: VisualizationModel

  // Prediction loop state
  predictionInput: string
  predictionFeedback:
    | {
        status: 'correct' | 'incorrect'
        message: string
        explanation: string
      }
    | null
  isPredictionLocked: boolean

  // Actions
  initSlidingWindowTimeline: () => void
  replay: () => void
  nextStep: () => void
  previousStep: () => void
  submitPrediction: () => void
  setPredictionInput: (value: string) => void
}


const buildVisualizationModel = (
  snapshot: ExecutionSnapshot,
): VisualizationModel => ({
  values: [2, 1, 3, 2, 4],
  activeWindow: snapshot.activeWindow,
  highlightedArrayIndices: snapshot.highlightedArrayIndices,
  pointersLabel: `left=${snapshot.pointers.left}, right=${snapshot.pointers.right}`,
  sumLabel: `sum=${snapshot.sum}`,
})

export const useCodeFlowStore = create<CodeFlowState>((set, get) => ({
  timeline: [],
  activeStepIndex: 0,

  currentSnapshot: null,
  visualization: {
    values: [2, 1, 3, 2, 4],
    activeWindow: null,
    highlightedArrayIndices: [],
    pointersLabel: 'left=?, right=?',
    sumLabel: 'sum=?',
  },

      predictionInput: '',
      predictionFeedback: null,
      isPredictionLocked: true,


  setPredictionInput: (value: string) => {
    set({ predictionInput: value })
  },

  initSlidingWindowTimeline: () => {

    // Timeline module is UI-agnostic and safe to import eagerly.
    // (We keep logic modular to allow a future real execution engine.)
    // Timeline module is UI-agnostic and safe to import eagerly.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // (We keep it synchronous for Zustand action semantics.)
    // @ts-ignore
    const { slidingWindowMockTimeline } = require('../execution/timeline/slidingWindowMockTimeline')
    const timeline: ExecutionSnapshot[] = slidingWindowMockTimeline




    const first = timeline[0] ?? null
    set({
      timeline,
      activeStepIndex: 0,
      currentSnapshot: first,
      visualization: first ? buildVisualizationModel(first) : get().visualization,
      predictionInput: '',
      predictionFeedback: null,

      // Core loop: first step requires prediction before advance.
      isPredictionLocked: true,
    })
  },

  replay: () => {
    const { initSlidingWindowTimeline } = get()
    initSlidingWindowTimeline()
  },

  previousStep: () => {
    const { timeline, activeStepIndex } = get()
    if (activeStepIndex <= 0) return
    const nextIndex = activeStepIndex - 1
    const snap = timeline[nextIndex] ?? null
    set({
      activeStepIndex: nextIndex,
      currentSnapshot: snap,
      visualization: snap ? buildVisualizationModel(snap) : get().visualization,
      predictionInput: '',
      predictionFeedback: null,
      isPredictionLocked: true,
    })
  },

  nextStep: () => {
    const { timeline, activeStepIndex, isPredictionLocked } = get()
    if (isPredictionLocked) return
    const nextIndex = activeStepIndex + 1
    if (nextIndex >= timeline.length) return

    const snap = timeline[nextIndex] ?? null
    set({
      activeStepIndex: nextIndex,
      currentSnapshot: snap,
      visualization: snap ? buildVisualizationModel(snap) : get().visualization,
      predictionInput: '',
      predictionFeedback: null,
      isPredictionLocked: true,
    })
  },

  submitPrediction: () => {
    const { currentSnapshot, predictionInput } = get()
    if (!currentSnapshot) return

    const raw = predictionInput.trim()
    const expected = currentSnapshot.prediction.expectedAnswer

    // Accept numeric strings and plain numbers.
    const expectedStr = String(expected)
    const isCorrect = raw === expectedStr

    if (isCorrect) {
      set({
        predictionFeedback: {
          status: 'correct',
          message: currentSnapshot.successText,
          explanation: '',
        },
        isPredictionLocked: false,
      })
    } else {
      set({
        predictionFeedback: {
          status: 'incorrect',
          message: 'Not quite.',
          explanation: currentSnapshot.prediction.explanation,
        },
        isPredictionLocked: true,
      })
    }
  },
}))


