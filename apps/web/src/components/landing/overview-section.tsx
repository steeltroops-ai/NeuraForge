'use client'



export function OverviewSection() {
  return (
    <section
      className="bg-[var(--color-surface)]"
      style={{
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)'
      }}
    >
      <div
        className="max-w-7xl mx-auto"
        style={{
          paddingLeft: 'var(--space-4)',
          paddingRight: 'var(--space-4)'
        }}
      >
        <div
          className="text-center"
          style={{ marginBottom: 'var(--space-16)' }}
        >
          <h2
            className="font-semibold text-[var(--color-primary-600)] uppercase"
            style={{
              fontSize: 'var(--font-size-sm)',
              letterSpacing: 'var(--letter-spacing-wide)',
              marginBottom: 'var(--space-4)'
            }}
          >
            Overview
          </h2>
          <h3
            className="font-bold text-[var(--color-text-primary)] text-4xl md:text-5xl"
            style={{
              marginBottom: 'var(--space-8)'
            }}
          >
            Accelerating Scientific Discovery
          </h3>
        </div>

        <div className="max-w-4xl mx-auto">
          <p
            className="leading-relaxed text-center text-[var(--color-text-secondary)]"
            style={{ fontSize: 'var(--font-size-xl)' }}
          >
            NeuraForge is a decentralized platform that unites human ingenuity and artificial
            intelligence to accelerate breakthroughs in science, technology, and innovation.
            By leveraging a collaborative ecosystem, it empowers participants to contribute,
            validate, and benefit from the advancement of knowledge and discovery.
          </p>
        </div>
      </div>
    </section>
  )
}
