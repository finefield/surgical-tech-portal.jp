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
    description: `この血管は何か。なぜ、いまこの操作をするのか。慶應義塾大学病院の上部消化管班の外科医と、慶應義塾大学医学部発のディリーバは、手術映像を手がかりに術野の構造や操作の背景を説明する生成AI「Surgical VLM」の研究開発に取り組んでいます。

■ 手術映像を、質問できる教材へ
手術を見学する医学生や若手医師には、術者が何に着目しているかが映像から読み取りにくいことがあります。開発チームは、映像に映る組織や器具、操作の意味を言葉で説明し、映像に沿った質問に答える技術として、まず手術教育への応用を目指しています。

■ 胃がんの手術室で、何を確かめたか
2026年2月20日、慶應義塾大学病院の胃がん手術で実証試験を行いました。病院の協力を得て設けた評価項目に沿って、AIの回答の解剖学的な正確さ、臨床的な有用性、文章の自然さを評価しました。

■ 研究で確認した範囲
同年6月に公表された原著論文では、ロボット支援下幽門側胃切除の映像を使ってモデルを構築し、研究チームが開発した評価方法で回答を検討しています。論文では概念実証として結果を報告し、臨床使用には独立したデータや外部評価者による追加検証が必要だとしています。`,
    references: [
      { label: "慶應義塾大学病院 上部消化管班「研究について」", url: "https://www.surgery-med-keio.jp/research" },
      { label: "経済産業省 GENIAC 共創事例", url: "https://geniac.meti.go.jp/geniac_magazine/usecase_03.html" },
      { label: "NEDO・ディリーバの実証発表", url: "https://www.nedo.go.jp/news/press/AA5_101924.html" },
      { label: "Surgical VLMの概念実証研究（Gastric Cancer）", url: "https://pubmed.ncbi.nlm.nih.gov/42251621/" },
    ],
    theme: "intelligence",
  },
  {
    id: 6,
    area: "九州・沖縄",
    prefecture: "福岡県",
    university: "九州大学病院",
    department: "先端医工学診療部",
    tags: ["遠隔手術指導", "アノテーション技術", "IOWN"],
    title: "手術映像に描く線が、臓器の動きに追従する",
    subtitle: "九州大学病院 先端医工学診療部 沖英次教授のアノテーションによる遠隔指導",
    description: `離れた病院にいる指導医が、執刀中の手術映像の上に線やマークを描き込む。描いた線は臓器の動きや画面の拡大に自動で追従し、言葉だけでは伝わりにくい「どこを、どのように」を具体的に示します。九州大学病院 先端医工学診療部（部長・教授：沖英次）が取り組む、アノテーションによる遠隔指導です。

■ 描いた線が、臓器の動きを追いかける
アノテーション技術は、九州大学が開発し、特許を取得した技術です。指導医が手術映像上に描いた線・注釈が臓器の動きや画面の拡大に合わせて自動的に追従するため、離れた場所からでも具体的な指示ができます。専用の光回線は必要なく、インターネット回線があれば導入できます。

■ 2025年、実際の手術で使われた遠隔指導
福岡県の事業として、九州大学病院と田川市立病院の間に遠隔手術指導システムが構築され、リアルタイムでの遠隔指導による手術が実施されました。当時、沖教授は九州大学病院の消化管外科准教授でした。

■ 2026年、約110km先とつなぐ2年間の実証へ
2026年9月16日、総務省の「地域社会DX推進パッケージ事業」に採択された実証が共同発表されました。九州大学病院と別府病院（約110km）をIOWN APNで接続し、2026年度は映像伝送、2027年度はロボット遠隔操作を実証する2年計画です。九州大学は全体の統括、臨床評価、指導医の提供、アノテーション技術の提供を担い、通信基盤をNTTドコモビジネス、4K立体映像伝送をNTTイノベーティブデバイス、アノテーションシステムの構築・運用設計をセラン、ロボットの開発・遠隔仕様・薬事をF.MEDが担います。同じ事業では、F.MEDが開発したマイクロサージェリー用手術支援ロボットの遠隔操作も実証されます。

沖教授は消化管外科を専門とする外科医です。専門医の知見を遠隔地の手術室へ届ける仕組みとして、実証が進められています。`,
    references: [
      { label: "九州大学病院ニュース（2026年9月16日）", url: "https://www.hosp.kyushu-u.ac.jp/news/detail/829/" },
      { label: "九州大学病院 先端医工学診療部（外来担当医）", url: "https://www.hosp.kyushu-u.ac.jp/doctors/center/18/" },
      { label: "NTTドコモビジネス プレスリリース（2026年9月16日）", url: "https://www.ntt.com/about-us/press-releases/news/article/2026/0916.html" },
      { label: "NTTイノベーティブデバイス プレスリリース（2026年9月16日）", url: "http://www.ntt-innovative-devices.com/new/information/2026/9/kyushu_university_hospital_remote_surgery.html" },
      { label: "福岡県発表（2025年3月24日）", url: "https://www.pref.fukuoka.lg.jp/uploaded/attachment/251187.pdf" },
    ],
    theme: "connectivity",
  },
]

export const allFeatureTags = Array.from(
  new Set(features.flatMap((f) => f.tags))
)
