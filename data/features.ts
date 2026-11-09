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
    tags: ["ロボット手術国内トップクラス", "hinotori", "サージカルトレーニングセンター", "サージカルDX", "藤田医大", "教育の民主化"],
    title: "THE HOLY LAND",
    subtitle: "ロボット手術の概念を塗り替える不動の聖地",
    description: `【聖地としての宿命】
ロボット支援手術の延べ実績は7,700例以上（2008年～2025年8月）と国内トップクラス。その姿は、単なる一病院の枠を超え、日本の外科医療の標準（スタンダード）を規定する司令塔です。数多くの日本初・世界初の術式を成し遂げてきた歴史は、常に未知の領域へ踏み込む勇気の積み重ね。ここでの症例データは、そのまま日本の外科の歴史となっています。

【教育の高速道路：サージカルトレーニングセンターの衝撃】
サージカルトレーニングセンター（CSTC）は、ダビンチ・hinotori・Hugoのトレーニング施設が同一拠点に揃う、世界で唯一のトレーニングセンターです。（削除）かつては10年かかると言われたベテランの域へ、若手が数年で到達できる驚異的なラーニング環境を実現しています。

【未来：合併症ゼロへの挑戦】
最新の取り組みでは、国産ロボット『hinotori』による遠隔手術の実証を国内で初めて実施（10Gbps光専用回線）。2023年には東京―愛知間、シンガポール国立大学との間でも実証を行いました。（削除）もはや手術は外科医個人の腕に依存するものではなく、最先端テックが執刀医を全方位からバックアップする「究極の安全」の領域へと突入しています。`,
    references: [
      { label: "藤田医科大学 ロボット手術センター", url: "https://www.fujita-hu.ac.jp/center/robot/" },
      { label: "藤田医科大学 ニュース", url: "https://www.fujita-hu.ac.jp/news/" },
      { label: "日本経済新聞", url: "https://www.nikkei.com/" },
      { label: "メディカロイド", url: "https://www.medicaroid.com/" },
    ],
    theme: "holy-land",
  },
  {
    id: 2,
    area: "東京",
    prefecture: "東京都",
    university: "東京科学大学",
    department: "消化管外科学分野（旧医科歯科大）",
    tags: ["Saroa", "触覚フィードバック", "東京科学大学", "医工連携", "ScienceTokyo", "国産ロボット"],
    title: "THE INNOVATOR",
    subtitle: "人類に「デジタルな触覚」を取り戻す医工融合の最高峰",
    description: `【知の化学反応：Science Tokyo】
2024年10月の統合により、医学の最高峰（旧東京医科歯科大学）と工学の最高峰（旧東京工業大学）が一つになった「東京科学大学」。その最前線に立つ消化管外科学分野の哲学は明確です。「外科医の技術を工学で拡張し、不可能を可能にする」。臨床現場の切実なニーズと、世界トップクラスのエンジニアリングが壁を介さずシームレスに融合する環境は、まさにシリコンバレーを凌駕する熱量を持っています。

【国産ロボット『Saroa』が起こした触覚革命】
世界中の外科医を驚愕させているのが、自前開発に深く関与した国産ロボット『Saroa（サロア）』です。これまでのロボット手術の最大の弱点であった「触感の欠如」を、独自技術の空気圧駆動によって克服。組織を掴んだ際の「硬さ」や「粘り」を執刀医の指先へリアルタイムにフィードバックします。繊細な剥離操作を、あたかも自分の手で直接触れているかのような感覚で実行できるのです。

【身体知をデジタルで継承する】
この「触覚DX」は、教育への応用も期待されています。力覚フィードバックの教育効果については、前臨床研究で検証が進められています。日本発の技術で世界の外科医療のOSを書き換える。その最前線がここにあります。`,
    references: [
      { label: "東京医科歯科大学", url: "https://www.tmd.ac.jp/" },
      { label: "リバーフィールド", url: "https://www.riverfieldinc.com/" },
      { label: "消化管外科学分野", url: "https://www.tmd.ac.jp/med/surg2/" },
      { label: "日本経済新聞", url: "https://www.nikkei.com/" },
    ],
    theme: "innovator",
  },
  {
    id: 3,
    area: "東京",
    prefecture: "東京都",
    university: "東京大学",
    department: "肝胆膵外科・人工臓器移植外科",
    tags: ["AI手術支援", "東大外科", "肝胆膵ロボット", "自動ナビ"],
    title: "THE INTELLIGENCE",
    subtitle: "名人芸を「科学」へ昇華させる手術データの科学的活用",
    description: `【暗黙知を形式知へ。データの王道】
東京大学が目指すのは、属人的で「名人芸」とされてきた外科手術を、誰もが再現可能な「精密な科学」へと再定義することです。肝胆膵領域という、人体で最も複雑かつ出血リスクの高い難攻不落の領域において、東大は「経験値」という曖昧な言葉を排除。手術データの科学的活用を目指す研究が進められており、世界屈指の症例数と解析力を武器に、外科の未来をデータで描き出しています。

【手術支援AIの研究開発】
東京大学では、AIによる術中解剖認識・注視点識別などの手術支援AIの研究開発を進めています。

【大規模言語モデル（LLM）と融合する臨床知】（削除）東京大学の医局は、もはや単なる診療組織ではなく、世界最先端の「サージカル・インテリジェンス・センター」へと進化を遂げています。`,
    references: [
      { label: "東京大学医学部附属病院", url: "https://www.h.u-tokyo.ac.jp/" },
      { label: "AMED", url: "https://www.amed.go.jp/" },
      { label: "東京大学医学系研究科", url: "https://www.m.u-tokyo.ac.jp/" },
      { label: "日経BP", url: "https://project.nikkeibp.co.jp/" },
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
慶應義塾大学は、外科医療における「距離」と「時間」の概念を根底から変えようとしています。伝統ある外科医局としての矜持を持ちつつ、その手法は極めてアバンギャルド。（削除）ここには物理的な移動に縛られる「20世紀型の医療」の姿はありません。

【3D画像による術前リハーサル】
慶應では、患者個別のCTデータから3D画像を作成し、術前の切除計画やチーム内での検討に活用しています。

【グローバルな「知のギルド」を率いる旗手として】（削除）`,
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
