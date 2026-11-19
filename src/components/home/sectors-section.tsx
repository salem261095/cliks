import Link from 'next/link';
import { ArrowLeft, Utensils, ShoppingBag, Coffee, GraduationCap } from 'lucide-react';
import { SECTORS } from '@/lib';

const SECTOR_ICONS: Record<string, React.ReactNode> = {
  'food-beverage': <Utensils className="w-6 h-6" />,
  'ecommerce': <ShoppingBag className="w-6 h-6" />,
  'restaurants': <Coffee className="w-6 h-6" />,
  'education': <GraduationCap className="w-6 h-6" />,
};

export function SectorsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0b0f17]">
      <div className="cliks-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="cliks-kicker">
              <span>تخصص دقيق</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              القطاعات التي نتميز فيها
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-md">
            فهم عميق لتحديات السوق السعودي في أربعة قطاعات حيوية، مع حلول مجربة لرفع الإيرادات واستقطاب العملاء.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
          {SECTORS.map((sector) => (
            <Link
              key={sector.id}
              href={`/sectors#${sector.slug}`}
              className="p-8 rounded-2xl bg-[#111726] border border-white/10 hover:border-[var(--accent)]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {SECTOR_ICONS[sector.slug] || <ShoppingBag className="w-6 h-6" />}
                  </div>
                  {sector.badge && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--text-muted)]">
                      {sector.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-[var(--accent)] transition-colors">
                  {sector.title}
                </h3>
                <p className="text-sm font-medium text-[var(--accent)]/90 mt-1 mb-3">
                  {sector.headline}
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3">
                  {sector.summary}
                </p>

                {/* Key Solutions Highlights */}
                <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-2 text-xs text-[var(--text-dim)]">
                  {sector.cliksSolutions.slice(0, 2).map((solution, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                      <span className="line-clamp-1">{solution}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                <span>تحديات وحلول القطاع والعملاء</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
