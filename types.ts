
export interface Program {
  id: string;
  title: string;
  country: string;
  city: string;
  ageRange: string;
  duration: string;
  price: string;
  priceRangeNumeric: number;
  tags: string[];
  type: ProgramType;
  image: string;
  gallery?: string[];
  description: string;
  highlights: string[];
  language: string;
  subjects?: string[];
}

export enum ProgramType {
  LONG_TERM = "長期留學",
  SHORT_TERM = "短期遊學",
  MICRO_STUDY = "微留學"
}

export interface NewsItem {
  id: string;
  date: string;
  category: '公告' | '講座' | '優惠' | '重要';
  title: string;
  summary: string;
  content?: string;
  image?: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: '趨勢分析' | '學員心得' | '生活指南' | '攻略';
  tags: string[];
  publishDate: string;
  readTime: string;
  image: string;
  content: string;
  author?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  languages: string[];
  experience: string;
  specialty: string;
}

export interface Testimonial {
  id: string;
  name: string;
  ageCountry: string;
  programType: string;
  content: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
