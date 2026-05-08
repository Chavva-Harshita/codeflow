// Snapshot + UI-facing models for the first execution simulation.

export type CodeFlowStepId = string

export type PredictionExpectedAnswer = number | string

export type PredictionQuestion = {
  prompt: string
  expectedAnswer: PredictionExpectedAnswer
  // Used when the user gets it wrong.
  explanation: string
}

export type PointerState = {
  left: number
  right: number
}

export type WindowState = {
  startIndex: number
  endIndex: number
}

export type ExecutionSnapshot = {
  stepId: CodeFlowStepId

  // Active code location.
  currentLineNumber: number

  // Sliding window runtime variables.
  pointers: PointerState
  sum: number

  // Array visualization.
  activeWindow: WindowState
  highlightedArrayIndices: number[]

  // Prediction interaction (core loop).
  prediction: PredictionQuestion

  // Human-friendly explanation for correct answers.
  successText: string
}

export type VisualizationModel = {
  values: number[]
  activeWindow: WindowState | null
  highlightedArrayIndices: number[]
  pointersLabel: string
  sumLabel: string
}

export type PlaygroundSnapshot = ExecutionSnapshot



