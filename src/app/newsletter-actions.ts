'use server';

import { z } from 'zod';

export type NewsletterState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const emailSchema = z.string().trim().max(254).pipe(z.email());

export async function subscribeToNewsletter(_: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const email = emailSchema.safeParse(formData.get('email'));
  if (!email.success) return { status: 'error', message: 'أدخل بريداً إلكترونياً صحيحاً.' };

  const endpoint = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!endpoint) return { status: 'error', message: 'الاشتراك غير متاح حالياً. يرجى المحاولة لاحقاً.' };

  const error: NewsletterState = { status: 'error', message: 'تعذّر إرسال طلب الاشتراك. يرجى المحاولة لاحقاً.' };
  try {
    const url = new URL(endpoint);
    if (url.protocol !== 'https:') return error;
    const token = process.env.NEWSLETTER_WEBHOOK_TOKEN;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
      body: JSON.stringify({ email: email.data }),
      signal: AbortSignal.timeout(5000),
      cache: 'no-store',
    });
    if (!response.ok) return error;
    return { status: 'success', message: 'تم استلام طلب اشتراكك.' };
  } catch {
    return error;
  }
}
