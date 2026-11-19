'use server';

import { z } from 'zod';

export type InquiryState = { status: 'idle' | 'success' | 'error'; message: string };

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().max(254).pipe(z.email()),
  goal: z.string().trim().min(5).max(1000),
});

export async function submitVariantInquiry(_: InquiryState, formData: FormData): Promise<InquiryState> {
  const inquiry = inquirySchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    goal: formData.get('goal'),
  });
  if (!inquiry.success) return { status: 'error', message: 'راجع الاسم والبريد الإلكتروني واكتب هدفك في جملة قصيرة.' };

  const unavailable: InquiryState = {
    status: 'error',
    message: 'تعذّر إرسال الاستفسار. يمكنك مراسلتنا عبر البريد المباشر أدناه.',
  };
  const endpoint = process.env.INQUIRY_WEBHOOK_URL;
  if (!endpoint) return unavailable;

  try {
    const url = new URL(endpoint);
    if (url.protocol !== 'https:') return unavailable;
    const token = process.env.INQUIRY_WEBHOOK_TOKEN;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
      body: JSON.stringify({ ...inquiry.data, source: 'home-v2' }),
      signal: AbortSignal.timeout(5000),
      redirect: 'error',
      cache: 'no-store',
    });
    if (!response.ok) return unavailable;
    return { status: 'success', message: 'وصلنا استفسارك. سنراجعه ونتواصل معك عبر البريد الإلكتروني.' };
  } catch {
    return unavailable;
  }
}
