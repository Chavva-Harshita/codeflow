import { CodeFlowLayout } from '../app/layout/CodeFlowLayout'
import { EditorWorkspacePlaceholder } from '../components/workspace/EditorWorkspacePlaceholder'
import { VisualizationPanelPlaceholder } from '../components/workspace/VisualizationPanelPlaceholder'
import { SidebarPlaceholder } from '../components/workspace/SidebarPlaceholder'

export function PlaygroundPage() {
  return (
    <CodeFlowLayout
      sidebar={<SidebarPlaceholder />}
      main={<EditorWorkspacePlaceholder />}
      visualization={<VisualizationPanelPlaceholder />}
    />
  )
}

