import Link from 'next/link';
import { MapPin, Navigation, Star, ArrowLeft, CheckCircle2 } from 'lucide-react';

export function GoogleMapsFeature() {
  return (
    <section className="py-20 lg:py-28 bg-[#090d16] border-y border-white/5">
      <div className="cliks-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Simulation of Google Business Profile & Map */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="p-6 rounded-3xl bg-[#111726] border border-white/10 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Google Business Profile</h4>
                    <span className="text-[11px] text-[var(--text-dim)]">إدارة الظهور المحلي في الخرائط</span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded font-mono">
                  نشط ومُوثق
                </span>
              </div>

              {/* Stats Simulation */}
              <div className="grid grid-cols-3 gap-3 my-6 text-center">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-lg font-black font-mono text-white block">+85%</span>
                  <span className="text-[10px] text-[var(--text-muted)]">طلبات الاتجاهات</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-lg font-black font-mono text-[var(--accent)] block">4.8</span>
                  <div className="flex items-center justify-center gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-[var(--accent)] text-[var(--accent)]" />
                    ))}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-lg font-black font-mono text-white block">+60%</span>
                  <span className="text-[10px] text-[var(--text-muted)]">اتصالات مباشرة</span>
                </div>
              </div>

              {/* Action buttons inside simulation */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex-1 py-2 px-3 rounded-lg bg-white/10 text-white flex items-center justify-center gap-1.5 font-medium">
                  <Navigation className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>الاتجاهات للفرع</span>
                </div>
                <div className="flex-1 py-2 px-3 rounded-lg bg-white/5 text-[var(--text-muted)] text-center font-medium">
                  الاتصال الهاتفي
                </div>
              </div>
            </div>
          </div>

          {/* Copy and Details */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6">
            <div className="cliks-kicker">
              <MapPin className="w-4 h-4" />
              <span>الظهور المحلي والخرائط</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              اجعل فروعك الخيار الأول على خرائط Google وجوجل سيرش
            </h2>

            <p className="text-base text-[var(--text-muted)] leading-relaxed">
              تساعد كلكس شبكات الفروع والمطاعم والمتاجر على الهيمنة في نتائج البحث الجغرافي القريبة، وتحويل الباحثين المحليين إلى زوار حقيقيين ومبيعات يومية متكررة.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-white">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>إدارة وتوثيق ملفات الفروع بالكامل</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>تحسين الكلمات الدلالية المحلية للمنيو والخدمات</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>إدارة التقييمات وردود العملاء باحترافية</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>تقارير شهرية بعدد الزيارات والاتصالات</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/services#performance"
                className="inline-flex items-center gap-2 text-sm text-[var(--accent)] font-semibold hover:underline"
              >
                <span>تعرف على خدمة إدارة خرائط Google والظهور المحلي</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
