import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Quote, Award } from 'lucide-react';
import { CASE_STUDIES } from '@/lib';

export function FeaturedCases() {
  const featuredCases = CASE_STUDIES.filter((c) => c.featured);

  return (
    <section className="py-20 lg:py-28 bg-[#090d16] border-y border-white/5">
      <div className="cliks-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/10">
          <div>
            <div className="cliks-kicker">
              <Award className="w-4 h-4" />
              <span>دراسات النجاح</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              مشاريع حقيقية ونتائج موثقة بالأرقام
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline font-semibold"
          >
            <span>استعراض كافة المشاريع ودراسات الحالة</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Case Studies Detailed Cards */}
        <div className="flex flex-col gap-12 pt-12">
          {featuredCases.map((cs) => (
            <div
              key={cs.id}
              className="p-8 lg:p-10 rounded-3xl bg-[#111726] border border-white/10 shadow-xl flex flex-col lg:flex-row gap-10 items-stretch"
            >
              {/* Left Column: Context, Challenge & Execution */}
              <div className="lg:w-7/12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] font-semibold border border-[var(--accent)]/30">
                      {cs.sectorName}
                    </span>
                    <span className="text-xs text-[var(--text-dim)]">
                      {cs.serviceGroup}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    {cs.title}
                  </h3>

                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                    {cs.summary}
                  </p>

                  {/* Schema breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                      <strong className="block text-[var(--accent)] mb-1 text-sm">
                        التحدي:
                      </strong>
                      <p className="text-[var(--text-dim)] leading-relaxed">
                        {cs.challenge}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                      <strong className="block text-[var(--accent)] mb-1 text-sm">
                        دور كلكس:
                      </strong>
                      <p className="text-[var(--text-dim)] leading-relaxed">
                        {cs.cliksRole}
                      </p>
                    </div>
                  </div>

                  {/* Execution items */}
                  <div className="mt-6">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                      أبرز ما نفذناه في المشروع:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text-muted)]">
                      {cs.execution.slice(0, 4).map((ex, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                          <span>{ex}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/work#${cs.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-[var(--accent)] font-semibold hover:underline"
                  >
                    <span>تفاصيل دراسة الحالة والمخرجات الكاملة</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Results & Testimonial */}
              <div className="lg:w-5/12 flex flex-col justify-between p-6 lg:p-8 rounded-2xl bg-[#0d1424] border border-white/5">
                <div>
                  <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider block mb-4">
                    مؤشرات النتائج والفترة
                  </span>

                  <div className="flex flex-col gap-4">
                    {cs.results.map((res, rIdx) => (
                      <div
                        key={rIdx}
                        className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
                      >
                        <div>
                          <span className="text-xs text-[var(--text-muted)] block">
                            {res.label}
                          </span>
                          <span className="text-[11px] text-[var(--text-dim)]">
                            {res.period}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm font-mono font-bold text-white bg-white/10 px-2.5 py-1 rounded">
                          {res.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote */}
                {cs.testimonial && (
                  <div className="mt-6 pt-6 border-t border-white/10 relative">
                    <Quote className="w-8 h-8 text-[var(--accent)]/20 absolute -top-4 right-0" />
                    <p className="text-xs sm:text-sm text-white italic leading-relaxed mb-3">
                      «{cs.testimonial.quote}»
                    </p>
                    <div className="text-xs">
                      <strong className="text-white block font-semibold">
                        {cs.testimonial.authorName}
                      </strong>
                      <span className="text-[var(--text-dim)]">
                        {cs.testimonial.authorRole} — {cs.testimonial.company}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
