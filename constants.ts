
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
    id: "nz-long-term-1",
    title: "Northcote College 諾思科特中學",
    country: "New Zealand",
    city: "奧克蘭北岸 (North Shore)",
    ageRange: "13-18 歲 (Year 9-13)",
    duration: "1 year+",
    price: "洽詢顧問",
    priceRangeNumeric: 400000,
    tags: ["1877年建校", "3%超低華人比例", "純淨英語語境"],
    type: ProgramType.LONG_TERM,
    language: "English",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80",
    description: "創立於 1877 年，奧克蘭北岸歷史最悠久的公立中學。以極低的華人留學生比例（僅 3%）著稱。擁有 147 年悠久歷史，校風穩健傳統，特別在藝術、音樂與商科領域擁有極高聲譽。",
    highlights: ["147 年傳統公立名校", "全校僅 3% 華人比例，強化語言沉浸", "專業學伴制度 (Buddy System) 領航", "美國排名第二芝加哥藝術學院獎學金錄取案例"],
    subjects: ["藝術/音樂", "商科/經濟"]
  },
  {
    id: "nz-short-term-1",
    title: "奧克蘭海洋探索夏季遊學營",
    country: "New Zealand",
    city: "奧克蘭",
    ageRange: "10-17 歲",
    duration: "2 weeks",
    price: "洽詢顧問",
    priceRangeNumeric: 120000,
    tags: ["寒暑假限定", "英語實戰", "戶外探索"],
    type: ProgramType.SHORT_TERM,
    language: "English",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    description: "結合英語課程與紐西蘭獨特的海洋戶外活動。學生將在帆船、衝浪與生態探索中學習生活英語，是開啟國際視野的最佳短期方案。",
    highlights: ["專業教練陪同水上活動", "沉浸式主題工作坊", "寄宿家庭真實文化體驗"],
    subjects: ["戶外教育", "生活英語"]
  },
  {
    id: "nz-micro-study-1",
    title: "紐西蘭全真課堂插班微留學",
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
    description: "孩子直接進入紐西蘭公立學校班級，與當地同學同步上課。體驗正式海外學籍與成績單。課程包含特邀奧運冠軍指導的水上救生訓練。",
    highlights: ["領取官方結業成績單", "一對一學伴制度 (Buddy)", "家長可同步安排高爾夫或烘焙課程"],
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
