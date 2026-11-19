import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

const SOSTAC_STAGES = [
  {
    step: '01',
    letter: 'S',
    name: 'تحليل الوضع (Situation Analysis)',
    question: 'أين نحن الآن؟',
    deliverable: 'تدقيق السوق والمنافسين، تقييم الأداء الحالي، وتحليل نقاط القوة والضعف والفرص (SWOT).',
  },
  {
    step: '02',
    letter: 'O',
    name: 'الأهداف الذكية (Objectives)',
    question: 'أين نريد أن نصل؟',
    deliverable: 'تحديد أهداف رقمية محددة وقابلة للقياس (KPIs، أهداف المبيعات، وتكلفة الاكتساب المستهدفة).',
  },
  {
    step: '03',
    letter: 'S',
    name: 'الاستراتيجية (Strategy)',
    question: 'كيف سنصل إلى هناك؟',
    deliverable: 'تحديد شرائح الجمهور، التموضع التنافسي (Positioning)، وبناء مسارات التحويل المتكاملة.',
  },
  {
    step: '04',
    letter: 'T',
    name: 'التكتيكات والقنوات (Tactics)',
    question: 'ما هي الأدوات المستخدمة؟',
    deliverable: 'اختيار المنصات الإعلانية الأنسب، جدولة الحملات، وصياغة الرسائل والمواد الإبداعية.',
  },
  {
    step: '05',
    letter: 'A',
    name: 'التنفيذ والعمليات (Action)',
    question: 'من يفعل ماذا ومتى؟',
    deliverable: 'خطة تشغيلية دقيقة لإطلاق الإعلانات، ضبط التتبع، وتوزيع المهام بين فرق العمل.',
  },
  {
    step: '06',
    letter: 'C',
    name: 'الرقابة والتحسين (Control)',
    question: 'كيف نقيس ونطور الأداء؟',
    deliverable: 'لوحات قياس فورية، مراجعات أسبوعية، وتحسين يومي لنسب التحويل والعائد الإعلاني.',
  },
];

export function SostacSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0b0f17]">
      <div className="cliks-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/10">
          <div>
            <div className="cliks-kicker">
              <ShieldCheck className="w-4 h-4" />
              <span>منهجية معتمدة عالمياً</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              منهجية SOSTAC®️ في كلكس
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-md">
            نعتمد الإطار العلمي الأشهر عالمياً للتخطيط التسويقي، لنضمن أن كل قرار مبني على بيانات موثوقة ومردود محسوب بدقة.
          </p>
        </div>

        {/* 6 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {SOSTAC_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="p-6 rounded-2xl bg-[#111726] border border-white/10 hover:border-[var(--accent)]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-[var(--accent)]">
                    {stage.step} · {stage.letter}
                  </span>
                  <span className="text-xs text-[var(--text-dim)] font-mono">
                    {stage.question}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {stage.name}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {stage.deliverable}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-[var(--accent)]">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>مخرجات معتمدة وموثقة</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white">
              تريد تطبيق منهجية SOSTAC®️ على علامتك التجارية؟
            </h4>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              نبدأ بتدقيق الوضع الراهن وتحديد مسارات النمو ذات الأولوية لبزنسك.
            </p>
          </div>
          <Link
            href="/sostac"
            className="cliks-btn-primary text-xs font-semibold whitespace-nowrap"
          >
            <span>استعراض تفاصيل المنهجية</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
