
import { Program, TeamMember, Testimonial, FAQItem, NewsItem, Article } from '../types';
import { PROGRAMS, TEAM_MEMBERS, TESTIMONIALS, FAQS, NEWS_ITEMS, ARTICLES } from '../constants';

const USE_MOCK = true;

export const DataService = {
  // --- Programs ---
  getPrograms: async (): Promise<Program[]> => {
    if (USE_MOCK) return new Promise((resolve) => setTimeout(() => resolve(PROGRAMS), 600));
    return [];
  },

  getProgramById: async (id: string): Promise<Program | undefined> => {
    if (USE_MOCK) return new Promise((resolve) => setTimeout(() => resolve(PROGRAMS.find(p => p.id === id)), 400));
    return undefined;
  },

  // --- News ---
  getNews: async (): Promise<NewsItem[]> => {
    if (USE_MOCK) return new Promise((resolve) => setTimeout(() => resolve(NEWS_ITEMS), 300));
    return [];
  },

  // --- Articles ---
  getArticles: async (category?: string): Promise<Article[]> => {
    if (USE_MOCK) {
       let data = ARTICLES;
       if (category) data = ARTICLES.filter(a => a.category === category);
       return new Promise((resolve) => setTimeout(() => resolve(data), 500));
    }
    return [];
  },

  getArticleById: async (id: string): Promise<Article | undefined> => {
    if (USE_MOCK) return new Promise((resolve) => setTimeout(() => resolve(ARTICLES.find(a => a.id === id)), 400));
    return undefined;
  },

  // --- Other ---
  getTestimonials: async (): Promise<Testimonial[]> => {
    if (USE_MOCK) return new Promise((resolve) => setTimeout(() => resolve(TESTIMONIALS), 500));
    return [];
  },

  getTeamMembers: async (): Promise<TeamMember[]> => {
     if (USE_MOCK) return new Promise((resolve) => setTimeout(() => resolve(TEAM_MEMBERS), 500));
     return [];
  },

  getFAQs: async (): Promise<FAQItem[]> => {
      if (USE_MOCK) return new Promise((resolve) => setTimeout(() => resolve(FAQS), 300));
      return [];
  },

  submitBooking: async (data: any): Promise<void> => {
      console.log("Submitting booking to DB:", data);
      if (USE_MOCK) return new Promise((resolve) => setTimeout(() => resolve(), 1500));
  },
  
  submitContact: async (data: any): Promise<void> => {
      console.log("Submitting contact msg to DB:", data);
      if (USE_MOCK) return new Promise((resolve) => setTimeout(() => resolve(), 1000));
  }
};
