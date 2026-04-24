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
    tags: ["ロボット手術国内1位", "hinotori", "FRSTC"],
    title: "THE HOLY LAND：ロボット手術の概念を塗り替える不動の聖地",
    description: `【聖地としての宿命：国内最多の症例数】
藤田医科大学は、ロボット支援手術の累計件数において国内不動の1位を走り続ける「聖地」です。日本初・世界初の術式を次々と成し遂げてきた歴史は、日本の外科医療の標準（スタンダード）を規定する司令塔。ここでの症例データは、そのまま日本の外科の歴史となっています。

【教育の高速道路：FRSTCの衝撃】
国内最大級のロボットトレーニングセンター（FRSTC）では、熟練医の「匠の技」をAIを用いて徹底的に言語化・数値化。2024年からは、若手医師の操作ログをAIが解析し、一人ひとりの弱点を自動抽出する「個別最適化プログラム」を実装。10年かかる技術を数年で到達させる驚異的な教育環境を実現しています。

【未来：合併症ゼロへの挑戦】
最新の取り組みでは、国産ロボット『hinotori』をフル活用した5G遠隔手術支援をリード。蓄積された膨大な手術ビッグデータをAIが学習し、術中にリアルタイムで「リスク」を予測。最先端テックが執刀医を全方位からバックアップする「究極の安全」の領域へと突入しています。`,
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
世界中の外科医を驚愕させているのが、自前開発に深く関与した国産ロボット『Saroa（サロア）』です。これまでのロボット手術の最大の弱点であった「触感の欠如」を、独自技術の空気圧駆動によって克服。組織を掴んだ際の「硬さ」や「粘り」を執刀医の指先へリアルタイムにフィードバック。0.1mm単位の繊細な剥離を、あたかも自分の手で触れている感覚で実行できます。

【身体知をデジタルで継承する】
この「触覚DX」により、若手医師はAIの視覚ガイドに加え、組織の適切な張力を「体感」として学習。高度な技術を「身体」に効率よく覚え込ませることが可能です。日本発の技術で世界の外科医療のOSを書き換える最前線です。`,
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
    tags: ["AI手術支援", "SDS", "術中ナビ"],
    title: "THE INTELLIGENCE：名人芸を「科学」へ昇華させるSDSの総本山",
    description: `【暗黙知を形式知へ。データの王道】
東京大学が目指すのは、属人的な「名人芸」を誰もが再現可能な「精密な科学」へと再定義することです。難攻不落の肝胆膵領域において「経験値」という曖昧な言葉を排除し、すべてをデータで語るサージカルデータサイエンス（SDS）を提唱。世界屈指の解析力を武器に、外科の未来を描き出しています。

【AIナビゲーターが提示する「0.1mmの正解」】
実装されているAI術中支援システムは、もはやSFの世界です。手術中のライブ映像をAIがミリ秒単位で解析し、複雑な血管や胆管を特定。ディスプレイ上に「ここを剥離せよ」といったガイドをARで投影します。これは、あたかも隣に世界一の熟練医が立ち、常に正しい道を指し示してくれているかのような体験です。

【大規模言語モデル（LLM）と融合する臨床知】
さらに東大は、手術映像とLLMを統合し、手術の「自動言語化」にも着手。執刀中の判断理由が自動でテキスト化され、即座に教育リソースや研究データとしてストックされる、世界最先端の「サージカル・インテリジェンス・センター」です。`,
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
    prefecture: "埼玉県",
    university: "埼玉医科大学",
    department: "国際医療センター（消化器外科）",
    tags: ["da Vinci 5", "日本初導入", "低侵襲"],
    title: "THE AGILITY：世界最速を患者のために。最新鋭『da Vinci 5』日本初導入",
    description: `【圧倒的な機動力：最新こそが最善】
埼玉医科大学国際医療センターの最大の強みは、世界最新鋭の手術支援ロボット『da Vinci 5』を日本で最も早く臨床導入したスピード感です。既存の技術に安住せず、常に世界のフロントランナーであり続ける姿勢が、ここを高度医療の砦たらしめています。

【低侵襲手術の新境地：異次元の没入感】
『da Vinci 5』の実装により、手術の精度は次の次元へ。最大の変化は、力覚（フォースフィードバック）の実装。組織を牽引する際にかかる負荷を感覚で把握できるようになったことで、組織へのダメージを極限まで低減し、術後回復を劇的に早めました。高精細な没入型3D映像により、外科医は患者の体内に入り込んだ感覚で、究極の根治手術を追求できます。

