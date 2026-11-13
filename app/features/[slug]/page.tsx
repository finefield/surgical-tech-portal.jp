import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
import { FormattedDescription } from "@/components/formatted-description"
import { Header } from "@/components/header"
import { articles, findArticle } from "@/data/articles"
import { facilities } from "@/data/facilities"
import { databaseHref, facilityHref } from "@/lib/portal-themes"

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = findArticle((await params).slug)
  if (!article) return { title: "記事が見つかりません | Surgical Tech Portal" }
  return { title: `${article.title} | Surgical Tech Portal`, description: article.subtitle || article.title }
}

export default async function FeatureArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = findArticle((await params).slug)
  if (!article) notFound()

  const keioFeature = article.slug === "feature-5"
  const related = keioFeature
    ? facilities.find(({ id }) => id === 74)
    : facilities.find((facility) => article.kind === "国内特集" && facility.university === article.university &&
      (facility.name.includes(article.department) || article.department.includes(facility.name)))
  const theme = keioFeature ? "connection" : undefined

  return (
    <>
      <Header />
      <main className="portal-editorial pb-20">
        <section className="portal-hero">
          <img className="portal-hero-image" src={keioFeature ? "/connection.jpg" : "/precision.jpg"} alt="" fetchPriority="high" />
          <div className="portal-width portal-hero-content">
            <nav className="portal-crumb" aria-label="現在の位置"><a href="/features">← 特集一覧</a></nav>
            <p className="portal-kicker">{[article.kind, article.prefecture, article.university, article.department].filter(Boolean).join(" ／ ")}</p>
            <h1>{article.title}</h1>
            {article.subtitle && <p>{article.subtitle}</p>}
          </div>
        </section>
        <div className="portal-width">
          <article className="portal-editorial-copy">
            <ul className="portal-tags mb-6" aria-label="記事のテーマ">{article.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            <FormattedDescription description={article.description} />
            {article.refs.length > 0 && (
              <section className="team-sources" aria-labelledby="feature-sources">
                <h2 id="feature-sources">出典</h2>
                <ul>{article.refs.map(({ label, url }) => (
                  <li key={url + label}><a href={url} target="_blank" rel="noopener noreferrer">{label} <span aria-hidden="true">↗</span></a></li>
                ))}</ul>
              </section>
            )}
            {related && (
              <section className="mt-8" aria-labelledby="feature-team">
                <h2 id="feature-team">関連する外科チーム</h2>
                <a className="portal-row" href={facilityHref(related.id, theme)}>{related.university} {related.name} <span aria-hidden="true">↗</span></a>
              </section>
            )}
            <a className="portal-text-link mt-6" href={databaseHref(theme)}>{theme ? "このテーマでほかのチームを探す" : "消化器外科チームを探す"} →</a>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
