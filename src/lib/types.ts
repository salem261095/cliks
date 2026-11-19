export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  group: 'strategy' | 'performance' | 'creative' | 'digital';
  shortDescription: string;
  fullDescription: string;
  scopeDeliverables: string[];
  deliverablesSummary: string;
  iconName?: string;
  relatedCaseSlugs?: string[];
}

export interface ServiceGroup {
  id: 'strategy' | 'performance' | 'creative' | 'digital';
  title: string;
  tagline: string;
  description: string;
  items: ServiceItem[];
}

export interface SectorItem {
  id: string;
  slug: string;
  title: string;
  headline: string;
  summary: string;
  challenges: string[];
  cliksSolutions: string[];
  keyOutcomes: string[];
  clientCountPlaceholder: string;
  badge?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  sectorSlug: string;
  sectorName: string;
  serviceGroup: string;
  servicesProvided: string[];
  summary: string;
  challenge: string;
  cliksRole: string;
  execution: string[];
  deliverables: string[];
  results: {
    label: string;
    value: string;
    period: string;
    isVerified: boolean;
  }[];
  testimonial?: {
    quote: string;
    authorName: string;
    authorRole: string;
    company: string;
  };
  featured: boolean;
}

export interface DigitalProduct {
  id: string;
  slug: string;
  name: string;
  englishName: string;
  headline: string;
  description: string;
  targetAudience: string;
  features: {
    title: string;
    description: string;
  }[];
  benefits: string[];
  status: 'available' | 'early_access' | 'demo';
  ctaText: string;
}

export interface KnowledgeItem {
  id: string;
  slug: string;
  category: 'sostac_strategy' | 'performance_ads' | 'ecommerce_stores' | 'google_maps_seo' | 'analytics_bi' | 'cliks_offerings';
  categoryLabel: string;
  question: string;
  answer: string;
  author: string;
  reviewDate: string;
  tags: string[];
  relatedQuestionIds?: string[];
}

export interface PartnerItem {
  id: string;
  name: string;
  type: 'agency_partner' | 'accreditation';
  role: string;
  description: string;
  benefitToClient: string;
  badgeText?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  portrait?: string;
  specialization: string;
  credentials: string[];
  bio: string;
  isLeadership: boolean;
}
