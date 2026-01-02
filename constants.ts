
import { Program, ProgramType, TeamMember, Testimonial, FAQItem, NewsItem, Article } from './types';

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "n1",
    date: "2024.05.20",
    category: "講座",
    title: "2024 紐西蘭公立中小學微留學說明會",
    summary: "想了解孩子如何無縫銜接紐西蘭教育？資深顧問將分享最新插班名額。",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    content: "這是一場針對台灣家長特別設計的說明會。我們邀請到了來自紐西蘭奧克蘭教育局的代表，線上分享當地學校的學伴制度 (Buddy System) 以及插班生如何快速融入課程。現場也會由點石顧問展示如何申請家長陪讀簽證，並解答所有關於住宿與交通的疑慮。\n\n活動時間：2024年6月15日 (六) 14:00-16:00\n地點：台北 101 大樓 37 樓會議室"
  },
  {
    id: "n2",
    date: "2024.05.15",
    category: "公告",
    title: "奧克蘭大學 2024 秋季入學申請截止提醒",
    summary: "提醒有意申請八大名校的同學，請於本月底前提交完整文件以利作業。",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    content: "奧克蘭大學作為紐西蘭排名第一的高等學府，今年的商學院與工學院申請競爭非常激烈。請所有正在準備申請文件的同學注意，最後截止日期為本月底。若您的雅思成績尚未達標，可與點石顧問聯繫，了解是否符合條件先申請『條件式入學』並銜接 LPP 課程。"
  },
  {
    id: "n3",
    date: "2024.05.10",
    category: "優惠",
    title: "早鳥專案：冬令營現折 NT$ 5,000",
    summary: "提早規劃孩子的寒假旅程，享受點石專屬早鳥優惠，名額有限。",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    content: "為了鼓勵家長提早進行長期教育規劃，點石特別推出 2024 冬令營早鳥優惠。只要在 6 月 30 日前完成報名與繳訂，即可享有每位學員折抵新台幣 5,000 元的優惠。此專案適用於所有紐西蘭南島與北島的微留學插班方案。"
  }
];

export const ARTICLES: Article[] = [
  {
    id: "art1",
    title: "留學、遊學、微留學？一表看懂你的孩子適合哪一種",
    summary: "許多家長在諮詢時的第一個問題就是：『這三者到底有什麼差別？』點石為您整理了詳盡的學制對照與預算分析。",
    category: "趨勢分析",
    tags: ["教育規劃", "懶人包", "學制對照"],
    publishDate: "2024.05.12",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80",
    content: "許多家長在諮詢時的第一個問題就是：『這三者到底有什麼差別？』\n\n**留學** 通常指長期獲取學位，目標是當地的學歷認證與長期的學術發展；**遊學** 則偏重語言能力的密集提升與文化探索，時長約 1-3 個月；而我們主打的 **微留學**，則是讓孩子在短時間內（2-8週）直接進入當地班級插班，體驗最真實的學伴制度與生活節奏...\n\n選擇的關鍵在於孩子的適應力與家庭的長期預算規劃..."
  },
  {
    id: "art2",
    title: "學員心得：在基督城的那四週，我學會了如何獨自探險",
    summary: "『剛下飛機時，我甚至不敢對海關開口。』15 歲的阿翰分享他在南島花園城市基督城的奇幻成長之旅。",
    category: "學員心得",
    tags: ["基督城", "青少年遊學", "自主成長"],
    publishDate: "2024.05.05",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1510172951991-856a654063f9?w=800&q=80",
    content: "『剛下飛機時，我甚至不敢對海關開口。』15 歲的阿翰回憶起這段旅程的開始。\n\n透過點石安排的 LPP 課程，阿翰在出發前雖然已經做了心理建設，但實際抵達基督城時，異國的空氣與完全不同的學制仍讓他感到震撼。然而，透過當地 Buddy（學伴）的帶領，他從不敢點餐，到最後能與宿霧家庭討論當地的環保政策..."
  },
  {
    id: "art3",
    title: "紐西蘭 NCEA 系統完全解析：為什麼它能培養出最具創造力的學生？",
    summary: "不同於台灣的一試定生死，紐西蘭的 NCEA 系統更強調平時的學習產出。這篇文章將帶您深入了解評分邏輯。",
    category: "攻略",
    tags: ["NCEA", "紐西蘭教育", "升學指引"],
    publishDate: "2024.04.28",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    content: "不同於台灣的一試定生死，紐西蘭的 NCEA (National Certificate of Educational Achievement) 系統更強調平時的學習產出與實作評量。這篇文章將帶您深入了解 Level 1 到 Level 3 的評分邏輯，以及它如何銜接全球頂尖大學..."
  }
];

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
    type: ProgramType.MICRO_STUDY,
    language: "English",
    image: "https://images.unsplash.com/photo-1578530332818-6ba472e67b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578530332818-6ba472e67b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    ],
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
    type: ProgramType.LANGUAGE_SCHOOL,
    language: "English",
    image: "https://images.unsplash.com/photo-1589802829985-817e51171b92?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1589802829985-817e51171b92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    ],
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
    gallery: [
      "https://images.unsplash.com/photo-1507699622177-38889b58527d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    ],
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
    gallery: [
      "https://images.unsplash.com/photo-1498243639652-fca49f3f40d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    ],
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
    gallery: [
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    ],
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
    gallery: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    ],
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
