import { z } from 'zod';

export const InquirySchema = z.object({
  name: z.string().min(2, { message: 'يرجى إدخال اسم صحيح لا يقل عن حرفين' }),
  company: z.string().min(2, { message: 'يرجى إدخال اسم المنشأة أو المتجر' }),
  contact: z.string().trim().refine((value) => {
    if (z.email().safeParse(value).success) return true;
    const phone = value.replace(/[\s().-]/g, '');
    return /^\+?[0-9٠-٩۰-۹]{7,15}$/.test(phone);
  }, { message: 'يرجى إدخال رقم جوال أو بريد إلكتروني صحيح' }),
  sector: z.string().min(1, { message: 'يرجى اختيار القطاع' }),
  serviceNeed: z.string().optional(),
  goal: z.string().min(5, { message: 'يرجى كتابة الهدف أو التحدي الحالي' }),
});

export type InquiryFormData = z.infer<typeof InquirySchema>;
