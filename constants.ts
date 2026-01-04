
import { Program, ProgramType, TeamMember, Testimonial, FAQItem, NewsItem, Article } from './types';

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "n1",
    date: "2025.05.21",
    category: "公告",
    title: "點石遊學官方網站正式上線！",
    summary: "歡迎關注我們的 LINE 官方帳號 (@647loexf)，獲取即時一對一諮詢服務。我們致力於為每一位學員提供最專業的紐西蘭教育規劃。",
    content: "點石遊學國際官方網站正式與大家見面了！為了提供更即時的服務，我們同步開通了 LINE 官方帳號，歡迎點擊頁面上的 LINE 圖標或搜尋 ID: @647loexf 加入我們。透過官網，您可以更直觀地了解我們的選課指南、學制百科以及精選方案。"
  }
];

export const ARTICLES: Article[] = [
  {
    id: "art1",
    title: "為什麼 ACG 集團能維持 100% 的 A-Level 通過率？",
    summary: "深入解析劍橋 CIE 體系在紐西蘭的教學優勢與頂尖大學銜接實錄。",
    category: "趨勢分析",
    tags: ["ACG", "CIE", "大學銜接"],
    publishDate: "2024.05.12",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80",
    content: "ACG 學術教育集團是紐西蘭最大的優質私立教育機構..."
  }
];

