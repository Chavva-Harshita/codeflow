import { create } from 'zustand'

import type { PlaygroundSnapshot, VisualizationModel } from './types'

export type CodeFlowState = {
  // Later: current script/example id, selected step, etc.
  currentSnapshot: PlaygroundSnapshot | null
  visualization: VisualizationModel

  // Foundation-only actions (no business logic yet)
  setSnapshotPlaceholder: () => void
}

export const useCodeFlowStore = create<CodeFlowState>((set) => ({
  currentSnapshot: null,
  visualization: {
    values: [],
  },
  setSnapshotPlaceholder: () => {
    set({ currentSnapshot: null })
  },
}))

