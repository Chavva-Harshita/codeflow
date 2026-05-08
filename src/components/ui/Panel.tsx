import type React from 'react'

export function Panel({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      className={
        'rounded-md border border-border bg-code-bg/20 shadow-soft ' + className
      }
    >
      {children}
    </section>
  )
}

