import { Handshake, Sparkles, CheckCircle2 } from 'lucide-react';
import { STRATEGIC_PARTNERS } from '@/lib';

export function PartnersSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0b0f17]">
      <div className="cliks-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/10">
          <div>
            <div className="cliks-kicker">
              <Handshake className="w-4 h-4" />
              <span>تحالفات إبداعية متكاملة</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              شركاؤنا الاستراتيجيون
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-md">
            نؤمن بالتكامل التخصصي. نتعاون مع وكالات رائدة لنقدم لعملائنا حلول إنتاج وإبداع متكاملة تجمع بين الفن التسويقي والتنفيذ الرفيع.
          </p>
        </div>

        {/* Strategic Partners Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          {STRATEGIC_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="p-8 lg:p-10 rounded-3xl bg-[#111726] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 rounded-full border border-[var(--accent)]/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>شراكة استراتيجية وتكاملية</span>
                  </div>
                  <span className="text-xs text-[var(--text-dim)]">المملكة العربية السعودية</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  {partner.name}
                </h3>
                <p className="text-sm font-semibold text-[var(--accent)] mb-4">
                  {partner.role}
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {partner.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 bg-black/20 -mx-8 -mb-8 lg:-mx-10 lg:-mb-10 p-6 lg:p-8 rounded-b-3xl">
                <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-2">
                  فائدة الشراكة لعميل كلكس:
                </span>
                <div className="flex items-start gap-2.5 text-xs text-[var(--text-dim)] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>{partner.benefitToClient}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
