# CodeFlow — First Execution Simulation (Snapshot + Prediction Loop)

## Plan
- [ ] Update `src/state/types.ts` with full `ExecutionSnapshot` shape (line, pointers, sum, window/highlights, prediction Q/A/explanation, step id).
- [ ] Create mock sliding-window execution timeline: `src/execution/timeline/slidingWindowMockTimeline.ts`.
- [ ] Add simple execution engine interface (UI-agnostic): `src/execution/engine/executionEngine.ts`.
- [ ] Expand Zustand store in `src/state/store.ts` to manage timeline, active step, prediction loop, feedback, next/prev/replay.
- [ ] Replace playground placeholders with interactive components wired to Zustand:
  - [ ] `src/components/workspace/EditorWorkspacePlaceholder.tsx` (active line highlighting in mock Monaco code block)
  - [ ] `src/components/workspace/VisualizationPanelPlaceholder.tsx` (array rendering + highlights + window)
  - [ ] `src/components/workspace/PredictionPanelPlaceholder.tsx` (prediction input + validation + feedback)
  - [ ] `src/components/workspace/SidebarPlaceholder.tsx` (pointers/sum display + step controls)
- [ ] Wire timeline initialization in `src/pages/PlaygroundPage.tsx`.
- [ ] Smoke test in dev server: ensure prediction is required before advancing and feedback appears on incorrect answers.

