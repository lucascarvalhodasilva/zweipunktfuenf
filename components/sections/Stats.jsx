import { stats } from '@/lib/content'

export default function Stats() {
  return (
    <section className="px-8 py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* wide card */}
          <div className="glass-card flex flex-col justify-center rounded-xl p-12 md:col-span-2">
            <h2 className="mb-3 text-2xl font-medium text-on-surface">{stats.wide.headline}</h2>
            <p className="text-sm leading-relaxed text-on-surface-variant">{stats.wide.copy}</p>
          </div>

          {/* stat cards */}
          {stats.items.map((item) => (
            <div
              key={item.label}
              className="glass-card flex flex-col items-center justify-center rounded-xl p-12 text-center"
            >
              <span className="mb-2 text-5xl font-bold text-signal">{item.value}</span>
              <p className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
