import type React from 'react'

export function Button({
  children,
  className = '',
  variant = 'default',
  ...props
}: {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'primary'
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    'inline-flex items-center justify-center rounded-md border text-xs px-3 py-2 transition '

  const styles =
    variant === 'primary'
      ? 'border-accent-border bg-accent-bg/60 text-text-h hover:bg-accent-bg/80'
      : 'border-border bg-code-bg text-text-h hover:bg-accent-bg/30'

  return (
    <button className={base + styles + ' ' + className} {...props}>
      {children}
    </button>
  )
}

