
import { Program, TeamMember, Testimonial, FAQItem } from '../types';
import { PROGRAMS, TEAM_MEMBERS, TESTIMONIALS, FAQS } from '../constants';

// NOTE: When you are ready to connect to Firebase:
// 1. Uncomment the imports below
// 2. Set USE_MOCK to false
// 3. Fill in the logic inside the 'else' blocks

// import { collection, getDocs, doc, getDoc, addDoc, query, where } from 'firebase/firestore';
// import { db } from '../firebaseConfig';

const USE_MOCK = true;

export const DataService = {
  // --- Programs ---
  getPrograms: async (): Promise<Program[]> => {
    if (USE_MOCK) {
       // Simulate network delay
       return new Promise((resolve) => setTimeout(() => resolve(PROGRAMS), 600));
    } else {
       // Firebase Example:
       // const querySnapshot = await getDocs(collection(db, "programs"));
       // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Program));
       return [];
    }
  },

  getProgramById: async (id: string): Promise<Program | undefined> => {
    if (USE_MOCK) {
        return new Promise((resolve) => setTimeout(() => resolve(PROGRAMS.find(p => p.id === id)), 400));
    } else {
        // Firebase Example:
        // const docRef = doc(db, "programs", id);
        // const docSnap = await getDoc(docRef);
        // if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() } as Program;
        return undefined;
    }
  },

  // --- Testimonials ---
  getTestimonials: async (): Promise<Testimonial[]> => {
    if (USE_MOCK) return new Promise((resolve) => setTimeout(() => resolve(TESTIMONIALS), 500));
    else {
        // const querySnapshot = await getDocs(collection(db, "testimonials"));
        // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
        return [];
    }
  },

  // --- Team ---
  getTeamMembers: async (): Promise<TeamMember[]> => {
     if (USE_MOCK) return new Promise((resolve) => setTimeout(() => resolve(TEAM_MEMBERS), 500));
     else return [];
  },

  // --- FAQs ---
  getFAQs: async (): Promise<FAQItem[]> => {
      if (USE_MOCK) return new Promise((resolve) => setTimeout(() => resolve(FAQS), 300));
      else return [];
  },

  // --- Forms ---
  submitBooking: async (data: any): Promise<void> => {
      console.log("Submitting booking to DB:", data);
      if (USE_MOCK) return new Promise((resolve) => setTimeout(() => resolve(), 1500));
      else {
          // await addDoc(collection(db, "bookings"), {
          //   ...data,
          //   createdAt: new Date()
          // });
      }
  },
  
  submitContact: async (data: any): Promise<void> => {
      console.log("Submitting contact msg to DB:", data);
      if (USE_MOCK) return new Promise((resolve) => setTimeout(() => resolve(), 1000));
      else {
           // await addDoc(collection(db, "contacts"), { ...data, createdAt: new Date() });
      }
  }
};
