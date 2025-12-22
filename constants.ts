
import { Program, ProgramType, TeamMember, Testimonial, FAQItem } from './types';

export const PROGRAMS: Program[] = [
  {
    id: "nz1",
    title: "奧克蘭公立小學微留學 (Year 1-6)",
    country: "New Zealand",
    city: "Auckland",
    ageRange: "5-11 歲",
    duration: "4-8 週",
    price: "NT$ 85,000起",
    priceRangeNumeric: 85000,
    tags: ["純淨校園", "學伴制度", "家長陪讀"],
    type: ProgramType.SUMMER_CAMP,
    language: "English",
    image: "https://images.unsplash.com/photo-1578530332818-6ba472e67b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "體驗紐西蘭最純淨的啟發式教育，孩子將直接進入當地公立小學班級，與Kiwi同學共同學習、玩耍，快速建立英語自信。",
    highlights: ["100%當地學生比例", "專屬Buddy學伴帶領", "戶外探險課程", "家長友善陪讀環境"]
  },
  {
    id: "nz2",
    title: "皇后鎮極限冒險英語營 (Year 9-13)",
    country: "New Zealand",
    city: "Queenstown",
    ageRange: "13-18 歲",
    duration: "2-4 週",
    price: "NT$ 115,000起",
    priceRangeNumeric: 115000,
    tags: ["戶外體育", "自然景觀", "密集英語"],
    type: ProgramType.CULTURAL_TRIP,
    language: "English",
    image: "https://images.unsplash.com/photo-1589802829985-817e51171b92?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "在世界冒險之都皇后鎮，早上進行密集英語訓練，下午挑戰高空彈跳、噴射快艇與冰川健行。",
    highlights: ["世界級壯麗風景", "跨國友誼交流", "冒險運動主題", "口說能力大幅提升"]
  },
  {
    id: "nz3",
    title: "基督城中學升學長期計畫 (NCEA課程)",
    country: "New Zealand",
    city: "Christchurch",
    ageRange: "13-17 歲",
    duration: "1-3 學年",
    price: "NT$ 450,000起/年",
    priceRangeNumeric: 450000,
    tags: ["學術升學", "NCEA系統", "花園城市"],
    type: ProgramType.STUDY_ABROAD,
    language: "English",
    image: "https://images.unsplash.com/photo-1507699622177-38889b58527d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "基督城擁有悠久的英式教育傳統，我們精選多所學術表現優異的高中，協助學生銜接紐西蘭 NCEA 系統，目標直指八大名校。",
    highlights: ["完善國際生照顧體系", "優質寄宿家庭安排", "學科選擇多元", "受全球認可學歷"]
  },
  {
    id: "nz4",
    title: "奧克蘭大學學士/碩士銜接課程",
    country: "New Zealand",
    city: "Auckland",
    ageRange: "18 歲以上",
    duration: "1-4 年",
    price: "NT$ 650,000起/年",
    priceRangeNumeric: 650000,
    tags: ["全球百大", "職涯規劃", "技術移民"],
    type: ProgramType.STUDY_ABROAD,
    language: "English",
    image: "https://images.unsplash.com/photo-1498243639652-fca49f3f40d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "協助申請紐西蘭第一學府：奧克蘭大學。針對成績未達標者，提供快捷預科與大一銜接課程，畢業後可獲 3 年工作簽證。",
    highlights: ["八大名校專業諮詢", "PSW 工作簽證指導", "高含金量學歷", "就業力分析"]
  },
  {
    id: "nz5",
    title: "威靈頓設計與電影藝術學院遊學",
    country: "New Zealand",
    city: "Wellington",
    ageRange: "16 歲以上",
    duration: "12-24 週",
    price: "NT$ 220,000起",
    priceRangeNumeric: 220000,
    tags: ["藝術設計", "電影特效", "創意首都"],
    type: ProgramType.LANGUAGE_SCHOOL,
    language: "English",
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "在魔戒特效家鄉——威靈頓，學習英語並體驗世界頂尖的數位媒體與影視設計氛圍。",
    highlights: ["參訪 Weta Workshop", "結合設計工作坊", "濃厚藝術人文息", "城市便利生活"]
  },
  {
    id: "nz6",
    title: "羅托路亞毛利文化親子遊學",
    country: "New Zealand",
    city: "Rotorua",
    ageRange: "5-15 歲 & 家長",
    duration: "2-4 週",
    price: "NT$ 180,000起",
    priceRangeNumeric: 180000,
    tags: ["文化體驗", "溫泉地熱", "親子共學"],
    type: ProgramType.PARENT_CHILD,
    language: "English",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "家長與孩子共同探索毛利文化之鄉。孩子入讀當地學校，家長參加成人英文班或體驗豐富的地熱溫泉與原住民文化之旅。",
    highlights: ["傳統毛利舞蹈體驗", "大自然地理教室", "親子友善住宿", "放鬆舒壓環境"]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "t1",
    name: "Sarah Lin",
    role: "紐西蘭資深顧問",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    languages: ["中文", "English"],
    experience: "12年紐西蘭留學代辦經驗",
    specialty: "中小學微留學、NCEA學制規劃"
  },
  {
    id: "t2",
    name: "James Cook",
    role: "奧克蘭辦公室負責人",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    languages: ["English"],
    experience: "當地安置服務8年",
    specialty: "住宿家庭媒合、當地生活支援"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "tes1",
    name: "王小明",
    ageCountry: "14歲 / 奧克蘭中學",
    programType: "High School",
    content: "紐西蘭的老師非常注重個人特質，我不再需要為了考試而讀書。這裡的 NCEA 系統讓我選到自己喜歡的攝影與設計課。顧問Sarah姊姊幫我選的學校校園超美，簡直像在電影裡生活！",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "tes2",
    name: "陳媽媽",
    ageCountry: "基督城親子遊學",
    programType: "Parent-Child",
    content: "基督城真的是花園城市，孩子在小學裡每天都很開心。我們在那裡認識了當地的Kiwi家庭，週末還一起去滑雪。這段回憶對孩子一生的影響非常大，特別感謝點石團隊的細心安排。",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  }
];

export const FAQS: FAQItem[] = [
  {
    category: "簽證",
    question: "去紐西蘭遊學需要辦簽證嗎？",
    answer: "持台灣護照進入紐西蘭可享有 90 天免簽證待遇。若就讀課程超過 3 個月，則需申請正式學生簽證。我們顧問會全程協助辦理。"
  },
  {
    category: "學制",
    question: "什麼是 NCEA？與 IB 有什麼不同？",
    answer: "NCEA 是紐西蘭國家教育成績證書，是紐西蘭高中生的主要學歷。它強調平時表現與多元發展。許多紐西蘭高中也同時提供 IB 課程，適合有計畫申請英美名校的學生。"
  }
];

export const SOP_STEPS = [
  { title: "專業諮詢", desc: "了解學生興趣與特質" },
  { title: "學校篩選", desc: "精選適合的 NZ 校園" },
  { title: "送件申請", desc: "協助準備申請文件" },
  { title: "簽證保險", desc: "一站式行政代辦" },
  { title: "行前輔導", desc: "紐西蘭生活大補帖" },
  { title: "抵達安置", desc: "當地辦公室接機與安置" }
];
