import type React from 'react'
import { Navigate } from 'react-router-dom'

import { HomePage } from '../pages/HomePage'
import { PlaygroundPage } from '../pages/PlaygroundPage'


export type AppRouteObject = {
  path: string
  element: React.ReactNode
}

export const appRoutes: AppRouteObject[] = [
  { path: '/', element: <Navigate to="/playground" replace /> },
  { path: '/home', element: <HomePage /> },
  { path: '/playground', element: <PlaygroundPage /> },
]

