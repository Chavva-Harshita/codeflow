import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h1 className="font-heading text-balance text-3xl font-semibold text-text-h">CodeFlow</h1>
        <p className="mt-2 text-sm text-text">
          Prediction-based code execution simulation — foundation UI only.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/playground"
          className="rounded-md border border-border bg-code-bg px-4 py-2 text-sm text-text-h hover:bg-accent-bg/40"
        >
          Open Playground
        </Link>
      </div>
    </div>
  )
}

