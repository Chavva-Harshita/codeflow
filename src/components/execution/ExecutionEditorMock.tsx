import { useMemo } from 'react'

import type { ExecutionSnapshot } from '../../state/types'

const codeLines = [
  'int left = 0;', // 1
  'int sum = 0;', // 2
  '', // 3
  'for (int right = 0; right < arr.length; right++) {', // 4
  '    sum += arr[right];', // 5
  '', // 6
  '    while (sum > k) {', // 7
  '        sum -= arr[left];', // 8
  '        left++;', // 9
  '    }', // 10
  '}', // 11
]

export function ExecutionEditorMock({
  snapshot,
}: {
  snapshot: ExecutionSnapshot | null
}) {
  const activeLineNumber = snapshot?.currentLineNumber ?? 1

  const lines = useMemo(() => {
    return codeLines.map((text, idx) => {
      const lineNumber = idx + 1
      const isActive = lineNumber === activeLineNumber
      return (
        <div
          key={lineNumber}
          className={
            'flex gap-3 px-2 py-0.5 font-mono text-xs leading-5 ' +
            (isActive ? 'bg-accent-bg/20' : 'bg-transparent')
          }
        >
          <div
            className={
              'w-6 text-right select-none ' +
              (isActive ? 'text-text-h' : 'text-text-h/60')
            }
          >
            {lineNumber}
          </div>
          <div className={isActive ? 'text-text-h' : 'text-text-h/80'}>
            {text || ' '}
          </div>
          <div className={isActive ? 'w-1 bg-accent-bg rounded-sm' : 'w-1'} />
        </div>
      )
    })
  }, [activeLineNumber])

  return (
    <div className="h-full rounded-md border border-border bg-code-bg/30">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="text-xs text-text-h/80">code.ts</div>
        <div className="text-[11px] text-text-h/60">mock execution</div>
      </div>

      <div className="flex h-[calc(100%-42px)] overflow-auto p-2">{lines}</div>
    </div>
  )
}

