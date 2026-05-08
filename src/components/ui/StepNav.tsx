export function StepNav({
  steps,
  activeIndex,
}: {
  steps: string[]
  activeIndex: number
}) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((label, i) => (
        <div
          key={label}
          className={
            'h-2 flex-1 rounded-full ' +
            (i === activeIndex ? 'bg-accent-bg/90' : 'bg-accent-bg/20')
          }
          aria-label={label}
        />
      ))}
    </div>
  )
}

