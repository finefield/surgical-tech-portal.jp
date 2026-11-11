export interface ShowcaseItem {
  id: number
  type: "FEATURE" | "GLOBAL"
  area: string
  prefecture: string
  university: string
  department: string
  tags: string[]
  title: string
  description: string
  refs: { label: string; url: string }[]
}

export const showcaseItems: ShowcaseItem[] = [
  {
    id: 1,
    type: "FEATURE",
    area: "中部",
    prefecture: "愛知県",
    university: "藤田医科大学",
    department: "総合消化器外科学",
    tags: ["手術トレーニング", "ロボット支援手術"],
    title: "3機種の手術支援ロボットを学ぶ拠点",
    description: `ダビンチ、hinotori、Hugoのトレーニング施設が同じ拠点にあります。医療従事者が手術支援ロボットの操作を学ぶ環境を整えています。`,
    refs: [
      { label: "藤田医科大学病院「ロボット支援手術」", url: "https://hospital.fujita-hu.ac.jp/about/feature/roboticsurgery.html" },
      { label: "藤田医科大学「医療ロボット・AIの実践」", url: "https://fhu.jp/robot_ai.html" },
    ],
  },
  {
    id: 2,
    type: "FEATURE",
    area: "東京",
    prefecture: "東京都",
    university: "東京科学大学",
    department: "消化管外科学分野（旧医科歯科大）",
    tags: ["Saroa", "医工連携", "力覚フィードバック"],
    title: "鉗子にかかる力を術者に伝える「Saroa」",
    description: `旧・東京医科歯科大学と旧・東京工業大学は、リバーフィールドと手術支援ロボット「Saroa」を共同開発しました。空気圧駆動を利用して、鉗子にかかる力を術者に伝える機能を備えています。`,
    refs: [
      { label: "東京科学大学 共同開発に関する公表資料", url: "https://www.tmd.ac.jp/files/topics/60014_ext_04_6.pdf" },
      { label: "リバーフィールド「Saroa」製品資料", url: "https://www.riverfieldinc.com/files/upload/Saroa_catalog.pdf" },
    ],
  },
  {
    id: 3,
    type: "FEATURE",
    area: "東京",
    prefecture: "東京都",
    university: "東京大学",
    department: "肝胆膵外科・人工臓器移植外科",
    tags: ["手術映像解析", "AI研究"],
    title: "手術映像から、術中の注視点を推定する研究",
    description: `東京大学では、手術映像に映る器具を深層学習で識別し、その情報から術中の注視点を推定する手法を研究しました。`,
    refs: [
      { label: "科研費 研究課題 23K17224", url: "https://kaken.nii.ac.jp/grant/KAKENHI-PROJECT-23K17224/" },
    ],
  },
  {
    id: 4,
    type: "FEATURE",
    area: "関東",
    prefecture: "神奈川県",
    university: "北里大学",
    department: "医学部 外科",
    tags: ["上部消化管外科", "下部消化管外科", "肝胆膵外科"],
    title: "消化管・肝胆膵の診療を担う外科",
    description: `北里大学医学部外科は、上部消化管外科、下部消化管外科、一般・小児・肝胆膵外科、乳腺・甲状腺外科の4つの診療ユニットを紹介しています。`,
    refs: [
      { label: "北里大学医学部 外科 公式サイト", url: "https://www.kitasato-u.ac.jp/khp/syokakigeka/index.html" },
    ],
  },
  {
    id: 6,
    type: "GLOBAL",
    area: "Overseas",
    prefecture: "USA",
    university: "Intuitive Surgical",
    department: "da Vinci 5",
    tags: ["da Vinci 5", "データ駆動型手術", "AI評価"],
    title: "THE STANDARD：外科手術のOSを書き換える次世代の標準",
    description: `【Data-Driven Surgery】
2024-25年に登場した最新機『da Vinci 5』。外科手術は「ビデオゲーム」から「ビッグデータ解析」の領域へ。術中の組織抵抗を感知するフォースフィードバックに加え、手術の全プロセスをデータ化。術後、AIが執刀医の手技を自動評価し改善点をレポートとして提示します。`,
    refs: [
      { label: "Intuitive Surgical - da Vinci 5", url: "https://www.intuitive.com/en-us/products/da-vinci-surgical-system/da-vinci-5" },
      { label: "PA Consulting - Digital Surgery 2026", url: "https://www.paconsulting.com/newsroom/med-device-online-digital-surgery-in-2026-the-data-driven-operating-room-18-december-2025" },
      { label: "MedTech Dive", url: "https://www.medtechdive.com/news/intuitive-surgical-da-vinci-5-launch/710682/" },
      { label: "Robotics Business Review", url: "https://www.roboticsbusinessreview.com/" },
    ],
  },
  {
    id: 7,
    type: "GLOBAL",
    area: "Overseas",
    prefecture: "CN/EU",
    university: "China-Europe 5G Link",
    department: "Telesurgery Network",
    tags: ["5G遠隔手術", "大陸間執刀", "低遅延通信"],
    title: "THE CONNECTED：約7,400kmの距離をゼロにする究極のネットワーク",
    description: `【Beyond Borders】
2025年、中国とドイツを結ぶ大陸間遠隔手術の実証に成功。低遅延ネットワークが物理的な距離を完全に克服しました。5Gのバックボーンを活用し、広州・中山大学のChen教授がハンブルクのコンソールから、北京の患者の前立腺癌手術を遠隔で実施。宇宙空間や紛争地、僻地医療を救う「究極のインフラ」として世界が注視しています。`,
    refs: [
      { label: "IDW Online - European Breakthrough", url: "https://nachrichten.idw-online.de/2025/11/14/european-breakthrough-in-tele-robotic-surgery" },
      { label: "Surgery International", url: "https://surgery.international/china-research-offers-hope-for-routine-robotic-telesurgery/" },
      { label: "BMJ", url: "https://www.bmj.com/content/384/bmj-2023-078345" },
      { label: "UroToday", url: "https://www.urotoday.com/conference-highlights/wcet-2025/163044-wcet-2025-state-of-the-art-lecture-remote-robotic-surgery-current-state-of-telesurgery.html" },
    ],
  },
  {
    id: 8,
    type: "GLOBAL",
    area: "Overseas",
    prefecture: "USA",
    university: "Vicarious Surgical",
    department: "Single-port Robotics",
    tags: ["VicariousSurgical", "没入型手術", "最小侵襲"],
    title: "THE HUMANOID：1.8cmの穴から外科医の「分身」を体内に送り込む",
    description: `【Molecular Dexterity】
わずか2cm足らずの穴から、人間の腕の動きを完全に再現したロボットアームが潜入。Vicariousは「患者の腹部内に外科医の分身が入る」という没入型コンセプト。360度の3Dマッピングによる没入型の操作コンセプトを掲げる、開発中の単一孔手術システムです（FDA未承認。設計凍結は2026年末目標とされ、実用化を目指しています）。`,
    refs: [
      { label: "Vicarious Surgical", url: "https://www.vicarioussurgical.com/" },
      { label: "Business Wire", url: "https://www.businesswire.com/news/home/20260105183855/en/Vicarious-Surgical-Advances-Toward-Design-Freeze-with-Successful-In-Vivo-Porcine-Lab" },
      { label: "Corporate Deck 2025", url: "https://s28.q4cdn.com/226987091/files/doc_presentations/2025/Vicarious-Surgical-March-2025-Corporate-Deck.pdf" },
      { label: "Investing News", url: "https://investingnews.com/vicarious-surgical-reports-fourth-quarter-and-full-year-2025-financial-results/" },
    ],
  },
  {
    id: 9,
    type: "GLOBAL",
    area: "Overseas",
    prefecture: "USA",
    university: "NVIDIA",
    department: "NVIDIA Holoscan",
    tags: ["NVIDIAHoloscan", "サージカルAI", "エッジAI"],
    title: "THE ENGINE：手術室全体を「巨大なAIコンピュータ」に変える最強の演算基盤",
    description: `【Surgical Intelligence】
手術室にあるあらゆるカメラ、内視鏡、生体モニターを統合。NVIDIAのGPUパワーにより、術中映像へのAI推論をリアルタイムに重ねる高度支援を超低遅延で提供。特定のロボットに依存せず、手術室そのものを知能化するこのプラットフォームは、世界の医療機器開発の共通言語となっています。`,
    refs: [
      { label: "NVIDIA Holoscan SDK", url: "https://www.nvidia.com/en-us/clara/holoscan-sdk/" },
      { label: "NVIDIA News - GTC 2024", url: "https://nvidianews.nvidia.com/news/nvidia-announces-new-medical-imaging-ai-partnerships-at-gtc-2024" },
      { label: "Developer Portal", url: "https://developer.nvidia.com/holoscan-sdk" },
      { label: "NVIDIA Blog - Healthcare AI", url: "https://blogs.nvidia.com/blog/gtc-2024-healthcare-ai/" },
    ],
  },
  {
    id: 10,
    type: "GLOBAL",
    area: "Overseas",
    prefecture: "UK",
    university: "Proximie",
    department: "AR Collaboration",
    tags: ["Proximie", "AR遠隔指導", "手術の民主化"],
    title: "THE COLLECTIVE：世界中の名医をARで召喚する「知能の民主化」",
    description: `【Borderless Expertise】
「手術室に物理的な壁はない」。現地の執刀医の視界に、地球の裏側にいる名医の「ARの手」をリアルタイムで重ね合わせ、直接的な手技指導を可能にします。世界100カ国以上で導入され、あらゆる手術室が「知の共有放送局」へと変貌。若手医師が世界最高峰の技術をインタラクティブに学習できる、外科教育のパラダイムシフトです。`,
    refs: [
      { label: "Proximie", url: "https://www.proximie.com/" },
      { label: "Global Partnership", url: "https://www.proximie.com/news/proximie-announces-global-partnership" },
      { label: "MobiHealthNews", url: "https://www.mobihealthnews.com/news/proximie-raises-80m-remote-surgical-collaboration-platform" },
      { label: "HealthTech Digital", url: "https://www.healthtechdigital.com/proximie-reaches-major-milestone/" },
    ],
  },
]

export const japanItems = showcaseItems.filter((item) => item.type === "FEATURE")
export const globalItems = showcaseItems.filter((item) => item.type === "GLOBAL")
