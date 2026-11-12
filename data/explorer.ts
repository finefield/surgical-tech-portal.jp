// 「消化器外科チームを探す」と TOP 章モーダルのテーマ定義・テーマ対応データ。
// 施設の基本情報は data/facilities.ts を正とし、ここでは施設IDに対するテーマ対応のみを持つ。
// 対応の追加は施設の公式資料で確認してから行うこと（出典URLは各行の sourceUrl）。

export type ExplorerThemeKey = "insight" | "preserve" | "precision" | "connection" | "life"
export type ExplorerViewKey = "all" | ExplorerThemeKey

export interface ExplorerTheme {
  key: ExplorerViewKey
  title: string
  filterLabel: string
  listTitle: string
  listDescription: string
  eyebrow: string
  beatCopy: string
  choiceDescr: string
  light: string
  accent: string
  objectPosition: string
  image: string
}

export interface ExplorerMapping {
  facilityId: number
  theme: ExplorerThemeKey
  name: string
  topic: string
  stage: string
  headline: string
  technology?: string
  summary: string
  description: string
  sourceUrl: string
  sourceLabel?: string
  inModal: boolean
}

export const explorerThemes: ExplorerTheme[] = [
  {
    key: "all",
    title: "すべて",
    filterLabel: "章を横断して探す",
    listTitle: "",
    listDescription: "",
    eyebrow: "",
    beatCopy: "",
    choiceDescr: "",
    light: "#b6f4e8",
    accent: "#d5e7f5",
    objectPosition: "70% 44%",
    image: "/hero.jpg",
  },
  {
    key: "insight",
    title: "見極める。",
    filterLabel: "画像・ナビゲーション",
    listTitle: "画像で手術を描く現場。",
    listDescription: "肝切除の術前計画に、CT画像の3D解析を活用する医局・診療科。",
    eyebrow: "INSIGHT",
    beatCopy: "見える。その先を、見極める。",
    choiceDescr: "画像解析と術中ナビゲーション",
    light: "#a6edff",
    accent: "#a4e8f6",
    objectPosition: "74% 42%",
    image: "/insight.jpg",
  },
  {
    key: "preserve",
    title: "残す。",
    filterLabel: "機能温存・再建",
    listTitle: "胃や大腸の機能を残す現場。",
    listDescription: "胃がんや直腸がんの手術で、機能温存に取り組む外科チーム。",
    eyebrow: "PRESERVE",
    beatCopy: "その先の暮らしに、\n何を残せるか。",
    choiceDescr: "胃・直腸の機能温存",
    light: "#dcc9ff",
    accent: "#f2d7a7",
    objectPosition: "74% 44%",
    image: "/preserve.jpg",
  },
  {
    key: "precision",
    title: "挑む。",
    filterLabel: "AI・機器開発",
    listTitle: "新しい一手をつくる現場。",
    listDescription: "手術支援AIの研究・開発から、ロボットを使った新しい術式まで。",
    eyebrow: "PRECISION",
    beatCopy: "挑戦を支えるのは、精密さだ。",
    choiceDescr: "手術支援AIと新しい技術",
    light: "#bdf7df",
    accent: "#b4efdb",
    objectPosition: "75% 43%",
    image: "/precision.jpg",
  },
  {
    key: "connection",
    title: "つなぐ。",
    filterLabel: "手術教育・技術継承",
    listTitle: "技術を手渡す現場。",
    listDescription: "学生実習、卒後研修、遠隔支援。外科の技術を学び、次の現場へつなぐ取り組み。",
    eyebrow: "CONNECTION",
    beatCopy: "技術をつなぐ。経験をつなぐ。",
    choiceDescr: "手術教育と遠隔支援",
    light: "#c4d7ff",
    accent: "#bedaf8",
    objectPosition: "70% 42%",
    image: "/connection.jpg",
  },
  {
    key: "life",
    title: "その先の人生へ。",
    filterLabel: "術後の暮らし・連携",
    listTitle: "暮らしを支える現場。",
    listDescription: "地域での術後フォロー、多職種の外来、自宅で読み返せる情報。手術後の暮らしを支える取り組み。",
    eyebrow: "LIFE BEYOND",
    beatCopy: "手術のあとも、日々はつづく。",
    choiceDescr: "術後の暮らしを支える取り組み",
    light: "#ffe4b4",
    accent: "#f6d6ad",
    objectPosition: "74% 47%",
    image: "/life.jpg",
  },
]

