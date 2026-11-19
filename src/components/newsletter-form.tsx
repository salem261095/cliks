'use client';

import { useActionState } from 'react';
import { subscribeToNewsletter, type NewsletterState } from '@/app/newsletter-actions';

const initialState: NewsletterState = { status: 'idle', message: '' };

export function NewsletterForm() {
  const [state, submit, pending] = useActionState(subscribeToNewsletter, initialState);

  return (
    <form className="newsletter-form" action={submit}>
      <label htmlFor="newsletter-email">بريدك الإلكتروني</label>
      <div className="newsletter-controls">
        <input id="newsletter-email" name="email" type="email" dir="ltr" autoComplete="email"
          required maxLength={254} aria-describedby="newsletter-status" />
        <button className="chrome-cta" type="submit" disabled={pending}>{pending ? 'جارٍ الإرسال…' : 'اشترك'}</button>
      </div>
      <p id="newsletter-status" role="status" className="newsletter-status">{state.message}</p>
    </form>
  );
}
