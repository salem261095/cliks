import Link from 'next/link';
import { ArrowLeft, Cpu, BarChart, Check, Sparkles } from 'lucide-react';
import { DIGITAL_PRODUCTS } from '@/lib';

export function ProductsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#070b12] border-y border-white/5 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[var(--accent)]/5 blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="cliks-container relative z-10">
        {/* Section Header with Arabic Tagline */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="cliks-kicker justify-center">
            <Sparkles className="w-4 h-4" />
            <span>منتجات كلكس الرقمية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            «خبرتنا التسويقية، في منتجات رقمية.»
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-3 leading-relaxed">
            حولنا أفضل ممارساتنا في إدارة الحملات وتحليل البيانات إلى أدوات برمجية ذكية تمكن منشأتك من متابعة النمو وتحقيق أعلى عائد.
          </p>
        </div>

        {/* 2 Products Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DIGITAL_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="p-8 lg:p-10 rounded-3xl bg-[#111726] border border-white/10 hover:border-[var(--accent)]/50 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] flex items-center justify-center">
                      {prod.id === 'madar' ? <Cpu className="w-6 h-6" /> : <BarChart className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        {prod.name}
                        <span className="text-xs font-mono font-normal text-[var(--text-dim)]">
                          ({prod.englishName})
                        </span>
                      </h3>
                      <span className="text-xs text-[var(--accent)] font-medium">
                        {prod.targetAudience}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-mono">
                    {prod.status === 'early_access' ? 'تسجيل مبكر' : 'عرض حي'}
                  </span>
                </div>

                <p className="text-sm text-white font-medium mb-3">
                  {prod.headline}
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {prod.description}
                </p>

                {/* Features Highlights */}
                <div className="flex flex-col gap-2.5 pt-4 border-t border-white/5">
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">
                    المزايا والفوائد الرئيسية:
                  </span>
                  {prod.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-dim)]">
                      <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white font-medium">{feat.title}: </strong>
                        <span>{feat.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href={`/products#${prod.slug}`}
                  className="cliks-btn-primary w-full sm:w-auto text-xs font-semibold"
                >
                  <span>{prod.ctaText}</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/products#${prod.slug}`}
                  className="text-xs text-[var(--text-muted)] hover:text-white transition-colors"
                >
                  استكشف تفاصيل المنتج والواجهات
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
