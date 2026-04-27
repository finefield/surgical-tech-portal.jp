export interface Reference {
  label: string
  url: string
}

export interface OfficialWebsite {
  label: string
  url: string
}

export interface Facility {
  id: number
  area: string
  prefecture: string
  university: string
  name: string
  tags: string[]
  headline: string
  description: string
  officialWebsite?: OfficialWebsite
  references: Reference[]
}

export const facilities: Facility[] = [
  // 群馬県（2医局）
  {
    id: 51,
    area: "関東",
    prefecture: "群馬県",
    university: "群馬大学",
    name: "消化器・肝臓・膵臓外科学",
    tags: ["ロボット支援手術", "da Vinci", "低侵襲外科", "肝胆膵外科"],
    headline: "ロボット支援手術で消化器・肝胆膵疾患の治療を進化させる",
    description: `■ 医局の紹介
群馬大学 消化器・肝臓・膵臓外科学は、消化管、肝臓、胆道、膵臓の疾患に対する高度な外科治療を提供する医局です。ロボット支援手術などの低侵襲手術を積極的に導入し、患者への負担を抑えた治療を実践しています。

■ DX・テクノロジーの取り組み
【Robotic Surgery】
da Vinci Xiを用いたロボット支援手術を導入し、消化管および肝胆膵領域における低侵襲手術を推進しています。

【Minimally Invasive Approach】
腹腔鏡下手術からロボット支援手術まで、患者の状態に応じた最適な治療を提供しています。

■ 実績・スタッツ
導入ロボット： da Vinci Xi
主な領域： 食道、胃、大腸、肝臓、胆道、膵臓疾患`,
    officialWebsite: {
      label: "群馬大学 消化器・肝臓・膵臓外科学 公式Webサイト",
      url: "https://gunma-digestive-surgery.jp/"
    },
    references: [
      { label: "群馬大学 消化器・肝臓・膵臓外科学 公式Webサイト", url: "https://gunma-digestive-surgery.jp/" },
    ],
  },
  {
    id: 52,
    area: "関東",
    prefecture: "群馬県",
    university: "日本赤十字社医療センター",
    name: "外科",
    tags: ["消化器外科", "ロボット支援手術", "腹腔鏡手術", "高難度手術"],
    headline: "地域の中核医療機関として、高度な消化器外科医療を提供",
    description: `■ 医局の紹介
日本赤十字社医療センター 外科は、消化器疾患に対する高度な外科治療を提供する診療科です。ロボット支援手術や腹腔鏡手術を含む低侵襲手術に取り組み、地域医療の質向上を目指しています。

■ DX・テクノロジーの取り組み
【Low Invasive Surgery】
腹腔鏡手術やロボット支援手術を積極的に導入し、患者への負担を軽減しています。

■ 実績・スタッツ
主な領域： 消化器疾患、高難度手術`,
    officialWebsite: {
      label: "日本赤十字社医療センター 外科 公式ページ",
      url: "https://www.med.jrc.or.jp/"
    },
    references: [
      { label: "日本赤十字社医療センター 外科", url: "https://www.med.jrc.or.jp/" },
    ],
  },

  // 埼玉県（3医局）
  {
    id: 53,
    area: "関東",
    prefecture: "埼玉県",
    university: "埼玉医科大学",
    name: "消化器・一般外科学講座",
    tags: ["ロボット支援手術", "da Vinci", "腹腔鏡手術", "内視鏡外科"],
    headline: "ロボット支援手術と内視鏡外科で低侵襲治療を推進",
    description: `■ 医局の紹介
埼玉医科大学 消化器・一般外科学講座は、消化管、肝胆膵、および一般外科疾患に対する外科治療を担う講座です。ロボット支援手術や腹腔鏡下手術などの低侵襲手術を積極的に導入し、高度な外科医療を提供しています。

■ DX・テクノロジーの取り組み
【Robotic & Minimally Invasive Surgery】
da Vinci Xiを用いたロボット支援手術を導入し、消化器疾患の治療に活用しています。

■ 実績・スタッツ
導入ロボット： da Vinci Xi
主な領域： 食道、胃、大腸、肝胆膵疾患`,
    officialWebsite: {
      label: "埼玉医科大学 消化器・一般外科学講座 公式ページ",
      url: "https://www.saitama-med.ac.jp/"
    },
    references: [
      { label: "埼玉医科大学 消化器・一般外科学講座", url: "https://www.saitama-med.ac.jp/" },
    ],
  },
  {
    id: 54,
    area: "関東",
    prefecture: "埼玉県",
    university: "埼玉医科大学国際医療センター",
    name: "消化管外科",
    tags: ["ロボット支援手術", "消化管外科", "高難度手術", "低侵襲手術"],
    headline: "国際水準の高度な消化管外科医療を提供",
    description: `■ 医局の紹介
埼玉医科大学国際医療センター 消化管外科は、食道、胃、小腸、大腸などの消化管疾患に対する高度な外科治療を提供する専門部門です。ロボット支援手術を含む最新のテクノロジーを活用し、国際水準の医療を実践しています。

■ DX・テクノロジーの取り組み
【Advanced Digestive Surgery】
ロボット支援手術、腹腔鏡下手術など、最新の低侵襲手術技術を導入しています。

■ 実績・スタッツ
主な領域： 食道がん、胃がん、大腸がん、消化管疾患`,
    officialWebsite: {
      label: "埼玉医科大学国際医療センター 消化管外科 公式ページ",
      url: "https://www.saitama-med.ac.jp/imc/"
    },
    references: [
      { label: "埼玉医科大学国際医療センター 消化管外科", url: "https://www.saitama-med.ac.jp/imc/" },
    ],
  },
  {
    id: 55,
    area: "関東",
    prefecture: "埼玉県",
    university: "防衛医科大学校",
    name: "第一外科学",
    tags: ["消化器外科", "ロボット支援手術", "腹腔鏡手術", "地域医療"],
    headline: "防衛医科大学校の高度外科医療と地域貢献",
    description: `■ 医局の紹介
防衛医科大学校 第一外科学は、消化器疾患に対する高度な外科治療を提供する医局です。ロボット支援手術などの最新技術を導入しながら、地域医療への貢献を重視しています。

■ DX・テクノロジーの取り組み
【Modern Surgical Technology】
ロボット支援手術や腹腔鏡手術などの低侵襲手術を積極的に実践しています。

■ 実績・スタッツ
主な領域： 消化器疾患、高難度手術`,
    officialWebsite: {
      label: "防衛医科大学校 第一外科学 公式ページ",
      url: "https://www.dfmc.ac.jp/"
    },
    references: [
      { label: "防衛医科大学校 第一外科学", url: "https://www.dfmc.ac.jp/" },
    ],
  },

  // 千葉県（2医局）
  {
    id: 56,
    area: "関東",
    prefecture: "千葉県",
    university: "千葉大学",
    name: "臓器制御外科学",
    tags: ["ロボット支援手術", "da Vinci", "肝胆膵外科", "低侵襲手術"],
    headline: "臓器制御外科学における先進的な外科治療",
    description: `■ 医局の紹介
千葉大学 臓器制御外科学は、消化器疾患、肝胆膵疾患、および臓器移植に対する高度な外科治療を提供する講座です。ロボット支援手術などの最新テクノロジーを活用し、患者にとって最良の治療を実践しています。

■ DX・テクノロジーの取り組み
【Robotic & Advanced Surgery】
da Vinci Xiを用いたロボット支援手術を導入し、複雑な消化器・肝胆膵手術に対応しています。

■ 実績・スタッツ
導入ロボット： da Vinci Xi
主な領域： 食道、胃、大腸、肝臓、膵臓疾患、移植医療`,
    officialWebsite: {
      label: "千葉大学 臓器制御外科学 公式ページ",
      url: "https://www.chiba-u.ac.jp/"
    },
    references: [
      { label: "千葉大学 臓器制御外科学", url: "https://www.chiba-u.ac.jp/" },
    ],
  },
  {
    id: 57,
    area: "関東",
    prefecture: "千葉県",
    university: "東京医科歯科大学",
    name: "消化器外科学分野",
    tags: ["ロボット支援手術", "消化器外科", "内視鏡外科", "高難度手術"],
    headline: "東京医科歯科大学の先進的消化器外科医療",
    description: `■ 医局の紹介
東京医科歯科大学 消化器外科学分野は、消化管、肝胆膵領域の疾患に対する高度な外科治療を提供する分野です。ロボット支援手術や内視鏡外科など、最新の治療技術を積極的に導入しています。

■ DX・テクノロジーの取り組み
【Advanced Minimally Invasive Surgery】
ロボット支援手術、腹腔鏡下手術、内視鏡手術などの低侵襲手術を推進しています。

■ 実績・スタッツ
主な領域： 消化管がん、肝胆膵疾患`,
    officialWebsite: {
      label: "東京医科歯科大学 消化器外科学分野 公式ページ",
      url: "https://www.tmd.ac.jp/"
    },
    references: [
      { label: "東京医科歯科大学 消化器外科学分野", url: "https://www.tmd.ac.jp/" },
    ],
  },

  // 神奈川県（5医局）
  {
    id: 58,
    area: "関東",
    prefecture: "神奈川県",
    university: "横浜市立大学",
    name: "消化器・腫瘍外科学",
    tags: ["ロボット支援手術", "da Vinci", "肝胆膵外科", "腫瘍外科"],
    headline: "ロボット支援手術で消化器腫瘍医療を革新",
    description: `■ 医局の紹介
横浜市立大学 消化器・腫瘍外科学は、消化器がん、肝胆膵がん、および腫瘍疾患に対する高度な外科治療を提供する医局です。ロボット支援手術を中心としたテクノロジーを活用し、患者にとって最適な治療を実践しています。

■ DX・テクノロジーの取り組み
【Robotic Tumor Surgery】
da Vinci Xiを用いたロボット支援手術により、複雑な腫瘍手術に対応しています。

■ 実績・スタッツ
導入ロボット： da Vinci Xi
主な領域： 消化器がん、肝胆膵がん、腫瘍疾患`,
    officialWebsite: {
      label: "横浜市立大学 消化器・腫瘍外科学 公式ページ",
      url: "https://www.yokohama-cu.ac.jp/"
    },
    references: [
      { label: "横浜市立大学 消化器・腫瘍外科学", url: "https://www.yokohama-cu.ac.jp/" },
    ],
  },
  {
    id: 59,
    area: "関東",
    prefecture: "神奈川県",
    university: "聖マリアンナ医科大学",
    name: "消化器・一般外科学",
    tags: ["ロボット支援手術", "低侵襲外科", "消化器外科", "腹腔鏡手術"],
    headline: "聖マリアンナ医科大学の高度な消化器外科医療",
    description: `■ 医局の紹介
聖マリアンナ医科大学 消化器・一般外科学は、消化管、肝胆膵、および一般外科疾患に対する幅広い外科治療を提供する医局です。ロボット支援手術などの最新技術を導入し、患者にとって最適な治療を実践しています。

■ DX・テクノロジーの取り組み
【Modern Surgical Techniques】
ロボット支援手術や腹腔鏡下手術などの低侵襲手術を積極的に導入しています。

■ 実績・スタッツ
主な領域： 食道、胃、大腸、肝胆膵疾患`,
    officialWebsite: {
      label: "聖マリアンナ医科大学 消化器・一般外科学 公式ページ",
      url: "https://www.marianna.ac.jp/"
    },
    references: [
      { label: "聖マリアンナ医科大学 消化器・一般外科学", url: "https://www.marianna.ac.jp/" },
    ],
  },
  {
    id: 60,
    area: "関東",
    prefecture: "神奈川県",
    university: "北里大学",
    name: "外科学系消化器外科",
    tags: ["ロボット支援手術", "消化器外科", "低侵襲手術", "高難度手術"],
    headline: "北里大学の先進的消化器外科医療",
    description: `■ 医局の紹介
北里大学 外科学系消化器外科は、食道、胃、大腸、肝胆膵疾患に対する高度な外科治療を提供する診療科です。ロボット支援手術などの最新テクノロジーを活用し、低侵襲で質の高い外科医療を実践しています。

■ DX・テクノロジーの取り組み
【Advanced Low Invasive Surgery】
ロボット支援手術や腹腔鏡下手術を導入し、患者への負担を軽減しています。

■ 実績・スタッツ
主な領域： 消化管がん、肝胆膵疾患`,
    officialWebsite: {
      label: "北里大学 外科学系消化器外科 公式ページ",
      url: "https://www.kitasato-u.ac.jp/"
    },
    references: [
      { label: "北里大学 外科学系消化器外科", url: "https://www.kitasato-u.ac.jp/" },
    ],
  },
  {
    id: 61,
    area: "関東",
    prefecture: "神奈川県",
    university: "東海大学",
    name: "外科系 消化管外科",
    tags: ["ロボット支援手術", "消化管外科", "腹腔鏡手術", "内視鏡外科"],
    headline: "東海大学の革新的消化管外科医療",
    description: `■ 医局の紹介
東海大学 外科系 消化管外科は、食道、胃、小腸、大腸などの消化管疾患に対する高度な外科治療を提供する診療科です。ロボット支援手術を含む最新のテクノロジーを活用し、患者にとって最適な治療を実践しています。

■ DX・テクノロジーの取り組み
【Innovative Digestive Surgery】
ロボット支援手術や内視鏡外科など、最新の治療技術を導入しています。

■ 実績・スタッツ
主な領域： 食道がん、胃がん、大腸がん、消化管疾患`,
    officialWebsite: {
      label: "東海大学 外科系 消化管外科 公式ページ",
      url: "https://www.tokai-u.ac.jp/"
    },
    references: [
      { label: "東海大学 外科系 消化管外科", url: "https://www.tokai-u.ac.jp/" },
    ],
  },
  {
    id: 62,
    area: "関東",
    prefecture: "神奈川県",
    university: "帝京大学",
    name: "消化器・肝臓・胆膵外科学",
    tags: ["ロボット支援手術", "肝胆膵外科", "消化器外科", "低侵襲手術"],
    headline: "帝京大学の高度な消化器・肝胆膵外科医療",
    description: `■ 医局の紹介
帝京大学 消化器・肝臓・胆膵外科学は、消化管、肝臓、胆道、膵臓疾患に対する高度な外科治療を提供する医局です。ロボット支援手術などの最新テクノロジーを活用し、患者にとって最良の治療を実践しています。

■ DX・テクノロジーの取り組み
【Advanced HBP Surgery】
ロボット支援手術を導入し、複雑な肝胆膵手術に対応しています。

■ 実績・スタッツ
主な領域： 消化管がん、肝胆膵疾患`,
    officialWebsite: {
      label: "帝京大学 消化器・肝臓・胆膵外科学 公式ページ",
      url: "https://www.teikyo-u.ac.jp/"
    },
    references: [
      { label: "帝京大学 消化器・肝臓・胆膵外科学", url: "https://www.teikyo-u.ac.jp/" },
    ],
  },
]

export const areas = ["北海道", "東北", "関東", "中部", "近畿", "中国", "四国", "九州"]

export const prefectureOrder: { [key: string]: number } = {
  北海道: 0,
  青森県: 1,
  岩手県: 2,
  宮城県: 3,
  秋田県: 4,
  山形県: 5,
  福島県: 6,
  茨城県: 7,
  栃木県: 8,
  群馬県: 9,
  埼玉県: 10,
  千葉県: 11,
  東京都: 12,
  神奈川県: 13,
}
