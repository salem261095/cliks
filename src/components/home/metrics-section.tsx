import Link from 'next/link';
import { ArrowLeft, TrendingUp, Info } from 'lucide-react';

const METRICS = [
  {
    id: 'ad-spend',
    title: 'إجمالي الإنفاق الإعلاني المُدار',
    value: '[قيد الاعتماد الرسمي]',
    context: 'توزيع الميزانيات عبر قنوات Google وMeta وSnapchat وتيك توك.',
    period: 'البيانات التراكمية',
  },
  {
    id: 'campaigns-count',
    title: 'عدد الحملات الناجحة',
    value: '[+350 حملة]',
    context: 'حملات موجهة للتحويل والمبيعات وتوليد العملاء المحتملين.',
    period: 'آخر 24 شهراً',
  },
  {
    id: 'clients-served',
    title: 'الشركاء والعملاء',
    value: '[+40 شريك]',
    context: 'في قطاعات الأغذية، التجارة الإلكترونية، المطاعم والتعليم.',
    period: 'المملكة العربية السعودية',
  },
  {
    id: 'top-roas',
    title: 'أعلى ROAS موثق',
    value: '[بيانات قيد المراجعة]',
    context: 'معدل العائد المحقق في حملات مواسم التجارة الإلكترونية.',
    period: 'موثق في دراسات الحالة',
  },
];

export function MetricsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0b0f17] relative">
      <div className="cliks-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/10">
          <div>
            <div className="cliks-kicker">
              <TrendingUp className="w-4 h-4" />
              <span>إنجازاتنا بالأرقام</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              أرقام تتحدث عن كفاءة الأداء وعائد الاستثمار
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] max-w-md">
            نؤمن بأن التسويق الناجح يُقاس بالأثر المالي الفعلي على البزنس، وليس بمجرد المشاهدات أو الأرقام الوهمية.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {METRICS.map((metric) => (
            <div
              key={metric.id}
              className="p-6 rounded-2xl bg-[#111726] border border-white/10 hover:border-[var(--accent)]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-medium text-[var(--accent)] uppercase tracking-wider">
                  {metric.title}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2 font-mono">
                  {metric.value}
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {metric.context}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[var(--text-dim)]">
                <span>{metric.period}</span>
                <span className="text-[var(--accent)] text-[10px] bg-[var(--accent)]/10 px-2 py-0.5 rounded">
                  موثق
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Context Note & Link to Case Studies */}
        <div className="mt-8 p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-dim)]">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span>
              ملاحظة: تُحدّث الأرقام ونسب النمو دورياً وفق البيانات المدققة، وتُربط كل نتيجة بدراسة الحالة والتقرير الخاص بها.
            </span>
          </div>
          <Link
            href="/work"
            className="text-[var(--accent)] hover:underline flex items-center gap-1 font-medium whitespace-nowrap"
          >
            <span>استكشف دراسات النجاح</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
