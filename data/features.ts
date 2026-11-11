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
    tags: ["daVinci5", "日本初導入", "埼玉医大", "最新鋭ロボット", "低侵襲手術", "フォースフィードバック"],
    title: "THE AGILITY",
    subtitle: "国内最速を患者のために。最新鋭『da Vinci 5』日本初導入",
    description: `【圧倒的な機動力：最新こそが最善】
埼玉医科大学国際医療センターには、世界中から視察が絶えません。その最大の理由は、世界最新鋭の手術支援ロボット『da Vinci 5』を日本で最も早く臨床導入したことにあります。2024年3月の米国発表から約1年4か月後の2025年7月に国内最速で稼働を開始したそのスピード感は、患者に一刻も早く最善の治療を届けたいという情熱の表れ。既存の技術に安住せず、常に世界のフロントランナーであり続ける姿勢が、ここを高度医療の砦たらしめています。

【低侵襲手術の新境地：異次元の没入感】
『da Vinci 5』の実装により、手術の精度は次の次元へと引き上げられました。最大の変化は、力覚（フォースフィードバック）の実装。組織を牽引する際にかかる負荷を数値と感覚で把握できるようになったことで、組織へのダメージを極限まで低減し、術後回復を劇的に早めました。最新のセンサー技術と高精細な没入型3D映像により、外科医はまるで患者の体内に入り込んだかのような感覚で、究極の根治手術を追求できます。

【「ファースト・ペンギン」としての教育的使命】
単に最新機器を導入するだけでなく、その「使いこなし」を全国へ広める役割も担っています。日本初の次世代機ユーザーとして、全国から集まる見学医に対し、最新テックを用いた「安全な最短導入法」を伝授。世界最先端の機器開発に日本の臨床知を反映させるフィードバック・ループの起点としても機能しています。`,
    references: [
      { label: "埼玉医大ニュース - da Vinci 5導入", url: "https://www.saitama-med.ac.jp/news/nid00000616.html" },
      { label: "埼玉医大ニュース - 詳細", url: "https://www.saitama-med.ac.jp/news/nid00000649.html" },
      { label: "国際医療センター ニュース", url: "https://www.international.saitama-med.ac.jp/news/news-17668/" },
      { label: "消化器外科", url: "https://www.saitama-med.ac.jp/international/section/cancer/ge-surgery.html" },
    ],
    theme: "agility",
  },
  {
    id: 5,
    area: "東京",
    prefecture: "東京都",
    university: "慶應義塾大学",
    department: "一般・消化器外科学",
    tags: ["慶應外科"],
    title: "THE CONNECTIVITY",
    subtitle: "国境なき外科教育。3D画像が拓く術前計画の新世界",
    description: `【物理的な「場所」を無効化するデジタル戦略】
慶應義塾大学は、外科医療における「距離」と「時間」の概念を根底から変えようとしています。伝統ある外科医局としての矜持を持ちつつ、その手法は極めてアバンギャルド。ここには物理的な移動に縛られる「20世紀型の医療」の姿はありません。

【3D画像による術前リハーサル】
慶應では、患者個別のCTデータから3D画像を作成し、術前の切除計画やチーム内での検討に活用しています。

`,
    references: [
      { label: "慶應義塾大学外科学教室", url: "https://www.keio-surgery.jp/" },
      { label: "慶應義塾大学", url: "https://www.keio.ac.jp/" },
      { label: "日経クロステック", url: "https://xtech.nikkeibp.co.jp/" },
      { label: "慶應医学部", url: "https://www.med.keio.ac.jp/" },
    ],
    theme: "connectivity",
  },
]

export const allFeatureTags = Array.from(
  new Set(features.flatMap((f) => f.tags))
)
