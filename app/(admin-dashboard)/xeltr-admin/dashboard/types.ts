export interface DashboardData {
  counts: {
    blogs: number;
    caseStudies: number;
    testimonials: number;
    seo: number;
  };
  seoHealth: {
    score: number;
    indexedPages: number;
    brokenLinks: number;
    topKeywords: string[];
  };
  performance: {
    lcp: string;
    cls: string;
  };
  traffic: {
    totalViews: number;
    uniqueVisitors: number;
    bounceRate: string;
    avgSession: string;
  };
  security: {
    recentLogins: { name: string; time: string; ip: string }[];
  };
  marketing: {
    leads: number;
    conversionRate: string;
    activeLandingPages: number;
  };
  recentContent: {
    type: "BLOG" | "TESTIMONIAL" | "CASESTUDY";
    title: string;
    date: string;
    status: string;
  }[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}
