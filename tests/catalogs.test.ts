import { describe, it, expect } from 'vitest';
import {
  SERVICE_GROUPS,
  ALL_SERVICES,
  SECTORS,
  CASE_STUDIES,
  DIGITAL_PRODUCTS,
  KNOWLEDGE_ITEMS,
  STRATEGIC_PARTNERS,
  ACCREDITATIONS,
} from '../src/lib';

describe('Cliks Catalogs Data Integrity', () => {
  it('should have 4 distinct service groups matching specification', () => {
    expect(SERVICE_GROUPS).toHaveLength(4);
    const groupIds = SERVICE_GROUPS.map((g) => g.id);
    expect(groupIds).toEqual(['strategy', 'performance', 'creative', 'digital']);
  });

  it('should have all services properly linked with scope deliverables', () => {
    expect(ALL_SERVICES.length).toBeGreaterThanOrEqual(6);
    ALL_SERVICES.forEach((service) => {
      expect(service.slug).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.scopeDeliverables.length).toBeGreaterThan(0);
    });
  });

  it('should have 4 distinct focus sectors with challenges and solutions', () => {
    expect(SECTORS).toHaveLength(4);
    const sectorSlugs = SECTORS.map((s) => s.slug);
    expect(sectorSlugs).toContain('food-beverage');
    expect(sectorSlugs).toContain('ecommerce');
    expect(sectorSlugs).toContain('restaurants');
    expect(sectorSlugs).toContain('education');

    SECTORS.forEach((sec) => {
      expect(sec.challenges.length).toBeGreaterThanOrEqual(2);
      expect(sec.cliksSolutions.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('should have valid case studies matching the specified schema', () => {
    expect(CASE_STUDIES.length).toBeGreaterThanOrEqual(2);
    CASE_STUDIES.forEach((cs) => {
      expect(cs.challenge).toBeTruthy();
      expect(cs.cliksRole).toBeTruthy();
      expect(cs.execution.length).toBeGreaterThanOrEqual(2);
      expect(cs.results.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('should include both MADAR and CLIK BI digital products', () => {
    expect(DIGITAL_PRODUCTS).toHaveLength(2);
    const productSlugs = DIGITAL_PRODUCTS.map((p) => p.slug);
    expect(productSlugs).toContain('madar');
    expect(productSlugs).toContain('clik-bi');
  });

  it('should have knowledge items with valid category and questions', () => {
    expect(KNOWLEDGE_ITEMS.length).toBeGreaterThanOrEqual(10);
    KNOWLEDGE_ITEMS.forEach((k) => {
      expect(k.question).toBeTruthy();
      expect(k.answer).toBeTruthy();
      expect(k.author).toBeTruthy();
      expect(k.reviewDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it('should include Mohak and Majarrah as strategic partners', () => {
    const partnerIds = STRATEGIC_PARTNERS.map((p) => p.id);
    expect(partnerIds).toContain('mohak-agency');
    expect(partnerIds).toContain('majarrah-agency');
  });

  it('should include Google Partner and SOSTAC® accreditations', () => {
    const accIds = ACCREDITATIONS.map((a) => a.id);
    expect(accIds).toContain('google-partner');
    expect(accIds).toContain('sostac-certified');
  });
});
