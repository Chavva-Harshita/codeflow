import { CodeFlowLayout } from '../app/layout/CodeFlowLayout'
import { EditorWorkspacePlaceholder } from '../components/workspace/EditorWorkspacePlaceholder'
import { VisualizationPanelPlaceholder } from '../components/workspace/VisualizationPanelPlaceholder'
import { SidebarPlaceholder } from '../components/workspace/SidebarPlaceholder'

import { useEffect } from 'react'

import { useCodeFlowStore } from '../state/store'

export function PlaygroundPage() {
  const initTimeline = useCodeFlowStore((s) => s.initSlidingWindowTimeline)

  useEffect(() => {
    initTimeline()
  }, [initTimeline])

  return (
    <CodeFlowLayout
      sidebar={<SidebarPlaceholder />}
      main={<EditorWorkspacePlaceholder />}
      visualization={<VisualizationPanelPlaceholder />}
    />
  )
}



