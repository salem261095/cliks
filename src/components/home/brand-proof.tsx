import Image from 'next/image';
import Link from 'next/link';
import { LogoMarquee } from './logo-marquee';

const clientLogos = [
  { asset: 'BedBoos', name: 'BedBoos' },
  { asset: 'ChocolatierExceptionnel', name: 'Chocolate Exceptionnel' },
  { asset: 'EnjazInstitute', name: 'Enjaz Institute' },
  { asset: 'Fukhariah', name: 'Fukhariah' },
  { asset: 'JawariahDates', name: 'Jawariah Dates' },
  { asset: 'MasahGallery', name: 'Masah Gallery' },
  { asset: 'MnahelSaudiSchool', name: 'Mnahel Saudi School' },
  { asset: 'SaudiCancerFoundation', name: 'Saudi Cancer Foundation' },
  { asset: 'THeGateResutrant', name: 'The Gate Restaurant' },
  { asset: 'ZamanAweulOIl', name: 'Zaman Aweul Oil' },
];

export function ClientLogoLoop() {
  return (
    <LogoMarquee>
      {[false, true].map((duplicate) => (
        <ul key={String(duplicate)} className="brand-logo-group"
          aria-hidden={duplicate || undefined} aria-label={duplicate ? undefined : 'شعارات العملاء'}>
          {clientLogos.map(({ asset, name }) => (
            <li key={asset}><Image src={`/assets/marks/clients/${asset}.webp`} alt={duplicate ? '' : name} fill
              sizes="(max-width: 850px) 136px, (max-width: 1250px) 16vw, 200px" /></li>
          ))}
        </ul>
      ))}
    </LogoMarquee>
  );
}

export function BrandProof({ caseLinks }: { caseLinks: readonly { slug: string; client: string }[] }) {
  return (
    <section className="cinema-section home-editorial brand-proof" aria-labelledby="brand-proof-title">
      <div className="cinema-wrap">
        <header className="brand-proof-heading">
          <div><h2 id="brand-proof-title" className="editorial-title" data-enter="right">عملاؤنا</h2></div>
          <Link className="cinema-link" href="#selected-work">شاهد أعمالنا</Link>
        </header>
        <ClientLogoLoop />
        <div className="brand-proof-bottom">
          <div className="brand-case-links">
            <h3>دراسات مختارة</h3>
            {caseLinks.map(({ slug, client }) => <Link key={slug} className="cinema-link" href={`/work/${slug}`}>{client}</Link>)}
          </div>
          <div className="brand-credentials" aria-label="الاعتمادات والمنهجيات">
            <a href="https://www.google.com/partners/agency?id=5892162601">
              <Image src="/assets/marks/google-partner.svg" alt="Google Partner" width={96} height={96} unoptimized />
            </a>
            <Link href="/sostac" aria-label="منهجية SOSTAC">
              <Image src="/assets/marks/sostac.png" alt="SOSTAC®" width={253} height={52} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
