export interface DashboardData {
  counts: {
    totalPosts: number | string;
    publishedPosts: number | string;
    draftPosts: number | string;
    categories: number | string;
  };
  contentStats?: {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    categories: number;
    authors: number;
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
