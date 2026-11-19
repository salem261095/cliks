import Link from 'next/link';
import { ShieldCheck, Award, ExternalLink } from 'lucide-react';
import { ACCREDITATIONS } from '@/lib';

export function AccreditationsStrip() {
  return (
    <section className="py-8 bg-[#070b12] border-y border-white/5">
      <div className="cliks-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-start">
            <span className="text-xs font-semibold text-[var(--accent)] tracking-wider uppercase">
              الاعتمادات والشراكات الموثقة
            </span>
            <p className="text-sm text-white font-medium mt-0.5">
              ممارسات تسويقية وتخطيطية معتمدة من كبرى المنظمات العالمية
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
            {ACCREDITATIONS.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center shrink-0 text-[var(--accent)]">
                  {item.id === 'google-partner' ? (
                    <ShieldCheck className="w-5 h-5" />
                  ) : (
                    <Award className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">{item.name}</span>
                    <span className="text-[10px] bg-white/10 text-[var(--text-muted)] px-1.5 py-0.5 rounded">
                      معتمد
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-1 mt-0.5">
                    {item.role}
                  </p>
                </div>
                {item.id === 'sostac-certified' ? (
                  <Link
                    href="/sostac"
                    className="mr-auto text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors p-1"
                    title="استعراض المنهجية"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="mr-auto text-[10px] text-[var(--text-dim)] p-1">
                    موثق
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
