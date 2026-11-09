import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { facilities, areas, type Facility } from "@/data/facilities"

export const metadata: Metadata = {
  title: "データで見る 日本の消化器外科DX | Surgical Tech Portal",
  description:
    "収録している全国の消化器外科系医局のデータをもとに、ロボット支援手術の広がりや手術支援ロボットの機種別記載状況、技術タグ・地域別の収録状況を集計したページです。",
}

// 集計の基準日（掲載情報の全件照合を行った日）
const VERIFIED_DATE = "2026年11月9日"

function blob(f: Facility): string {
  return [f.name, f.headline, f.description, ...f.tags].join("\n")
}

function countWhere(pred: (f: Facility) => boolean): number {
  return facilities.filter(pred).length
}

function pct(n: number): string {
  return `${((n / facilities.length) * 100).toFixed(1)}%`
}

const MACHINES: { name: string; patterns: string[]; note: string }[] = [
  {
    name: "da Vinci（ダヴィンチ）",
    patterns: ["da Vinci", "ダヴィンチ", "ダビンチ"],
    note: "Intuitive 社の手術支援ロボット。収録カード内で機種名が明記されている医局を数えています。",
  },
  {
    name: "hinotori（ヒノトリ）",
    patterns: ["hinotori", "ヒノトリ"],
    note: "メディカロイド社の国産手術支援ロボット。収録カード内で機種名が明記されている医局を数えています。",
  },
  {
    name: "Saroa（サロア）",
    patterns: ["Saroa", "サロア"],
    note: "リバーフィールド社の手術支援ロボット（空気圧駆動・力覚フィードバック）。収録カード内で機種名が明記されている医局を数えています。",
  },
]

export default function InsightsPage() {
  const total = facilities.length
  const prefectures = new Set(facilities.map((f) => f.prefecture)).size
  const robotCount = countWhere((f) => blob(f).includes("ロボット支援手術"))
  const lapCount = countWhere((f) => blob(f).includes("腹腔鏡手術"))

  const machineLists = MACHINES.map((m) => {
    const list = facilities.filter((f) =>
      m.patterns.some((p) => blob(f).includes(p)),
    )
    return { ...m, list }
  })

  const tagCounts = new Map<string, number>()
  for (const f of facilities) {
    for (const t of f.tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
  }
  const topTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)

  const areaCounts = areas.map((a) => ({
    area: a,
    count: facilities.filter((f) => f.area === a).length,
  }))

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Insights
            </p>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              データで見る 日本の消化器外科DX
            </h1>
            <p className="max-w-3xl leading-relaxed text-muted-foreground">
              本ページの数値は、Surgical Tech Portal
              に収録している医局データ（{total}
              医局）から自動集計したものです。各医局の掲載情報は、大学・病院等の公式情報を出典としており、{VERIFIED_DATE}
              に全件の照合を行いました。集計方法の注意点はページ末尾に記載しています。
            </p>
          </div>

          {/* 主要指標 */}
          <div className="mb-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "収録医局", value: `${total}`, unit: "医局" },
              { label: "収録のある都道府県", value: `${prefectures}`, unit: "都道府県" },
              {
                label: "ロボット支援手術への言及がある医局",
                value: `${robotCount}`,
                unit: `医局（${pct(robotCount)}）`,
              },
              {
                label: "腹腔鏡手術への言及がある医局",
                value: `${lapCount}`,
                unit: `医局（${pct(lapCount)}）`,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border/50 bg-secondary/30 px-5 py-5"
              >
                <p className="mb-1 text-xs text-muted-foreground">{s.label}</p>
                <p className="text-3xl font-bold text-foreground">
                  {s.value}
                  <span className="ml-1 text-sm font-medium text-muted-foreground">
                    {s.unit}
                  </span>
                </p>
              </div>
            ))}
          </div>

          {/* 機種別 */}
          <section className="mb-14">
            <h2 className="mb-2 text-xl font-bold tracking-tight text-foreground">
              手術支援ロボット 機種別の記載状況
            </h2>
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              収録カードの本文・タグに機種名が明記されている医局の一覧です。ロボット支援手術に取り組んでいても、公式情報に機種名の記載がない医局は含まれません（導入の有無そのものを示す一覧ではありません）。
            </p>
            <div className="space-y-8">
              {machineLists.map((m) => (
                <div
                  key={m.name}
                  className="rounded-xl border border-border/50 bg-secondary/20 p-6"
                >
                  <div className="mb-1 flex flex-wrap items-baseline gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{m.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      {m.list.length} 医局
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">{m.note}</p>
                  <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                    {m.list.map((f) => (
                      <li key={f.id} className="text-sm">
                        <a
                          href={`/facilities/${f.id}`}
                          className="text-foreground underline-offset-2 hover:underline"
                        >
                          {f.university} {f.name}
                        </a>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {f.prefecture}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 技術タグ */}
          <section className="mb-14">
            <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground">
              技術タグ別の収録状況（上位）
            </h2>
            <div className="overflow-hidden rounded-xl border border-border/50">
              <table className="w-full text-sm">
                <tbody>
                  {topTags.map(([tag, count], i) => (
                    <tr
                      key={tag}
                      className={i % 2 === 0 ? "bg-secondary/20" : ""}
                    >
                      <td className="px-5 py-3 text-foreground">{tag}</td>
                      <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">
                        {count} 医局
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 地域別 */}
          <section className="mb-14">
            <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground">
              地域別の収録状況
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {areaCounts.map((a) => (
                <div
                  key={a.area}
                  className="rounded-xl border border-border/50 bg-secondary/30 px-5 py-4"
                >
                  <p className="mb-1 text-xs text-muted-foreground">{a.area}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {a.count}
                    <span className="ml-1 text-sm font-medium text-muted-foreground">
                      医局
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 集計方法 */}
          <section className="rounded-xl border border-border/50 bg-secondary/20 p-6">
            <h2 className="mb-3 text-base font-semibold text-foreground">
              集計方法と出典について
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                数値はすべて、収録データ（{total}
                医局）から表示のたびに自動集計しています。手作業で固定した数値は使っていません。
              </li>
              <li>
                各医局の掲載情報の出典は、大学・病院・医局の公式ページ等です。{VERIFIED_DATE}
                に全件を公式情報と照合し、裏付けの取れない記載は削除・訂正しました。
              </li>
              <li>
                「言及がある医局」は、カード本文・見出し・タグに該当語が含まれる医局の数です。実施規模や件数の大小を示すものではありません。
              </li>
              <li>
                掲載情報は定期的に再確認し、変更があればデータベースと
                <a href="/" className="underline underline-offset-2">
                  更新情報
                </a>
                に反映します。誤りにお気づきの場合は
                <a href="/contact" className="underline underline-offset-2">
                  お問い合わせ
                </a>
                からご連絡ください。
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
