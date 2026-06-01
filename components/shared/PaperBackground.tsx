export function PaperBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 paper-texture opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(31, 26, 20, 0.12) 100%)',
        }}
      />
    </div>
  )
}
