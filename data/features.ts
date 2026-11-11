export interface Feature {
  id: number
  area: string
  prefecture: string
  university: string
  department: string
  tags: string[]
  title: string
  subtitle: string
  description: string
  references: { label: string; url: string }[]
  theme: "holy-land" | "innovator" | "intelligence" | "agility" | "connectivity"
}

export const features: Feature[] = [
  {
    id: 1,
    area: "中部",
    prefecture: "愛知県",
    university: "藤田医科大学",
    department: "総合消化器外科学",
    tags: ["手術トレーニング", "ロボット支援手術"],
    title: "3機種の手術支援ロボットを学ぶ拠点",
    subtitle: "",
    description: `ダビンチ、hinotori、Hugoのトレーニング施設が同じ拠点にあります。医療従事者が手術支援ロボットの操作を学ぶ環境を整えています。`,
    references: [
      { label: "藤田医科大学病院「ロボット支援手術」", url: "https://hospital.fujita-hu.ac.jp/about/feature/roboticsurgery.html" },
      { label: "藤田医科大学「医療ロボット・AIの実践」", url: "https://fhu.jp/robot_ai.html" },
    ],
    theme: "holy-land",
  },
  {
    id: 2,
    area: "東京",
    prefecture: "東京都",
    university: "東京科学大学",
    department: "消化管外科学分野（旧医科歯科大）",
    tags: ["Saroa", "医工連携", "力覚フィードバック"],
    title: "鉗子にかかる力を術者に伝える「Saroa」",
    subtitle: "",
    description: `旧・東京医科歯科大学と旧・東京工業大学は、リバーフィールドと手術支援ロボット「Saroa」を共同開発しました。空気圧駆動を利用して、鉗子にかかる力を術者に伝える機能を備えています。`,
    references: [
      { label: "東京科学大学 共同開発に関する公表資料", url: "https://www.tmd.ac.jp/files/topics/60014_ext_04_6.pdf" },
      { label: "リバーフィールド「Saroa」製品資料", url: "https://www.riverfieldinc.com/files/upload/Saroa_catalog.pdf" },
    ],
    theme: "innovator",
  },
  {
    id: 3,
    area: "東京",
    prefecture: "東京都",
    university: "東京大学",
    department: "肝胆膵外科・人工臓器移植外科",
    tags: ["手術映像解析", "AI研究"],
    title: "手術映像から、術中の注視点を推定する研究",
    subtitle: "",
    description: `東京大学では、手術映像に映る器具を深層学習で識別し、その情報から術中の注視点を推定する手法を研究しました。`,
    references: [
      { label: "科研費 研究課題 23K17224", url: "https://kaken.nii.ac.jp/grant/KAKENHI-PROJECT-23K17224/" },
    ],
    theme: "intelligence",
  },
  {
    id: 4,
    area: "関東",
    prefecture: "埼玉県",
    university: "埼玉医科大学",
    department: "国際医療センター（消化器外科）",
    tags: ["da Vinci 5", "フォースフィードバック", "低侵襲手術"],
    title: "THE AGILITY",
    subtitle: "埼玉医大が国内最速の稼働と発表。2025年7月22日、da Vinci 5 で大腸がん手術2例を実施",
    description: `埼玉医科大学国際医療センターは、手術支援ロボット『da Vinci 5』を導入し、2025年7月22日に消化器外科で大腸がん手術2例を実施しました。埼玉医大は、この稼働開始を国内で最も早いものと発表しています。da Vinci 5 はシリーズで初めて力覚（フォースフィードバック）を搭載し、従来機の4倍の解像度と、AIによる手術データの解析機能を備えます。日本は米国、韓国に次ぐ3番目の導入国でした。`,
    references: [
      { label: "埼玉医大ニュース - da Vinci 5導入", url: "https://www.saitama-med.ac.jp/news/nid00000616.html" },
    ],
    theme: "agility",
  },
  {
    id: 5,
    area: "東京",
    prefecture: "東京都",
    university: "慶應義塾大学",
    department: "一般・消化器外科（上部消化管班）",
    tags: ["生成AI", "手術教育", "手術映像"],
    title: "手術映像から、外科医の判断を学ぶ。",
    subtitle: "",
    description: `この血管は何か。いま行われている操作には、どんな理由があるのか。慶應義塾大学病院 一般・消化器外科（上部消化管班）の外科医と、慶應義塾大学医学部発のスタートアップ Direava（ディリーバ）は、手術映像から術野の構造や操作の背景を言葉で説明する生成AI「Surgical VLM」の研究開発に取り組んでいます。2026年2月20日には同院の胃がん手術で実証試験を行い、AIが生成した説明は解剖学的正確性84.7%、臨床的有用性82.9%、文章の流暢性97.4%と、医療教育の要求水準とされた80%以上を満たしました。ディリーバは、まず手術教育への活用を目指し、2026年中の事業化を目標にしています。`,
    references: [
      { label: "慶應義塾大学 外科学教室（一般・消化器外科）", url: "https://www.surgery-med-keio.jp/" },
      { label: "経産省 GENIAC 共創事例", url: "https://geniac.meti.go.jp/geniac_magazine/usecase_03.html" },
      { label: "NEDO・Direava 実証発表", url: "https://www.nedo.go.jp/news/press/AA5_101924.html" },
    ],
    theme: "intelligence",
  },
]

export const allFeatureTags = Array.from(
  new Set(features.flatMap((f) => f.tags))
)
