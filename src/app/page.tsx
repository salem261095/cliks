import Image from 'next/image';
import Link from 'next/link';
import { contactLabel } from '@/components/editorial';
import { HomeMotion } from '@/components/home/home-motion';
import { BrandProof } from '@/components/home/brand-proof';
import { serviceImages } from '@/lib/service-media';
import { EditorialApproach, EditorialSectors, EditorialProducts, EditorialMethod, EditorialLocal } from '@/components/home/editorial-chapters';
import { ProjectConceptCard } from '@/components/home/project-concept-card';
import { TeamRoster } from '@/components/home/team-roster';
import { KNOWLEDGE_ITEMS, SERVICE_GROUPS } from '@/lib';
import { serviceGroupLines } from '@/lib/editorial-content';
import { homePartners, projectConcepts } from '@/lib/homepage-content';
import './home-cinema.css';
import './home-editorial.css';

const work = [
  {
    slug: 'al-rayyan', client: 'الريان', field: 'الأغذية والمشروبات', image: 'water-study',
    title: 'من الإعلان إلى الطلب.',
    description: 'ربط الرسالة الإعلانية برحلة الطلب، ووضع القياس في كل خطوة على الطريق.',
  },
  {
    slug: 'al-jawhariya', client: 'الجوهرية', field: 'التجارة الإلكترونية', image: 'fragrance-study',
    title: 'الهوية تُرى. والتجربة تُحسّ.',
    description: 'نقل شخصية العلامة إلى تجربة شراء تبدأ من أول نظرة وتستمر حتى إتمام الطلب.',
  },
];

const questions = [
  { title: 'كيف نبدأ العمل مع كلكس؟', answer: 'نبدأ بفهم هدفك التجاري وما جرّبته حتى الآن. من هناك نحدد التحدي الذي يستحق العمل أولاً وما نحتاجه لقياس التقدم.' },
  { title: 'هل يمكن أن نبدأ بخدمة واحدة؟', answer: 'نعم. يمكنك البدء بتحدٍّ محدد، مثل تحسين أداء الحملات أو سهولة الشراء أو الظهور المحلي لفروعك.' },
  { title: 'كيف نعرف ما الذي تحسّن؟', answer: 'نحدد المؤشر معك قبل التنفيذ. قد يكون تكلفة الحصول على طلب، أو معدل إتمام الشراء، أو عدد طلبات الاتجاهات إلى الفروع.' },
];

