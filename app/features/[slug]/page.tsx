import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, MapPin, Tag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FormattedDescription } from "@/components/formatted-description"
import { articles, findArticle } from "@/data/articles"
import { facilities } from "@/data/facilities"

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = findArticle(slug)
  if (!article) return { title: "記事が見つかりません | Surgical Tech Portal" }
  return {
    title: `${article.title} | Surgical Tech Portal`,
    description: article.subtitle ?? article.title,
  }
}

export default async function FeatureArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = findArticle(slug)
  if (!article) notFound()

  // 同じ大学の医局ページがあればリンクする
  const related = facilities.find(
    (f) => article.university && f.university === article.university,
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-muted-foreground">
            <a href="/features" className="underline-offset-2 hover:underline">
              特集記事
            </a>
            <span className="mx-2">/</span>
            <span className="text-foreground">{article.kind}</span>
          </nav>

          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-md bg-neon-cyan/10 px-2 py-0.5 text-xs font-medium text-neon-cyan">
              {article.kind}
            </span>
            {article.prefecture && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {article.prefecture}
              </span>
            )}
            <span>
              {article.university} {article.department}
            </span>
          </div>

          <h1 className="mb-3 text-2xl font-bold leading-snug text-foreground sm:text-3xl">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="mb-4 text-base text-muted-foreground">{article.subtitle}</p>
          )}

          <div className="mb-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-sm font-medium text-neon-cyan"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-10 text-base">
            <FormattedDescription description={article.description} />
          </div>

          {related && (
            <div className="mb-10 rounded-xl border border-border/50 bg-secondary/30 p-5">
              <p className="mb-1 text-sm font-medium text-muted-foreground">
                関連する医局
              </p>
              <a
                href={`/facilities/${related.id}`}
                className="text-base font-semibold text-foreground underline-offset-2 hover:underline"
              >
                {related.university} {related.name} のページを見る
              </a>
              <p className="mt-1 text-sm text-muted-foreground">{related.headline}</p>
            </div>
          )}

          {article.refs.length > 0 && (
            <div className="mb-10">
              <h2 className="mb-2 text-sm font-medium text-muted-foreground">出典</h2>
              <ul className="space-y-1.5">
                {article.refs.map((ref, i) => (
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

          <div className="border-t border-border/50 pt-6">
            <a
              href="/features"
              className="inline-flex items-center gap-1 text-sm text-neon-cyan underline-offset-2 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              特集記事の一覧に戻る
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
