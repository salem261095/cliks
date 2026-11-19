'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Clock, PhoneCall } from 'lucide-react';

export function QuickContact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contact: '',
    sector: '',
    goal: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#070b12] border-t border-white/10 relative">
      <div className="cliks-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Value */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="cliks-kicker">
              <span>تواصل مباشر</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              ناقش أهدافك وتحديات نموك مع فريق كلكس
            </h2>

            <p className="text-base text-[var(--text-muted)] leading-relaxed">
              شاركنا نبذة عن منشأتك والتحديات الحالية، وسيقوم مستشار النمو لدينا بدراسة نشاطك وتحديد القنوات والفرص الأكثر جدوى لعملك.
            </p>

            {/* Next Steps Clarification */}
            <div className="p-6 rounded-2xl bg-[#111726] border border-white/10 flex flex-col gap-4 mt-2">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                ما الذي يحدث بعد إرسال النموذج؟
              </h4>
              <div className="flex items-start gap-3 text-xs text-[var(--text-dim)]">
                <Clock className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <span>
                  مراجعة أولية لنشاطك وموقعك الإلكتروني خلال <strong>24 ساعة عمل</strong>.
                </span>
              </div>
              <div className="flex items-start gap-3 text-xs text-[var(--text-dim)]">
                <PhoneCall className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <span>
                  جلسة استكشافية هاتفية أو مرئية مدتها 20 دقيقة لمناقشة الأهداف وخطة العمل.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#111726] border border-white/10 shadow-2xl">
              {status === 'success' ? (
                <div className="py-12 text-center flex flex-col items-center gap-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">تم استلام طلبك بنجاح!</h3>
                  <p className="text-sm text-[var(--text-muted)] max-w-md">
                    شكراً لتواصلك. سيقوم أحد مستشاري كلكس بدراسة بياناتك والتواصل معك عبر وسيلة التواصل المحددة.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setFormData({ name: '', company: '', contact: '', sector: '', goal: '' });
                    }}
                    className="cliks-btn-secondary text-xs mt-4"
                  >
                    إرسال طلب جديد
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="text-xl font-bold text-white mb-1">
                    نموذج مناقشة الأهداف
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white mb-1.5">
                        الاسم الكريم <span className="text-[var(--accent)]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="مثال: محمد السالم"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[var(--text-dim)] text-sm focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white mb-1.5">
                        اسم المنشأة أو المتجر <span className="text-[var(--accent)]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="مثال: شركة نمو للأغذية"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[var(--text-dim)] text-sm focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white mb-1.5">
                        وسيلة التواصل (جوال / بريد) <span className="text-[var(--accent)]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="05XXXXXXXX أو البريد الإلكتروني"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[var(--text-dim)] text-sm focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white mb-1.5">
                        القطاع <span className="text-[var(--accent)]">*</span>
                      </label>
                      <select
                        required
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--accent)]"
                      >
                        <option value="" disabled>اختر القطاع</option>
                        <option value="food-beverage">الأغذية والمشروبات</option>
                        <option value="ecommerce">التجارة الإلكترونية والتجزئة</option>
                        <option value="restaurants">المطاعم والمقاهي</option>
                        <option value="education">التعليم والتدريب</option>
                        <option value="other">قطاع آخر</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white mb-1.5">
                      الهدف أو التحدي الحالي <span className="text-[var(--accent)]">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      placeholder="اذكر بإيجاز هدفك التسويقي (مثل: زيادة مبيعات المتجر، تحسين العائد ROAS، فتح فروع جديدة...)"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[var(--text-dim)] text-sm focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="cliks-btn-primary w-full py-3.5 text-sm font-semibold justify-center mt-2"
                  >
                    {status === 'submitting' ? (
                      <span>جاري الإرسال...</span>
                    ) : (
                      <>
                        <span>إرسال طلب المناقشة</span>
                        <Send className="w-4 h-4 mr-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