export function isExplorerThemeKey(value: string): value is ExplorerThemeKey {
  return ["insight", "preserve", "precision", "connection", "life"].includes(value)
}

export const explorerMappings: ExplorerMapping[] = [
  {
    facilityId: 25,
    theme: "insight",
    name: "名古屋市立大学 消化器外科学",
    topic: "術前3D解析",
    stage: "診療で活用",
    headline: "CT画像を立体化し、手術前に検討する",
    summary: "CT画像の3D構築や3Dプリンターを術前シミュレーションに活用。",
    description: "肝胆膵外科の診療案内で、肝腫瘍の手術前に行うシミュレーションへの活用を紹介しています。",
    sourceUrl: "https://nagoya-cu-gs.jp/treatment/hbps.php",
    inModal: true,
  },
  {
    facilityId: 15,
    theme: "insight",
    name: "新潟大学 消化器・一般外科（第一外科）",
    topic: "術前3D解析",
    stage: "診療で活用",
    headline: "血管の走行と、手術後に残る肝臓を3Dで検討する",
    summary: "肝切除の前に、血管の走行・切離ライン・残る肝臓の量を3Dで検討。",
    description: "教室の公開資料では、術前に3D画像ソフトを使い、術中には超音波画像を活用する取り組みを紹介しています。",
    sourceUrl: "https://www.med.niigata-u.ac.jp/su1/wp-content/uploads/2025/11/35dc0decd8af7bba5be71af3b03f32ce.pdf",
    inModal: true,
  },
  {
    facilityId: 910,
    theme: "insight",
    name: "佐賀大学 一般・消化器外科 肝胆膵グループ",
    topic: "術中ナビゲーション",
    stage: "診療で活用",
    headline: "術中にICGや3Dナビゲーションを使う",
    summary: "術前に血管の構造を把握し、術中にもICGや3Dナビゲーションを活用。",
    description: "教室の肝胆膵グループ紹介では、術前シミュレーションと術中の画像情報を肝切除に活用していると説明しています。",
    sourceUrl: "https://www.surgery.med.saga-u.ac.jp/group/27.html",
    inModal: true,
  },
  {
    facilityId: 35,
    theme: "preserve",
    name: "関西医科大学附属病院 上部消化管外科",
    topic: "胃の機能温存",
    stage: "診療で活用",
    headline: "胃の機能温存を考慮した手術",
    summary: "胃がん・食道がんの手術で、機能温存を考慮した治療を紹介。",
    description: "上部消化管外科は、胃がん・食道がんの診療で、術後の生活を考慮しながら機能温存を目指す取り組みを紹介しています。",
    sourceUrl: "https://hp.kmu.ac.jp/treatment/departments/upper_gastrointestinal_surgery/",
    inModal: true,
  },
  {
    facilityId: 32,
    theme: "preserve",
    name: "京都府立医科大学 消化器外科・胃外科",
    topic: "胃の機能温存",
    stage: "診療で活用",
    headline: "胃を残す術式を選ぶ",
    summary: "幽門保存胃切除や噴門側胃切除など、胃の機能を残す手術に取り組む。",
    description: "胃外科の紹介では、胃の機能を残すための縮小手術を取り上げています。",
    sourceUrl: "https://sites.google.com/koto.kpu-m.ac.jp/digestivesurgery/%E8%A8%BA%E7%99%82%E3%83%81%E3%83%BC%E3%83%A0/%E8%83%83%E5%A4%96%E7%A7%91",
    inModal: true,
  },
  {
    facilityId: 94,
    theme: "preserve",
    name: "大分大学 消化器・小児外科",
    topic: "直腸の機能温存",
    stage: "診療で活用",
    headline: "直腸切除で自律神経を残す",
    summary: "直腸がんの手術で、自律神経の温存に取り組む。",
    description: "教室の消化管外科の診療案内では、直腸切除における自律神経温存手術を、機能温存の取り組みとして紹介しています。",
    sourceUrl: "https://www.oita-gp-surgery.jp/specialty/01.html",
    inModal: true,
  },
  {
    facilityId: 13,
    theme: "precision",
    name: "福島県立医科大学 消化管外科学講座",
    topic: "ロボットの応用",
    stage: "診療で活用",
    headline: "国産ロボットを現場に導入し、遠隔助言への応用を検証する",
    summary: "診療での活用｜国産手術支援ロボット「hinotori」の本格運用を公表。",
    description: "附属病院は、消化管外科とシスメックスの共同研究の一環で機器を設置・運用し、遠隔助言や教育への応用も検証していると公表しています。",
    sourceUrl: "https://www.fmu.ac.jp/news/topics/20260807.html",
    inModal: true,
  },
  {
    facilityId: 54,
    theme: "precision",
    name: "千葉大学 先端応用外科学",
    topic: "手術支援AI",
    stage: "研究",
    headline: "手術を支援するAIの精度と有用性を調べる",
    summary: "研究｜鏡視下の消化器手術に向け、手術支援AIの精度や有用性を検討。",
    description: "千葉大学病院の食道胃腸外科は、手術支援AIシステムの開発・改良と評価を目的とする研究計画を公開しました。公開資料上の研究期間は2026年3月31日までです。",
    sourceUrl: "https://www.ho.chiba-u.ac.jp/hosp/assets/dl/information/2402_optout_HK202312-10.pdf",
    inModal: true,
  },
  {
    facilityId: 958,
    theme: "precision",
    name: "国立がん研究センター東病院 大腸外科",
    topic: "手術支援AI",
    stage: "共同開発・薬事承認",
    headline: "内視鏡映像の血管をAIで強調する",
    summary: "共同開発・薬事承認｜内視鏡映像から血管などを強調する手術支援AI。",
    description: "国立がん研究センター東病院とJmeesが共同開発したSurVis-Pelは、術中映像で血管や尿管などの認識を支援するプログラムです。2026年3月の公式発表で薬事承認の取得が公表されました。",
    sourceUrl: "https://pod.ncc.go.jp/jp/information/pr_release/2026/0325/index.html",
    inModal: true,
  },
  {
    facilityId: 5,
    theme: "precision",
    name: "弘前大学医学部附属病院",
    topic: "遠隔手術支援",
    stage: "臨床研究",
    headline: "離れた場所から手術を支える仕組みを検証する",
    summary: "遠隔支援｜離れた場所の医師がロボット支援手術を支える臨床研究。",
    description: "病院は、消化器がんの患者さんを対象に、遠隔の医師が手術を支援し、その安全性を評価する取り組みを公表しています。",
    sourceUrl: "https://hosp.hirosaki-u.ac.jp/6335/",
    inModal: false,
  },
  {
    facilityId: 74,
    theme: "connection",
    name: "慶應義塾大学病院 上部消化管班",
    topic: "手術映像・AI教育",
    stage: "実証試験",
    headline: "手術映像から、外科医の判断を学ぶ。",
    technology: "Surgical VLM",
    summary: "手術映像を言葉にする生成AI「Surgical VLM」を胃がん手術で実証。",
    description: "慶應義塾大学病院の上部消化管班の外科医とディリーバは、手術映像をもとに術野の構造や操作の背景を説明する生成AIを研究開発しています。2026年2月に同院の胃がん手術で実証試験を行い、まず手術教育への活用を目指しています。",
    sourceUrl: "https://www.nedo.go.jp/news/press/AA5_101924.html",
    sourceLabel: "NEDO・ディリーバの実証発表 ↗",
    inModal: true,
  },
  {
    facilityId: 22,
    theme: "connection",
    name: "岐阜大学 消化器外科・小児外科",
    topic: "AR・VR／手術映像",
    stage: "学生実習",
    headline: "AR・VRと3D手術映像で、立体的に学ぶ",
    summary: "学生実習｜ARの解剖教材とVR・3D手術映像で、立体的に学ぶ。",
    description: "教室の臨床実習案内では、人体の上に3D解剖を重ねるARアプリ、VRの解剖講義、3D手術映像を紹介しています。",
    sourceUrl: "https://www.hosp.gifu-u.ac.jp/origin/2geka/clinical_training/",
    sourceLabel: "公式の教育・研修情報 ↗",
    inModal: true,
  },
  {
    facilityId: 27,
    theme: "connection",
    name: "藤田医科大学 総合消化器外科学講座",
    topic: "ロボット・内視鏡研修",
    stage: "卒後研修",
    headline: "消化器外科の基本から、内視鏡・ロボット手術まで学ぶ",
    summary: "卒後研修｜消化器外科の基本から、ロボットや内視鏡を使った手術まで学ぶ。",
    description: "総合消化器外科・先端ロボット・内視鏡手術学研修プログラムでは、基本手技や周術期管理を含む研修内容を公開しています。",
    sourceUrl: "https://www.fujita-hu.ac.jp/~kenshui/media/2025072-124743-417.pdf",
    sourceLabel: "公式の教育・研修情報 ↗",
    inModal: true,
  },
  {
    facilityId: 5,
    theme: "connection",
    name: "弘前大学医学部附属病院",
    topic: "遠隔手術支援",
    stage: "臨床研究",
    headline: "離れた場所から手術を支える仕組みを検証する",
    summary: "遠隔支援｜離れた場所の医師がロボット支援手術を支える臨床研究。",
    description: "病院は、消化器がんの患者さんを対象に、遠隔の医師が手術を支援し、その安全性を評価する取り組みを公表しています。",
    sourceUrl: "https://hosp.hirosaki-u.ac.jp/6335/",
    inModal: false,
  },
  {
    facilityId: 30,
    theme: "life",
    name: "京都大学医学部附属病院 消化管外科",
    topic: "地域との連携",
    stage: "術後支援",
    headline: "地域の医療機関と術後フォローを分担する",
    summary: "地域と連携｜かかりつけ医や連携先と診察・検査を分担し、術後をフォロー。",
    description: "病院の診療科案内では、患者さんの病状や通院状況に応じて、地域の医療機関と術後のフォローアップを分担すると説明しています。",
    sourceUrl: "https://www.kuhp.kyoto-u.ac.jp/department/departments/gastrointestinal-surgery.html", // 素材JSONの ipa.kuhp.kyoto-u.ac.jp は到達不能のため www に差し替え（2026-11-11確認）
    inModal: true,
  },
  {
    facilityId: 17,
    theme: "life",
    name: "金沢大学 消化管外科学",
    topic: "多職種の外来",
    stage: "術後支援",
    headline: "医師と看護師が、ストーマのある暮らしを支える",
    summary: "日常生活の支援｜消化管外科の医師が、看護師らと創傷・ストーマ外来に参加。",
    description: "附属病院の外来案内では、スキンケアや日常生活の指導、ストーマ装具の選択を支援すると紹介しています。",
    sourceUrl: "https://web.hosp.kanazawa-u.ac.jp/patients/stoma.html",
    inModal: true,
  },
  {
    facilityId: 961,
    theme: "life",
    name: "がん研有明病院 胃外科",
    topic: "患者向けの情報公開",
    stage: "術後支援",
    headline: "自宅で読み返せる術後の食事情報を届ける",
    summary: "自宅で読み返せる情報｜胃の手術後の食事について、患者向けに公開。",
    description: "病院の胃がん診療情報では、術後の食事について説明し、栄養士への相談も案内しています。",
    sourceUrl: "https://www.jfcr.or.jp/hospital/cancer/type/stomach.html",
    inModal: true,
  },
]
