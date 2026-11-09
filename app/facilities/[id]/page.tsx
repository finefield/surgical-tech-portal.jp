import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, MapPin, Tag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FormattedDescription } from "@/components/formatted-description"
import { facilities, prefectureOrder } from "@/data/facilities"

const sorted = [...facilities].sort((a, b) => {
  const ai = prefectureOrder.indexOf(a.prefecture)
  const bi = prefectureOrder.indexOf(b.prefecture)
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
})

function findFacility(id: string) {
  return facilities.find((f) => f.id === Number(id))
}

export function generateStaticParams() {
  return facilities.map((f) => ({ id: String(f.id) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const facility = findFacility(id)
  if (!facility) return { title: "医局が見つかりません | Surgical Tech Portal" }
  return {
    title: `${facility.university} ${facility.name} | Surgical Tech Portal`,
    description: `${facility.prefecture}・${facility.university} ${facility.name}のDX・テクノロジーの取り組み。${facility.headline}`,
  }
}

export default async function FacilityPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const facility = findFacility(id)
  if (!facility) notFound()

  const index = sorted.findIndex((f) => f.id === facility.id)
  const prev = index > 0 ? sorted[index - 1] : null
  const next = index < sorted.length - 1 ? sorted[index + 1] : null

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-muted-foreground">
            <a href="/database" className="underline-offset-2 hover:underline">
              データベース
            </a>
            <span className="mx-2">/</span>
            <span>{facility.prefecture}</span>
            <span className="mx-2">/</span>
            <span className="text-foreground">{facility.university}</span>
          </nav>

          {/* Area & Prefecture */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-sm text-neon-cyan">
              <MapPin className="h-4 w-4" />
              {facility.area}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-secondary/80 px-3 py-1 text-sm text-muted-foreground">
              {facility.prefecture}
            </span>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
            {facility.university}
          </h1>
          <p className="mb-4 text-lg text-muted-foreground">{facility.name}</p>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {facility.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-sm font-medium text-neon-cyan"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Headline */}
          <div className="mb-6 rounded-xl border border-border/50 bg-secondary/30 p-4">
            <h2 className="mb-2 text-sm font-medium text-muted-foreground">
              最新の取り組み
            </h2>
            <p className="text-lg font-semibold text-foreground">{facility.headline}</p>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-medium text-muted-foreground">
              取り組み内容
            </h2>
            <div className="text-base">
              <FormattedDescription description={facility.description} />
            </div>
          </div>

          {/* Official Website */}
          {facility.officialWebsite && (
            <div className="mb-6">
              <h2 className="mb-2 text-sm font-medium text-muted-foreground">
                医局公式Webサイト
              </h2>
              <a
                href={facility.officialWebsite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1.5 text-sm text-neon-cyan transition-colors hover:bg-neon-cyan/20"
              >
                {facility.officialWebsite.label}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          )}

          {/* References */}
          {facility.references && facility.references.length > 0 && (
            <div className="mb-10">
              <h2 className="mb-2 text-sm font-medium text-muted-foreground">参照元</h2>
              <ul className="space-y-1.5">
                {facility.references.map((ref, i) => (
                  <li key={i}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
                    >
                      <span className="text-muted-foreground/50">・</span>
                      {ref.label}
                      <ArrowUpRight className="h-3 w-3 flex-shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prev / Next */}
          <div className="flex items-center justify-between gap-4 border-t border-border/50 pt-6">
            {prev ? (
              <a
                href={`/facilities/${prev.id}`}
                className="text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              >
                ← {prev.university} {prev.name}
              </a>
            ) : (
              <span />
            )}
            <a
              href="/database"
              className="inline-flex items-center gap-1 text-sm text-neon-cyan underline-offset-2 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              一覧に戻る
            </a>
            {next ? (
              <a
                href={`/facilities/${next.id}`}
                className="text-right text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              >
                {next.university} {next.name} →
              </a>
            ) : (
              <span />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
