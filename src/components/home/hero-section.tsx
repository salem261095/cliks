import Link from 'next/link';
import { ArrowLeft, Play, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-[#0b0f17]">
      {/* Background Subtle Gradient Glow */}
      <div
        className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[var(--accent)]/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="cliks-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Strategic Copy */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            {/* Top Pill Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[var(--accent)] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>وكالة سعودية تجمع الاستراتيجية والتسويق والإبداع والتقنية</span>
            </div>

            {/* Core Value Proposition Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.25] tracking-tight text-balance">
              نفهم أعمالك. <br />
              <span className="text-[var(--accent)]">نوجّه تسويقك.</span> <br />
              ونبني نموّك.
            </h1>

            {/* Sub-narrative Lead */}
            <p className="text-lg lg:text-xl text-[var(--text-muted)] max-w-xl leading-relaxed">
              شريكك الاستراتيجي في المملكة لتوحيد خطط التسويق، وإدارة الحملات الممولة، وصناعة المحتوى الإبداعي، وتحويل الأرقام إلى مبيعات ملموسة وأرباح مستدامة.
            </p>

            {/* Quick Proof Points */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-[var(--text-dim)] pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-white">منهجية SOSTAC®️ المعتمدة</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-white">شريك Google معتمد</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-white">إدارة مبنية على الـ ROAS</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="cliks-btn-primary w-full sm:w-auto text-base px-8 py-3.5 shadow-xl shadow-[var(--accent-glow)] group"
              >
                <span>ناقش أهدافك معنا</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/work"
                className="cliks-btn-secondary w-full sm:w-auto text-base px-8 py-3.5"
              >
                <span>شاهد نتائجنا</span>
              </Link>
            </div>
          </div>

          {/* Visual Showcase Reel Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/15 to-white/5 border border-white/10 shadow-2xl overflow-hidden group">
              {/* Media Container with Yellow Accent Glow */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-xl bg-[#111726] overflow-hidden flex flex-col justify-between p-6">
                {/* Floating Metric Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white">
                    <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
                    <span>أعلى ROAS موثق في حملاتنا</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Cinematic Center Visual Graphic */}
                <div className="my-auto text-center flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current mr-0.5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">مشهد من أعمال ومخرجات كلكس</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">حملات رقمية، هويات بصرية، ولوحات تحليلات متقدمة</p>
                  </div>
                </div>

                {/* Bottom Frame Details */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[var(--text-dim)]">
                  <span>منظومة كلكس للتسويق المتكامل</span>
                  <span className="font-mono text-[var(--accent)]">CLIKS SHOWREEL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
