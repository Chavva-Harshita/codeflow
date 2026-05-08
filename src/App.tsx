import { useMemo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { appRoutes } from './app/routes'

export default function App() {
  const routeElements = useMemo(
    () =>
      appRoutes.map((r) => (
        <Route key={r.path} path={r.path} element={r.element} />
      )),
    [],
  )

  return (
    <BrowserRouter>
      <Routes>
        {routeElements}
      </Routes>
    </BrowserRouter>
  )
}