【「ファースト・ペンギン」としての教育的使命】
単に最新機器を導入するだけでなく、その「使いこなし」を全国へ広める役割も担っています。日本初の次世代機ユーザーとして、全国から集まる見学医に対し、最新テックを用いた「安全な最短導入法」を伝授。世界最先端の機器開発に日本の臨床知を反映させるフィードバック・ループの起点です。`,
    refs: [
      { label: "埼玉医科大学 ニュース", url: "https://www.saitama-med.ac.jp/news/nid00000616.html" },
      { label: "埼玉医科大学 導入報告", url: "https://www.saitama-med.ac.jp/news/nid00000649.html" },
      { label: "国際医療センター", url: "https://www.international.saitama-med.ac.jp/news/news-17668/" },
      { label: "消化器外科", url: "https://www.saitama-med.ac.jp/international/section/cancer/ge-surgery.html" },
    ],
  },
  {
    id: 5,
    type: "FEATURE",
    area: "東京",
    prefecture: "東京都",
    university: "慶應義塾大学",
    department: "一般・消化器外科学",
    tags: ["メタバース", "デジタルツイン", "VR"],
    title: "THE CONNECTIVITY：国境なき外科教育。メタバースとデジタルツインが拓く新世界",
    description: `【物理的な「場所」の制約を無効化】
慶應義塾大学は、メタバース（仮想空間）やXR技術を臨床に持ち込み、世界中のどこにいても同じ手術室にいるかのように高度な外科知能にアクセスできる環境を構築。物理的な移動に縛られる「20世紀型の医療」を打破しています。

【「デジタルツイン」による完璧なリハーサル】
患者個別のCTデータから仮想空間に全く同じ「臓器の双子（デジタルツイン）」を作成。執刀医やチームはVRゴーグルで多角的に観察し、どの血管を温存し、どのルートで切除すべきか議論しながらシミュレーションを行います。この「術前の完璧な予習」が、現場での迷いをゼロにし、安全性を飛躍的に向上させました。

【グローバルな「知のギルド」】
慶應は海外のトップ大学とメタバースを介した国際ライブサージェリーを常態化。東京にいながら欧米の名医からリアルタイムで助言を受ける。「サージカル・メタバース」の先駆者として、地球規模での外科技術の平準化を目指す壮大なハブとなっています。`,
    refs: [
      { label: "慶應義塾大学 外科", url: "https://www.keio-surgery.jp/" },
      { label: "慶應義塾大学", url: "https://www.keio.ac.jp/" },
      { label: "日経XTECH", url: "https://xtech.nikkeibp.co.jp/" },
      { label: "慶應義塾大学 医学部", url: "https://www.med.keio.ac.jp/" },
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
2024-25年に登場した最新機『da Vinci 5』。外科手術は「ビデオゲーム」から「ビッグデータ解析」の領域へ。術中の組織抵抗を感知するフォースフィードバックに加え、手術の全プロセスをデータ化。術後、AIが執刀医の手技を自動評価し改善点をレポートとして提示します。米国では、この「データによる振り返り」が外科医のスキルアップにおける標準インフラとなっています。`,
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
    title: "THE CONNECTED：2,800kmの距離をゼロにする究極のネットワーク",
    description: `【Beyond Borders】
2025年、中国とドイツを結ぶ大陸間遠隔手術の実証に成功。低遅延ネットワークが物理的な距離を完全に克服しました。5G/6Gのバックボーンを活用し、上海の執刀医が数千キロ離れたヨーロッパの患者をリアルタイム操作。宇宙空間や紛争地、僻地医療を救う「究極のインフラ」として世界が注視しています。`,
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
わずか2cm足らずの穴から、人間の腕の動きを完全に再現したロボットアームが潜入。Vicariousは「患者の腹部内に外科医の分身が入る」という没入型コンセプト。360度の3Dマッピングと高速ネットワークにより、世界中のどこからでも「患者の体内に没入」して執刀できる、SFを現実にした次世代の単一孔手術システムです。`,
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
    department: "Holoscan for Media",
    tags: ["NVIDIAHoloscan", "サージカルAI", "エッジAI"],
    title: "THE ENGINE：手術室全体を「巨大なAIコンピュータ」に変える最強の演算基盤",
    description: `【Surgical Intelligence】
手術室にあるあらゆるカメラ、内視鏡、生体モニターを統合。NVIDIAのGPUパワーにより、術中の映像にAIが「血管の裏を透視表示する」といった高度支援を遅延ゼロで提供。特定のロボットに依存せず、手術室そのものを知能化するこのプラットフォームは、世界の医療機器開発の共通言語となっています。`,
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
