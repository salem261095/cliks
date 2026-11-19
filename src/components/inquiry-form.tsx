'use client';

import { useState, useSyncExternalStore, type FormEvent } from 'react';
import { InquirySchema } from '@/lib/inquiry-schema';
import { SECTORS } from '@/lib/catalogs/sectors';

const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function InquiryForm({ sector, embedded = false }: { sector?: string; embedded?: boolean }) {
  const interactive = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [valid, setValid] = useState(false);

  function checkInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = InquirySchema.safeParse(Object.fromEntries(
      Object.entries(data).map(([name, value]) => [name, String(value).trim()]),
    ));

    if (result.success) {
      setErrors({});
      setValid(true);
      return;
    }

    const messages = Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0]), issue.message]));
    setErrors(messages);
    const firstField = event.currentTarget.elements.namedItem(String(result.error.issues[0]?.path[0]));
    if (firstField instanceof HTMLElement) firstField.focus();
  }

  function fieldError(name: string) {
    return errors[name] ? <span className="field-error" id={`inquiry-${name}-error`}>{errors[name]}</span> : null;
  }

  function fieldA11y(name: string) {
    return { 'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `inquiry-${name}-error` : undefined };
  }

  return (
    <form className="inquiry-form" onSubmit={checkInquiry} onChange={() => setValid(false)}>
      {!embedded && <p className="form-notice">نموذج تجريبي. يمكنك تجربة التحقق من الحقول دون إرسال البيانات.</p>}
      <fieldset className="fields" disabled={!interactive} aria-label="بيانات الاستفسار">
        <label>الاسم<input name="name" autoComplete="name" required maxLength={100} {...fieldA11y('name')} />{fieldError('name')}</label>
        <label>المنشأة<input name="company" autoComplete="organization" required maxLength={120} {...fieldA11y('company')} />{fieldError('company')}</label>
        <label>البريد الإلكتروني أو رقم الجوال<input name="contact" dir="auto" required maxLength={150} {...fieldA11y('contact')} />{fieldError('contact')}</label>
        <label>القطاع<select name="sector" defaultValue={sector ?? ''} required {...fieldA11y('sector')}>
          <option value="" disabled>اختر القطاع</option>
          {SECTORS.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}
          <option value="other">قطاع آخر</option>
        </select>{fieldError('sector')}</label>
        <label className="field-wide">الهدف أو التحدي<textarea name="goal" rows={3} required maxLength={2000}
          {...fieldA11y('goal')} />{fieldError('goal')}</label>
      </fieldset>
      <button className="button button-dark" type="submit" disabled={!interactive}>تحقّق من الاستفسار</button>
      <p className="form-status" role="status">{valid && (embedded ? 'بيانات الاستفسار مكتملة. لم تُرسل أي معلومات.' : 'بيانات الاستفسار مكتملة. انتهت تجربة النموذج.')}</p>
    </form>
  );
}