export default function HomePage() {
  return (
    <main className="motion-home">
      <HomeMotion />

      <section className="cinema-hero" aria-labelledby="home-title">
        <div className="cinema-hero-stage">
          <div className="cinema-photo" aria-hidden="true">
            <Image src="/assets/editorial/riyadh-skyline.webp" alt="" fill sizes="100vw" preload unoptimized />
          </div>
          <div className="cinema-copy">
            <p className="cinema-kicker cinema-opening-detail">وكالة نمو سعودية</p>
            <h1 id="home-title">
              <span className="cinema-line"><span>نفهم أعمالك.</span></span>
              <span className="cinema-line"><span>نوجّه تسويقك.</span></span>
              <span className="cinema-line"><span>ونبني نموّك.</span></span>
            </h1>
            <p className="cinema-intro cinema-opening-detail">استراتيجية وأداء وإبداع وتقنية تعمل معاً حول هدف واحد.</p>
            <div className="cinema-actions cinema-opening-detail">
              <Link className="cinema-button" href="#inquiry">{contactLabel}</Link>
              <Link className="cinema-link" href="#selected-work">شاهد نتائجنا</Link>
            </div>
          </div>
          <p className="cinema-after" aria-hidden="true">النمو يبدأ<br />بوضوح الاتجاه.</p>
          <a href="#approach" className="cinema-scroll-cue" aria-label="انتقل إلى نهج كلكس"><span />اكتشف كلكس بالتمرير</a>
        </div>
      </section>

      <EditorialApproach />
      <BrandProof caseLinks={work} />
      <EditorialSectors />

      <section id="selected-work" className="cinema-work" aria-labelledby="work-title">
        <div className="cinema-work-stage">
          <header className="cinema-wrap cinema-work-heading">
            <div><p className="cinema-kicker">دراسات النجاح والتصوّرات الإبداعية</p><h2 id="work-title" className="cinema-display">كيف يأخذ النمو شكله؟</h2></div>
            <Link className="cinema-link" href="/work">كل الأعمال</Link>
          </header>
          <div className="cinema-work-view" tabIndex={0} role="region" aria-label="معرض أعمال كلكس">
            <ul className="cinema-work-track">
              {work.map((project) => (
                <li key={project.slug}>
                  <Link href={`/work/${project.slug}`} className="cinema-project">
                    <div className={`cinema-project-photo cinema-project-${project.slug}`}>
                      <Image src={`/assets/editorial/${project.image}.webp`} alt="" fill sizes="(max-width: 899px) 83vw, 51vw" unoptimized />
                    </div>
                    <div className="cinema-project-copy">
                      <div><p className="cinema-kicker">{project.client} · {project.field}</p><h3>{project.title}</h3><p>{project.description}</p></div>
                      <span className="cinema-link">عرض الدراسة</span>
                    </div>
                  </Link>
                </li>
              ))}
              {projectConcepts.map((project) => <li key={project.slug}><ProjectConceptCard project={project} /></li>)}
            </ul>
          </div>
          <div className="cinema-wrap"><div className="cinema-work-progress" aria-hidden="true"><span /></div></div>
        </div>
      </section>

      <section className="cinema-section cinema-dark cinema-services">
        <div className="cinema-wrap">
          <header className="cinema-services-title">
            <p className="cinema-kicker">خدماتنا</p>
            <div><h2 className="cinema-display" data-enter="right">أربع طرق للعمل.<br />اتجاه واحد.</h2></div>
          </header>
          <div className="cinema-service-layout">
            <div className="cinema-service-media" aria-hidden="true">
              <div className="cinema-service-frame" data-photo-mask>
                {SERVICE_GROUPS.map((group) => (
                  <div className="cinema-service-shot" data-service-shot key={group.id}>
                    <Image src={`/assets/editorial/${serviceImages[group.id].asset}.webp`} alt="" fill sizes="43vw" />
                  </div>
                ))}
              </div>
            </div>
            <div className="cinema-service-list">
              {SERVICE_GROUPS.map((group, index) => (
                <article key={group.id} className="cinema-service-row" data-service-scene>
                  <div className="cinema-service-inline" data-photo-mask aria-hidden="true">
                    <Image src={`/assets/editorial/${serviceImages[group.id].asset}.webp`} alt="" fill sizes="(max-width: 760px) 90vw, 46vw" />
                  </div>
                  <div data-enter={index % 2 ? 'left' : 'up'}>
                    <span className="cinema-service-index" aria-hidden="true">0{index + 1}</span>
                    <h3><Link href={`/services#${group.id}`}>{group.title}</Link></h3>
                    <p>{serviceGroupLines[group.id]}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="cinema-service-more"><Link className="cinema-link" href="/services">نطاق الخدمات ومخرجاتها</Link></div>
        </div>
      </section>

      <EditorialProducts />
      <EditorialMethod />
      <EditorialLocal />

      <section className="cinema-section cinema-dark cinema-team">
        <div className="cinema-wrap">
          <p className="cinema-kicker">فريق كليكس</p>
          <div><h2 className="cinema-display" data-enter="right">الفكرة، ومن ينفّذها.</h2></div>
          <p className="cinema-team-intro">يجمع فريق المشروع التخطيط وإدارة الحملات والإبداع والتقنية. يتفق الجميع على الهدف ومؤشرات التقدم قبل بدء التنفيذ.</p>
          <TeamRoster headingLevel={3} />
          <Link className="cinema-link" href="/team">تعرّف على الفريق</Link>
          <div className="cinema-alliances">
            <h3>شركاؤنا الاستراتيجيون</h3>
            {homePartners.map((partner, index) => (
              <div key={partner.title}><article data-enter={index ? 'left' : 'up'}>
                <p className="cinema-kicker">{partner.role}</p><h4>{partner.title}</h4><p>{partner.description}</p>
              </article></div>
            ))}
          </div>
        </div>
      </section>

      <section className="cinema-section cinema-dark cinema-faq">
        <div className="cinema-wrap cinema-faq-grid">
          <div>
            <p className="cinema-kicker">مركز المعرفة</p>
            <div><h2 className="cinema-display" data-enter="right">قبل أن نبدأ.</h2></div>
            <Link className="cinema-link" href="/knowledge">تصفّح {KNOWLEDGE_ITEMS.length} سؤالاً وإجابة</Link>
          </div>
          <div className="cinema-questions">
            {questions.map((item) => <details key={item.title}><summary>{item.title}</summary><p>{item.answer}</p></details>)}
          </div>
        </div>
      </section>

    </main>
  );
}
