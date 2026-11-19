import Link from 'next/link';
import { ArrowLeft, HelpCircle, BookOpen, UserCheck, Calendar } from 'lucide-react';
import { KNOWLEDGE_ITEMS } from '@/lib';

export function FaqPreview() {
  const selectedQuestions = KNOWLEDGE_ITEMS.slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-[#0b0f17]">
      <div className="cliks-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/10">
          <div>
            <div className="cliks-kicker">
              <BookOpen className="w-4 h-4" />
              <span>مركز المعرفة</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              إجابات موثقة لأهم الأسئلة التسويقية
            </h2>
          </div>
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent)] font-semibold hover:underline"
          >
            <span>استكشف بنك الأسئلة بالكامل (+100 سؤال)</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Selected FAQ Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
          {selectedQuestions.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#111726] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-medium">
                    {item.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-dim)]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>مُراجع: {item.reviewDate}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>{item.question}</span>
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3">
                  {item.answer}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[var(--text-dim)]">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{item.author}</span>
                </div>
                <Link
                  href="/knowledge"
                  className="text-[var(--accent)] hover:underline font-medium"
                >
                  اقرأ الإجابة الكاملة
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
