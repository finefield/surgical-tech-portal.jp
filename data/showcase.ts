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
    tags: ["ロボット手術国内トップクラス", "hinotori", "サージカルトレーニングセンター"],
    title: "THE HOLY LAND：ロボット手術の概念を塗り替える不動の聖地",
    description: `【聖地としての宿命：国内トップクラスの症例数】
藤田医科大学は、ロボット支援手術の延べ実績は7,700例以上（2008年～2025年8月）で、国内トップクラスの実績を有する「聖地」です。日本初・世界初の術式を次々と成し遂げてきた歴史は、日本の外科医療の標準（スタンダード）を規定する司令塔。ここでの症例データは、そのまま日本の外科の歴史となっています。

【教育の高速道路：サージカルトレーニングセンター】
サージカルトレーニングセンター（ダビンチ、hinotori、Hugoのトレーニング施設が同一拠点に揃う世界で唯一のトレーニングセンター）です。

【未来：合併症ゼロへの挑戦】
最新の取り組みでは、国産ロボット『hinotori』を用いた遠隔手術の実証を、10Gbps光専用回線で実施（2021年に国内初、2023年には約300km離れた東京―愛知間での遠隔指導実証も実施）。最先端テックが執刀医を全方位からバックアップする「究極の安全」の領域へと突入しています。`,
    refs: [
      { label: "藤田医科大学 ロボット手術センター", url: "https://www.fujita-hu.ac.jp/center/robot/" },
      { label: "藤田医科大学 ニュース", url: "https://www.fujita-hu.ac.jp/news/" },
      { label: "日経新聞", url: "https://www.nikkei.com/" },
      { label: "メディカロイド", url: "https://www.medicaroid.com/" },
    ],
  },
  {
    id: 2,
    type: "FEATURE",
    area: "東京",
    prefecture: "東京都",
    university: "東京科学大学",
    department: "消化管外科学分野（旧医科歯科大）",
    tags: ["国産ロボ Saroa", "医工融合", "触覚フィードバック"],
    title: "THE INNOVATOR：人類に「デジタルな触覚」を取り戻す医工融合の最高峰",
    description: `【知の化学反応：Science Tokyo】
2024年10月の統合により誕生した「東京科学大学」。医学の最高峰（旧東京医科歯科大）と工学の最高峰（旧東工大）が一つになり、外科医の技術を工学で拡張する「臨床直結型ネットワーク」を構築。シリコンバレーをも凌駕する熱量で新技術を生み出しています。

【国産ロボット『Saroa』が起こした触覚革命】
世界中の外科医を驚愕させているのが、自前開発に深く関与した国産ロボット『Saroa（サロア）』です。これまでのロボット手術の最大の弱点であった「触感の欠如」を、独自技術の空気圧駆動によって克服。組織を掴んだ際の「硬さ」や「粘り」を執刀医の指先へリアルタイムにフィードバック。繊細な剥離を、あたかも自分の手で触れている感覚で実行できます。

【身体知をデジタルで継承する】
この「触覚DX」により、若手医師は組織の適切な張力を「体感」として学習。高度な技術を「身体」に効率よく覚え込ませることが可能です。日本発の技術で世界の外科医療のOSを書き換える最前線です。`,
    refs: [
      { label: "東京科学大学", url: "https://www.tmd.ac.jp/" },
      { label: "リバーフィールド株式会社", url: "https://www.riverfieldinc.com/" },
      { label: "消化管外科学分野", url: "https://www.tmd.ac.jp/med/surg2/" },
      { label: "日経新聞", url: "https://www.nikkei.com/" },
    ],
  },
  {
    id: 3,
    type: "FEATURE",
    area: "東京",
    prefecture: "東京都",
    university: "東京大学",
    department: "肝胆膵外科・人工臓器移植外科",
    tags: ["AI手術支援", "AI・データ活用研究", "術中ナビ"],
    title: "THE INTELLIGENCE：名人芸を「科学」へ昇華させるAI・データ研究の拠点",
    description: `【暗黙知を形式知へ。データの王道】
東京大学が目指すのは、属人的な「名人芸」を誰もが再現可能な「精密な科学」へと再定義することです。難攻不落の肝胆膵領域において「経験値」という曖昧な言葉を排除し、人工知能を用いた術前画像シミュレーション、AIによる予後予測、深層学習による術中注視点の自動識別など、AI・データ活用の研究を推進しています。

【AIによる術中支援の研究】
手術映像を解析し術中判断を支援するシステムの研究開発が進められています。

`,
    refs: [
      { label: "東京大学医学部附属病院", url: "https://www.h.u-tokyo.ac.jp/" },
      { label: "AMED", url: "https://www.amed.go.jp/" },
      { label: "東京大学医学部", url: "https://www.m.u-tokyo.ac.jp/" },
      { label: "日経BP", url: "https://project.nikkeibp.co.jp/" },
    ],
  },
  {
    id: 4,
    type: "FEATURE",
    area: "関東",
    prefecture: "神奈川県",
    university: "北里大学病院",
    department: "外科学",
    tags: ["Surgical Data Science", "4ユニット統合", "チーム北里"],
    title: "THE SURGICAL DATA HUB：4つの専門性が融合し、データで外科の未来を照らす。",
    description: `【圧倒的な組織力：4つの外科が「一つのチーム」へ】
北里大学外科学教室の最大の武器は、上部・下部消化管、一般・小児・肝胆膵、そして乳腺・甲状腺の4つの診療ユニットが『一つの外科』として完全に統合されている点にあります。縦割りの弊害を排し、各専門領域の知見をシームレスに共有。複雑な症例に対しても、全方位から最適な術式を導き出す「チーム北里」の底力が、ここにはあります。

【データ駆動型外科の極致：Surgical Data Science (SDS)】
北里は、手術を「経験」ではなく「サイエンス」として再定義しています。感覚に頼らない、再現性の高い超精密手術が北里のスタンダードです。

北里柴三郎の『実学』の精神を、21世紀のデジタル技術で具現化し、外科医療の新たな地平を切り拓いています。`,
    refs: [
      { label: "Source 1", url: "https://www.kitasato-u.ac.jp/khp/syokakigeka/index.html" },
      { label: "Source 2", url: "https://www.kitasato-u.ac.jp/khp/syokakigeka/jyobu/index.html" },
      { label: "Source 3", url: "https://www.kitasato-u.ac.jp/khp/syokakigeka/kabu/index.html" },
      { label: "Source 4", url: "https://www.kitasato-u.ac.jp/khp/syokakigeka/ippan/index.html" },
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
