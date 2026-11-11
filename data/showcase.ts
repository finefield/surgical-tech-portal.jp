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
    tags: ["da Vinci 5", "Force Feedback", "手術データ"],
    title: "THE STANDARD：da Vinci 5 と手術データの活用",
    description: `『da Vinci 5』は、2024年に登場し、限定導入を経て2025年に本格展開が始まった手術支援ロボットです。組織に加わる力を術者が感じ取れる Force Feedback 技術を備えます（対応する器具は optional です）。手術中のシステムデータ、器具の動き、映像などは収集・解析され、『Case Insights』が客観的な指標や技能向上に向けた示唆を提示します（My Intuitive+ の利用が前提です）。`,
    refs: [
      { label: "Intuitive Surgical - da Vinci 5", url: "https://www.intuitive.com/en-us/products/da-vinci-surgical-system/da-vinci-5" },
      { label: "PA Consulting - Digital Surgery 2026", url: "https://www.paconsulting.com/newsroom/med-device-online-digital-surgery-in-2026-the-data-driven-operating-room-18-december-2025" },
    ],
  },
  {
    id: 7,
    type: "GLOBAL",
    area: "Overseas",
    prefecture: "CN/EU",
    university: "China-Europe 5G Link",
    department: "Telesurgery Network",
    tags: ["5G遠隔手術", "大陸間遠隔手術", "低遅延通信"],
    title: "THE CONNECTED：中国とドイツを結んだ遠隔手術の実証",
    description: `2025年11月14日、ドイツのロボット手術シンポジウム DRUS 2025 で、中山大学第一附属医院の Lingwu Chen 教授がハンブルクのコンソールから、北京の中国人民解放軍総医院の患者に、遠隔で根治的前立腺摘除術を実施しました。中山大学の発表では、通信距離は約12,000km、平均遅延は125ミリ秒、手術時間は90分でした。学会の場でのライブ実証であり、通常診療として行われたものではありません。`,
    refs: [
      { label: "IDW Online - European Breakthrough", url: "https://nachrichten.idw-online.de/2025/11/14/european-breakthrough-in-tele-robotic-surgery" },
      { label: "中山大学 公式発表", url: "https://www.sysu.edu.cn/sysuen/info/1012/57871.htm" },
    ],
  },
  {
    id: 8,
    type: "GLOBAL",
    area: "Overseas",
    prefecture: "USA",
    university: "Vicarious Surgical",
    department: "Single-port Robotics",
    tags: ["単孔式手術", "開発中", "手術支援ロボット"],
    title: "THE HUMANOID：単一の切開から入る手術支援ロボット（開発中）",
    description: `Vicarious Surgical は、腹部の単一の切開（現行のディスポーザブルでは1.8cm）からカメラと2本のロボット器具を挿入する、開発中の単孔式手術支援システムです。ロボットアームは、肩・肘・手首に至る術者の上半身の自然な動きを再現するよう設計され、360°の視野と没入型の3D表示を備えます。FDA 未承認で、設計凍結は2026年末が目標とされています。`,
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
    tags: ["Holoscan", "手術映像", "AI推論"],
    title: "THE ENGINE：手術データ処理の基盤『Holoscan』",
    description: `NVIDIA の Holoscan は、手術映像やセンサーなどのストリーミングデータをリアルタイムに処理するための開発基盤です。手術映像に対するAIモデル（器具の検出やセグメンテーションなど）を低遅延で動かす用途が示されています。特定の手術支援ロボットに依存しない基盤で、医療機器メーカーなどが自社製品に組み込んで使うものです。Holoscan 自体は医療機器ではなく、開発用のプラットフォームです。`,
    refs: [
      { label: "NVIDIA Developer - Holoscan SDK", url: "https://developer.nvidia.com/holoscan-sdk" },
    ],
  },
  {
    id: 10,
    type: "GLOBAL",
    area: "Overseas",
    prefecture: "UK",
    university: "Proximie",
    department: "AR Collaboration",
    tags: ["AR遠隔指導", "テレメンタリング", "手術教育"],
    title: "THE COLLECTIVE：ARでつなぐ遠隔手術指導",
    description: `Proximie は、遠隔地の専門医が、現地の執刀医が見ている術野の映像に手のジェスチャーや注釈を重ねて助言できるプラットフォームです。ARによる遠隔指導は、実際の臨床現場での使用が学術レビューでも報告されています。同社の公式サイトでは、50カ国以上・500を超える施設での導入が示されています。`,
    refs: [
      { label: "Proximie", url: "https://www.proximie.com/" },
      { label: "JMIR スコーピングレビュー（2025）", url: "https://www.jmir.org/2025/1/e63939/" },
    ],
  },
]

export const japanItems = showcaseItems.filter((item) => item.type === "FEATURE")
export const globalItems = showcaseItems.filter((item) => item.type === "GLOBAL")
