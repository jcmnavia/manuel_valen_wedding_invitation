type Swatch = {
  name: string
  hex: string
}

type Props = {
  /** Allowed colors to display as labeled circles. */
  colors: readonly Swatch[]
}

/**
 * Allowed-color palette for the dress code — a row of circular swatches, each
 * with a small name beneath it. Wraps responsively (the women's 16 colors flow
 * into several rows; the men's 6 sit in a single row on wider screens).
 */
export function ColorPalette({ colors }: Props) {
  return (
    <ul className="flex flex-wrap items-start justify-center gap-x-5 gap-y-6 sm:gap-x-7">
      {colors.map((c) => (
        <li key={c.name} className="flex w-16 flex-col items-center text-center">
          <span
            aria-hidden="true"
            className="h-12 w-12 rounded-full shadow-soft ring-1 ring-ink/10 md:h-14 md:w-14"
            style={{ backgroundColor: c.hex }}
          />
          <span className="mt-2 text-[11px] leading-tight text-ink-soft">
            {c.name}
          </span>
        </li>
      ))}
    </ul>
  )
}
