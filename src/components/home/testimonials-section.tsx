import { Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: 'كلكس غيرت مفهومنا عن الوكالات التسويقية؛ لأول مرة نرى تقارير واضحة تربط الصرف الإعلاني مباشرة بأرباحنا وحجم طلبات الفروع.',
    author: '[الاسم — قيد الاعتماد]',
    role: 'الرئيس التنفيذي',
    company: 'مياه الريان',
    sector: 'قطاع الأغذية والمشروبات',
  },
  {
    quote: 'الاحترافية في تصميم الهوية وبناء المتجر الإلكتروني جعلت إطلاق علامتنا يتفوق على المنافسين القدامى في السوق من اليوم الأول.',
    author: '[الاسم — قيد الاعتماد]',
    role: 'الشريك المؤسس',
    company: 'الجوهرية',
    sector: 'التجارة الإلكترونية والتجزئة',
  },
  {
    quote: 'إدارة خرائط Google والظهور المحلي كانت العامل الأكبر في تدفق الزبائن الجدد على فروعنا في الرياض بمعدلات فاقت توقعاتنا.',
    author: '[الاسم — قيد الاعتماد]',
    role: 'مدير العمليات',
    company: 'سلطان كافيه',
    sector: 'المطاعم والمقاهي',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#070b12] border-t border-white/5">
      <div className="cliks-container">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="cliks-kicker justify-center">
            <Quote className="w-4 h-4" />
            <span>ثقة الشركاء</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            شهادات عملائنا
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            شهادات معتمدة من قيادات الأعمال والشركات التي تشرفنا ببناء نموها في السوق السعودي.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#111726] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                  ))}
                </div>

                <p className="text-sm text-white leading-relaxed mb-6 italic">
                  «{item.quote}»
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <strong className="text-sm font-bold text-white block">
                  {item.author}
                </strong>
                <span className="text-xs text-[var(--accent)] block mt-0.5">
                  {item.role} — {item.company}
                </span>
                <span className="text-[11px] text-[var(--text-dim)] block mt-1">
                  {item.sector}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
