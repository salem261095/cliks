import Link from 'next/link';
import { ArrowLeft, Compass, BarChart3, Palette, MonitorCheck, Check } from 'lucide-react';
import { SERVICE_GROUPS } from '@/lib';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  strategy: <Compass className="w-6 h-6" />,
  performance: <BarChart3 className="w-6 h-6" />,
  creative: <Palette className="w-6 h-6" />,
  digital: <MonitorCheck className="w-6 h-6" />,
};

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0b0f17]">
      <div className="cliks-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/10">
          <div>
            <div className="cliks-kicker">
              <span>منظومة متكاملة</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              خدماتنا الرئيسية
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-md">
            نقدم حلولاً تسويقية واستراتيجية ورقمية مصممة لتحقيق نتائج مالية واضحة وقابلة للقياس عبر أربع ركائز أساسية.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          {SERVICE_GROUPS.map((group) => (
            <div
              key={group.id}
              className="p-8 rounded-2xl bg-[#111726] border border-white/10 hover:border-[var(--accent)]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] flex items-center justify-center mb-6">
                  {SERVICE_ICONS[group.id]}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {group.title}
                </h3>
                <p className="text-sm font-medium text-[var(--accent)] mb-3">
                  {group.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {group.description}
                </p>

                {/* Subservices list */}
                <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                  {group.items.map((item) => (
                    <div key={item.id} className="p-3 rounded-lg bg-black/30 border border-white/5">
                      <h4 className="text-sm font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                        {item.shortDescription}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[var(--accent)]">
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>المخرجات: {item.deliverablesSummary}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={`/services#${group.id}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  <span>استكشف النطاق والمخرجات بالتفصيل</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
