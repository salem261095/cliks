'use client';

import { useRef, useState, type CSSProperties } from 'react';
import { Activity, BarChart3, Check, CircleDot, LayoutGrid, ListChecks, Target } from 'lucide-react';
import './product-dashboard.css';

const plan = [
  { title: 'تحديد هدف النمو', category: 'التخطيط' },
  { title: 'مراجعة قنوات الاكتساب', category: 'القنوات' },
  { title: 'اختبار رسالتين إعلانيتين', category: 'التنفيذ' },
  { title: 'مراجعة أداء صفحة الهبوط', category: 'التحسين' },
  { title: 'تدوين نتائج الأسبوع', category: 'المتابعة' },
];

const periods = [
  { label: '7 أيام', totals: ['4,280', '142', '3.2×'], series: [28, 34, 31, 51, 44, 68, 63, 82], channels: [82, 42, 18], caption: 'آخر 7 أيام' },
  { label: '30 يوماً', totals: ['16,540', '586', '3.8×'], series: [20, 31, 45, 38, 58, 67, 61, 91], channels: [326, 173, 87], caption: 'آخر 30 يوماً' },
] as const;
const channelNames = ['Google Ads', 'Meta Ads', 'Snap Ads'] as const;

function MadarDashboard() {
  const [done, setDone] = useState<readonly number[]>([0, 1]);
  const [openOnly, setOpenOnly] = useState(false);
  const filterButton = useRef<HTMLButtonElement>(null);
  const remaining = plan.length - done.length;
  const progress = Math.round(done.length / plan.length * 100);
  const tasks = plan.map((task, index) => ({ ...task, index })).filter((task) => !openOnly || !done.includes(task.index));

  function toggleTask(index: number) {
    if (openOnly && !done.includes(index)) filterButton.current?.focus();
    setDone((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  }

  return (
    <section className="product-dashboard madar-dashboard" aria-label="عرض تفاعلي لمساحة عمل مدار">
      <header className="studio-dashboard-bar" data-dashboard-part="first">
        <div className="studio-product-brand"><span className="studio-product-icon"><Target aria-hidden="true" /></span><b>مدار</b></div>
        <span className="studio-dashboard-preview">بيانات توضيحية</span>
      </header>
      <div className="madar-workspace">
        <div className="madar-intro" data-dashboard-part="first">
          <p>مساحة العمل <span aria-hidden="true">/</span> لوحة النمو</p>
          <h3>خطّة النمو</h3>
          <p>تابع الأولويات وحوّل خطتك إلى خطوات قابلة للتنفيذ.</p>
        </div>
        <div className="madar-layout">
          <section className="madar-progress" data-dashboard-part="second" aria-label="تقدم الخطة">
            <span className="madar-progress-label"><Activity aria-hidden="true" /> تقدّم الخطة</span>
            <div className="madar-ring" aria-hidden="true" style={{ '--madar-progress': `${progress}%` } as CSSProperties}><bdi>{progress}%</bdi></div>
            <p aria-live="polite">{done.length} من {plan.length} مهام مكتملة</p>
            <span>{remaining ? `المتبقي ${remaining}` : 'الخطة مكتملة'}</span>
          </section>
          <section className="madar-tasks" data-dashboard-part="third" aria-label="أولويات الخطة">
            <div className="madar-task-heading">
              <h4><ListChecks aria-hidden="true" /> الأولويات</h4>
              <button type="button" aria-pressed={openOnly} ref={filterButton} onClick={() => setOpenOnly(!openOnly)}>المتبقية فقط</button>
            </div>
            <ul>
              {tasks.map(({ index, title, category }) => (
                <li key={title}>
                  <button type="button" aria-pressed={done.includes(index)} onClick={() => toggleTask(index)}>
                    <span className="madar-checkbox">{done.includes(index) && <Check aria-hidden="true" />}</span>
                    <span className="madar-task-name">{title}<small>{category}</small></span>
                  </button>
                </li>
              ))}
            </ul>
            {!tasks.length && <p className="madar-empty">أنهيت جميع الأولويات.</p>}
          </section>
        </div>
      </div>
    </section>
  );
}

// Keep the values stable when CSS and HTML are serialized at different precisions.
const chartNumber = (value: number) => Number(value.toFixed(4));

function CampaignChart({ points }: { points: readonly number[] }) {
  const aspect = 3.35;
  const dx = 100 / (points.length - 1);
  const area = points.map((point, index) => `${chartNumber(index * dx)}% ${100 - point}%`).join(', ');

  return (
    <div className="bi-chart" aria-hidden="true" dir="ltr">
      <div className="bi-chart-series">
        <div className="bi-chart-area" style={{ '--bi-area': `polygon(0 100%, ${area}, 100% 100%)` } as CSSProperties} />
        {points.slice(0, -1).map((point, index) => {
          const rise = (point - points[index + 1]) / aspect;
          return (
            <i key={index} style={{
              '--bi-segment-x': `${chartNumber(index * dx)}%`,
              '--bi-segment-y': `${100 - point}%`,
              '--bi-segment-width': `${chartNumber(Math.hypot(dx, rise))}%`,
              '--bi-segment-angle': `${chartNumber(Math.atan2(rise, dx))}rad`,
            } as CSSProperties} />
          );
        })}
        <span className="bi-chart-dot" style={{ top: `${100 - points[points.length - 1]}%` }} />
      </div>
    </div>
  );
}

function ClikDashboard() {
  const [period, setPeriod] = useState(0);
  const current = periods[period];

  return (
    <section className="product-dashboard bi-dashboard" aria-label="عرض تفاعلي للوحة أداء CLIK BI">
      <header className="studio-dashboard-bar" data-dashboard-part="first">
        <div className="studio-product-brand"><span className="studio-product-icon"><BarChart3 aria-hidden="true" /></span><bdi>CLIK BI</bdi></div>
        <span className="studio-dashboard-preview">بيانات توضيحية</span>
      </header>
      <div className="bi-workspace">
        <div className="bi-heading" data-dashboard-part="first">
          <div><p><LayoutGrid aria-hidden="true" /> نظرة عامة</p><h3>أداء الحملات</h3></div>
          <div className="bi-periods" role="group" aria-label="الفترة">
            {periods.map((item, index) => <button key={item.label} type="button" aria-pressed={period === index} onClick={() => setPeriod(index)}>{item.label}</button>)}
          </div>
        </div>
        <div aria-live="polite">
          <dl className="bi-metrics" data-dashboard-part="second">
            {['الإنفاق الإعلاني', 'التحويلات', 'العائد على الإنفاق'].map((label, index) => (
              <div key={label}><dt>{label}</dt><dd><bdi>{current.totals[index]}</bdi>{index === 0 && <small> ر.س</small>}</dd></div>
            ))}
          </dl>
          <div className="bi-report">
            <section className="bi-trend" data-dashboard-part="third" aria-label="اتجاه الأداء">
              <div className="bi-panel-heading"><h4>اتجاه الأداء</h4><span><CircleDot aria-hidden="true" /> {current.caption}</span></div>
              <CampaignChart key={period} points={current.series} />
              <div className="bi-axis"><span>بداية الفترة</span><span>اليوم</span></div>
            </section>
            <section className="bi-channels" data-dashboard-part="fourth" aria-label="التحويلات بحسب القناة">
              <h4>أبرز القنوات</h4>
              <ul>
                {channelNames.map((name, index) => (
                  <li key={name}>
                    <span><bdi>{name}</bdi><bdi>{current.channels[index]}</bdi></span>
                    <div aria-hidden="true"><span style={{ '--bi-channel-share': chartNumber(current.channels[index] / current.channels[0]) } as CSSProperties} /></div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductDashboard({ product }: { product: 'madar' | 'clik-bi' }) {
  return product === 'madar' ? <MadarDashboard /> : <ClikDashboard />;
}
