export interface BaseSEO {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  ogImage?: string;
  status: "draft" | "published";
  lastUpdated?: string;
}

export interface SectionSEO extends BaseSEO {
  mainHeading: string;
  description: string;
}

export interface HeroSEO extends BaseSEO {
  mainHeading: string;
  highlightedWord: string;
  topLabel: string;
  description: string;
  primaryCTAText: string;
  primaryCTALink: string;
  secondaryCTAText: string;
  secondaryCTALink: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQSectionSEO extends SectionSEO {
  faqs: FAQItem[];
}

export interface ServicePageSEO extends HeroSEO {
  content: string;
}

export interface HomepageSEOData {
  hero: HeroSEO;
  ecosystem: SectionSEO;
  selectedWorks: SectionSEO;
  clientVoices: SectionSEO;
  faq: FAQSectionSEO;
}

export interface AboutPageSEO extends HeroSEO {
  content: string;
}

export interface ContactPageSEO extends HeroSEO {
  content: string;
}

export interface CaseStudyPageSEO extends BaseSEO {
  mainHeading: string;
  highlightedWord: string;
  topLabel: string;
  description: string;
}
