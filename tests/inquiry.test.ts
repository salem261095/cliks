import { describe, it, expect } from 'vitest';
import { InquirySchema } from '../src/lib/inquiry-schema';

describe('Inquiry Schema Validation', () => {
  it('should validate complete inquiry payload successfully', () => {
    const validData = {
      name: 'محمد السالم',
      company: 'مياه الريان',
      contact: '0501234567',
      sector: 'food-beverage',
      serviceNeed: 'performance',
      goal: 'زيادة مبيعات اشتراكات المياه الشهرية وخفض تكلفة الطلب.',
    };

    const result = InquirySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail when name or company is too short', () => {
    const invalidData = {
      name: 'م',
      company: '',
      contact: '0501234567',
      sector: 'ecommerce',
      goal: 'تحسين المتجر',
    };

    const result = InquirySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issues = result.error.issues || (result.error as any).errors;
      const errorPaths = issues.map((e: any) => e.path[0]);
      expect(errorPaths).toContain('name');
      expect(errorPaths).toContain('company');
    }
  });

  it('should fail when goal description is missing or too short', () => {
    const invalidData = {
      name: 'أحمد',
      company: 'شركة تجارة',
      contact: 'name@domain.com',
      sector: 'ecommerce',
      goal: 'أ',
    };

    const result = InquirySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
