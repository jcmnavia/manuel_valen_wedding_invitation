import { dressCode } from '@/content/dressCode'

export function AvoidColors() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {dressCode.avoid.map((c) => (
        <span
          key={c}
          className="relative inline-flex items-center gap-2 px-4 py-2 border border-ink-soft/30 rounded-full text-sm text-ink-soft"
        >
          <span
            aria-hidden="true"
            className="absolute left-2 right-2 top-1/2 h-px bg-wax/60"
          />
          <span className="relative">{c}</span>
        </span>
      ))}
    </div>
  )
}
