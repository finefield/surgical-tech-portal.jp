import type { Facility } from "@/data/facilities"

export const themes = {
  insight: { word: "見極める。", english: "INSIGHT", label: "画像・ナビゲーション", intro: "肝切除の術前計画に、CT画像の3D解析を活用する医局・診療科。", line: "見える。その先を、見極める。", color: "#a6edff" },
  preserve: { word: "残す。", english: "PRESERVE", label: "機能温存・再建", intro: "胃がんや直腸がんの手術で、機能温存に取り組む外科チーム。", line: "その先の暮らしに、何を残せるか。", color: "#dcc9ff" },
  precision: { word: "挑む。", english: "PRECISION", label: "AI・機器開発", intro: "手術支援AIの研究や、新しい機器の開発に取り組む外科チーム。", line: "挑戦を支えるのは、精密さだ。", color: "#bdf7df" },
  connection: { word: "つなぐ。", english: "CONNECTION", label: "手術教育・技術継承", intro: "手術映像や遠隔支援を活用し、外科の技術を次へつなぐ取り組み。", line: "技術をつなぐ。経験をつなぐ。", color: "#c4d7ff" },
  life: { word: "その先の人生へ。", english: "LIFE BEYOND", label: "術後の暮らし・連携", intro: "地域でのフォロー、専門外来、患者向けの情報。手術後の暮らしを支える取り組み。", line: "手術のあとも、日々はつづく。", color: "#ffe4b4" },
} as const

export type Theme = keyof typeof themes
export const themeKeys = Object.keys(themes) as Theme[]

export function parseTheme(value: string | undefined): Theme | undefined {
  return themeKeys.find((key) => key === value)
}

export function databaseHref(theme?: Theme) {
  return theme ? `/database?theme=${theme}` : "/database"
}

export function facilityHref(id: number, theme?: Theme) {
  return `/facilities/${id}${theme ? `?theme=${theme}` : ""}`
}

type Evidence = {
  id: number
  topic: string
  summary: string
  source: string
}

// Each example is tied to the named team's public material.
export const themeExamples: Record<Theme, Evidence[]> = {
  insight: [
    { id: 25, topic: "術前3D画像", summary: "CT画像を3D構築し、術前シミュレーションに活用。", source: "https://nagoya-cu-gs.jp/treatment/hbps.php" },
    { id: 15, topic: "術前3D画像", summary: "肝切除の術前計画で、血管の走行や切除範囲を3D画像で検討。", source: "https://www.med.niigata-u.ac.jp/su1/wp-content/uploads/2025/11/35dc0decd8af7bba5be71af3b03f32ce.pdf" },
    { id: 910, topic: "術中ナビゲーション", summary: "肝胆膵手術で、ICG蛍光法や3Dナビゲーションを活用。", source: "https://www.surgery.med.saga-u.ac.jp/group/27.html" },
  ],
  preserve: [
    { id: 35, topic: "胃の機能温存", summary: "早期胃がんの治療で、胃の機能温存を考慮した術式を選択肢として紹介。", source: "https://hp.kmu.ac.jp/treatment/departments/upper_gastrointestinal_surgery/" },
    { id: 32, topic: "胃の機能温存", summary: "胃外科が、幽門保存胃切除や噴門側胃切除を紹介。", source: "https://sites.google.com/koto.kpu-m.ac.jp/digestivesurgery/診療チーム/胃外科" },
    { id: 94, topic: "直腸の機能温存", summary: "直腸がんの手術で、自律神経の温存に取り組む。", source: "https://www.oita-gp-surgery.jp/specialty/01.html" },
  ],
  precision: [
    { id: 958, topic: "手術支援AI", summary: "術野の構造を強調する手術支援AI「SurVis-Pel」を共同開発。", source: "https://pod.ncc.go.jp/jp/information/pr_release/2026/0325/index.html" },
    { id: 74, topic: "手術支援AI", summary: "上部消化管班の外科医が手術映像を説明する生成AIの開発に参加。胃がん手術で実証試験を実施。", source: "https://www.nedo.go.jp/news/press/AA5_101924.html" },
    { id: 5, topic: "遠隔手術支援", summary: "離れた場所の専門医がロボット支援手術を支える臨床研究。", source: "https://hosp.hirosaki-u.ac.jp/6335/" },
  ],
  connection: [
    { id: 74, topic: "手術映像・AI教育", summary: "上部消化管班の外科医が、手術映像を言葉にする生成AIの開発に参加。手術教育への活用を目指す。", source: "https://geniac.meti.go.jp/geniac_magazine/usecase_03.html" },
    { id: 22, topic: "AR・VR教材", summary: "学生実習で、ARの解剖教材やVR・3D手術映像を活用。", source: "https://www.hosp.gifu-u.ac.jp/origin/2geka/clinical_training/" },
    { id: 27, topic: "卒後研修", summary: "消化器外科の基礎やロボット・内視鏡手術を含む研修を案内。", source: "https://www.fujita-hu.ac.jp/~kenshui/media/2025072-124743-417.pdf" },
    { id: 5, topic: "遠隔手術支援", summary: "離れた場所の専門医がロボット支援手術を支える臨床研究。", source: "https://hosp.hirosaki-u.ac.jp/6335/" },
  ],
  life: [
    { id: 30, topic: "地域での術後フォロー", summary: "地域の医療機関と連携し、手術後の診察や検査を分担。", source: "https://www.kuhp.kyoto-u.ac.jp/department/departments/gastrointestinal-surgery.html" },
    { id: 17, topic: "専門外来", summary: "消化管外科の医師が、看護師らと創傷・ストーマ外来に参加。", source: "https://web.hosp.kanazawa-u.ac.jp/patients/stoma.html" },
    { id: 961, topic: "患者向けの情報", summary: "胃の手術後の食事について、患者向けの情報を公開。", source: "https://www.jfcr.or.jp/hospital/cancer/type/stomach.html" },
  ],
}

// Only specific existing editorial tags qualify. A robot model or a generic
// clinical specialty is insufficient to place a team in a theme.
const topicTags: Record<Theme, [string, RegExp][]> = {
  insight: [
    ["術前3D画像", /3D(?:術前画像|画像解析|シミュレーション)|術前シミュレーション/i],
    ["術中ナビゲーション", /ICG.*(?:蛍光|ナビゲーション)|術中.*ナビゲーション/i],
  ],
  preserve: [["機能温存・再建", /機能温存手術|肛門温存|自律神経温存|幽門保存|胆道再建/]],
  precision: [["手術支援AI", /手術支援AI|AI手術支援|AIナビゲーション/i], ["遠隔手術支援", /遠隔手術支援|遠隔ロボット/]],
  connection: [["手術映像・AI教育", /手術映像教育|ビデオカンファレンス/], ["AR・VR教材", /AR解剖|VR解剖/], ["卒後研修", /トレーニングセンター|手術教育|ロボット手術教育/], ["遠隔手術支援", /遠隔手術支援|遠隔指導/]],
  life: [["地域での術後フォロー", /術後フォロー|地域連携パス/], ["専門外来", /ストーマ外来/]],
}

export function facilityTopics(facility: Pick<Facility, "id" | "tags">, theme: Theme) {
  const example = themeExamples[theme].find(({ id }) => id === facility.id)
  if (example) return [example.topic]
  return topicTags[theme].filter(([, pattern]) => facility.tags.some((tag) => pattern.test(tag))).map(([topic]) => topic)
}
