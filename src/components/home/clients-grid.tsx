import Image from 'next/image';
import Link from 'next/link';

const CLIENT_LOGOS = [
  { name: 'حركة', src: '/assets/clients/client-01-haraka.svg' },
  { name: 'سماوة', src: '/assets/clients/client-02-samawa.svg' },
  { name: 'تكوين', src: '/assets/clients/client-03-takween.svg' },
  { name: 'رضوى', src: '/assets/clients/client-04-ridwa.svg' },
  { name: 'الحوش جاليري', src: '/assets/clients/client-05-alhosh-gallery.svg' },
  { name: 'بساط', src: '/assets/clients/client-06-bessat.svg' },
  { name: 'سوق البلد', src: '/assets/clients/client-07-souq-al-balad.svg' },
  { name: 'نهاوند', src: '/assets/clients/client-08-nahawand.svg' },
  { name: 'حكاوي', src: '/assets/clients/client-09-hakawi.svg' },
  { name: 'سبوتلي', src: '/assets/clients/client-11-spotly.svg' },
  { name: 'سحاب', src: '/assets/clients/client-13-sahab.svg' },
  { name: 'درب', src: '/assets/clients/client-17-darb.svg' },
];

export function ClientsGrid() {
  return (
    <section className="py-16 bg-[#070b12] border-t border-white/5">
      <div className="cliks-container">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[var(--accent)] tracking-wider uppercase">
            شركاء النجاح
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            علامات تجارية سعودية وثقت في كلكس
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2">
            نعمل مع نخبة من الشركات الوطنية ورواد الأعمال في مختلف القطاعات لتحقيق النمو.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6 items-center">
          {CLIENT_LOGOS.map((client, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all flex items-center justify-center h-20 group"
            >
              <div className="relative w-full h-8 opacity-60 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0">
                <Image
                  src={client.src}
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/work"
            className="text-xs text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors underline-offset-4 hover:underline"
          >
            تصفح جميع المشاريع والعملاء في معرض الأعمال
          </Link>
        </div>
      </div>
    </section>
  );
}
