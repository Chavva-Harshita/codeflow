// Foundation-only: define state shapes for later business logic.

export type CodeFlowStepId = string

export type PlaygroundSnapshot = {
  // Placeholder for editor + runtime state.
  stepId: CodeFlowStepId
  // Add later: variables, memory model, etc.
}

export type VisualizationModel = {
  // Placeholder for array visualization state.
  values: number[]
}

