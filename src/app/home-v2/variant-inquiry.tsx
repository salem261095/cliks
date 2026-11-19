'use client';

import { useActionState, useState } from 'react';
import { siteContact } from '@/lib/site-contact';
import { submitVariantInquiry, type InquiryState } from './inquiry-actions';

const initialState: InquiryState = { status: 'idle', message: '' };

export function VariantInquiry() {
  const [state, submit, pending] = useActionState(submitVariantInquiry, initialState);
  const [draft, setDraft] = useState({ name: '', email: '', goal: '' });
  const body = draft.name || draft.email || draft.goal
    ? `الاسم أو المنشأة: ${draft.name}\nالبريد الإلكتروني: ${draft.email}\nالهدف: ${draft.goal}`
    : '';
  const emailHref = `mailto:${siteContact.email}?subject=${encodeURIComponent('استفسار إلى كلكس')}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

  return (
    <form className="home-v2-form" action={submit}>
      <label>الاسم أو المنشأة<input name="name" autoComplete="name" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} required minLength={2} maxLength={120} /></label>
      <label>البريد الإلكتروني<input name="email" type="email" dir="ltr" autoComplete="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} required maxLength={254} /></label>
      <label>ما هدفك؟<textarea name="goal" rows={3} value={draft.goal} onChange={(event) => setDraft({ ...draft, goal: event.target.value })} required minLength={5} maxLength={1000} /></label>
      <button className="cinema-button" type="submit" disabled={pending}>{pending ? 'جارٍ الإرسال…' : 'أرسل استفسارك'}</button>
      <p className="home-v2-form-status" role="status" data-status={state.status}>{state.message}</p>
      <a className="cinema-link" href={emailHref}>راسلنا مباشرة عبر البريد</a>
    </form>
  );
}