export const PROGRAMS: Program[] = [
  {
    id: "nz-northcote",
    title: "Northcote College 諾思科特中學",
    country: "New Zealand",
    city: "奧克蘭北岸 (North Shore)",
    ageRange: "13-18 歲 (Year 9-13)",
    duration: "1 year+",
    price: "洽詢顧問",
    priceRangeNumeric: 400000,
    tags: ["1877年建校", "3%超低華人比例", "純淨英語語境"],
    type: ProgramType.STUDY_ABROAD,
    language: "English",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80",
    description: "創立於 1877 年，奧克蘭北岸歷史最悠久的公立中學。以極低的華人留學生比例（僅 3%）著稱。擁有 147 年悠久歷史，校風穩健傳統，特別在藝術、音樂與商科領域擁有極高聲譽。",
    highlights: ["147 年傳統公立名校", "全校僅 3% 華人比例，強化語言沉浸", "專業學伴制度 (Buddy System) 領航", "美國排名第二芝加哥藝術學院獎學金錄取案例"],
    subjects: ["藝術/音樂", "商科/經濟"]
  },
  {
    id: "nz-acg-group",
    title: "ACG Schools 頂尖私立學術集團",
    country: "New Zealand",
    city: "奧克蘭 / 陶朗加",
    ageRange: "5-18 歲 (Year 1-13)",
    duration: "1 year+",
    price: "洽詢顧問",
    priceRangeNumeric: 900000,
    tags: ["100% A-Level通過率", "劍橋CIE系統", "全球百大名校跳板"],
    type: ProgramType.STUDY_ABROAD,
    language: "English",
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=1200&q=80",
    description: "紐西蘭最大的優質私立教育集團。旗下包含 Parnell、Strathallan、Sunderland 與 Tauranga 校區。採用劍橋大學國際考試系統 (CIE)，A-Level 通過率維持 100%，並多次榮獲劍橋國際卓越獎項。",
    highlights: ["100% A-Level 考取通過率", "劍橋 CIE 全球第一/紐西蘭第一成就獎", "小學至高中一站式精進教育", "高達 $75,000 的創始人獎學金計劃"],
    subjects: ["科學/數位", "商科/經濟"]
  },
  {
    id: "nz-western-springs",
    title: "Western Springs College 西泉中學",
    country: "New Zealand",
    city: "奧克蘭中區 (Central)",
    ageRange: "13-17 歲 (Year 9-13)",
    duration: "1 academic year",
    price: "洽詢顧問",
    priceRangeNumeric: 450000,
    tags: ["無校服自由校風", "NCEA卓越成績", "獲獎現代建築"],
    type: ProgramType.STUDY_ABROAD,
    language: "English",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&q=80",
    description: "奧克蘭享譽盛名的頂尖公立中學。以自由開放的校風著稱，學生無需穿著校服。NCEA 統考成績連續多年位居全國前列，擁有現代化開放式教學空間與專業的藝術傳媒教室。",
    highlights: ["全國 NCEA 指標性優異公立校", "獨特『無校服』傳統，尊重學生自主性", "資深華人教育主任 Joanne Qiao 親自駐校", "全方位現代化課程：電影、傳媒、設計、數位技術"],
    subjects: ["傳媒/設計", "藝術/音樂", "科學/數位"]
  },
  {
    id: "nz-long-bay",
    title: "Long Bay College 朗貝中學",
    country: "New Zealand",
    city: "奧克蘭北岸海灣區",
    ageRange: "13-18 歲 (Year 9-13)",
    duration: "1 semester",
    price: "洽詢顧問",
    priceRangeNumeric: 380000,
    tags: ["海灣環境", "獨家海洋運動", "Care Create Excel"],
    type: ProgramType.STUDY_ABROAD,
    language: "English",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    description: "位於奧克蘭最美海灣區，鄰近自然保護區。校訓 Care, Create, Excel 體現在其卓越的藝術與戶外教育中。提供獨特的帆船、立槳 (SUP)、衝浪等海洋探險課程。",
    highlights: ["鄰近海灘的頂級自然校園環境", "頂尖攝影、視覺設計與表演藝術中心", "豐富的戶外運動：帆船、皮划艇、山地車", "專業國際生安置團隊，極致的生活關懷"],
    subjects: ["傳媒/設計", "藝術/音樂", "戶外教育"]
  },
  {
    id: "nz-micro-study",
    title: "紐西蘭全真課堂微留學體驗營",
    country: "New Zealand",
    city: "奧克蘭 / 基督城",
    ageRange: "5-18 歲 (Year 1-13)",
    duration: "2 weeks - 8 weeks",
    price: "洽詢顧問",
    priceRangeNumeric: 150000,
    tags: ["正式學籍插班", "學伴制度", "親子共讀"],
    type: ProgramType.MICRO_STUDY,
    language: "English",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
    description: "孩子直接進入紐西蘭公立學校班級，與當地同學同步上課。體驗正式海外學籍與成績單。課程包含特邀奧運冠軍指導的水上救生訓練，並為陪讀家長提供興趣或語言課程。",
    highlights: ["領取官方結業成績單，建立海外正式學籍", "一對一學伴制度 (Buddy)，快速融入生活", "獨家水上安全培訓課程 (Olympic Coach)", "家長可同步安排高爾夫、烘焙或語言課程"],
    subjects: ["全真插班", "戶外教育"]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "t1",
    name: "Joanne Qiao",
    role: "資深教育顧問 (駐紐)",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    languages: ["中文", "English"],
    experience: "20年紐西蘭教育管理經驗",
    specialty: "精通中新教育系統、公立/私校申請策略"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "tes1",
    name: "Angela Li",
    ageCountry: "17歲 / Northcote College",
    programType: "長期留學",
    content: "在 Northcote 的四年是我人生最棒的決定。老師非常支持我的創意，讓我拿到了芝加哥藝術學院的獎學金！",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80"
  }
];

export const FAQS: FAQItem[] = [
  {
    category: "學制",
    question: "孩子幾歲可以去紐西蘭讀書？",
    answer: "紐西蘭 5 歲當天即可入學 (Year 1)，不須等到開學日。小學為 Year 1-6，中學為 Year 9-13。"
  }
];

export const SOP_STEPS = [
  { title: "需求諮詢", desc: "深度訪談，了解學員特質與目標" },
  { title: "精準配對", desc: "根據預算與偏好推薦最適合校園" },
  { title: "文件代辦", desc: "全程協助成績單、自傳與簽證申請" },
  { title: "行前特訓", desc: "獨家 LPP 語言與心理適應指導" },
  { title: "落地安置", desc: "奧克蘭辦公室接機、宿舍安置與守護" }
];
