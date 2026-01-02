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
  gallery?: string[]; // Optional array of additional images
  description: string;
  highlights: string[];
  language: string;
}

export enum ProgramType {
  SUMMER_CAMP = "Summer Camp",
  WINTER_CAMP = "Winter Camp",
  LANGUAGE_SCHOOL = "Language School",
  STUDY_ABROAD = "Study Abroad",
  CULTURAL_TRIP = "Cultural Trip",
  PARENT_CHILD = "Parent-Child",
  MICRO_STUDY = "Micro Study" // 新增微留學類型
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