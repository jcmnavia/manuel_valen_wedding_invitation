import { dressCode } from '@/content/dressCode'

export function AvoidColors() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {dressCode.avoid.map((c) => (
        <span
          key={c}
          className="inline-flex items-center px-4 py-2 border border-ink-soft/30 rounded-full text-sm text-ink-soft"
        >
          {c}
        </span>
      ))}
    </div>
  )
}
