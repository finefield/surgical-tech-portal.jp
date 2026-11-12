import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { articles, type Article } from "@/data/articles"

export const metadata: Metadata = {
  title: "特集記事 | Surgical Tech Portal",
  description: "消化器外科の医局や手術支援技術の取り組みを、公開資料をもとに紹介します。",
}

function ArticleRow({ article }: { article: Article }) {
  return (
    <li>
      <a href={`/features/${article.slug}`} className="portal-row feature-card">
        <div>
          <p className="feature-name">{[article.prefecture, article.university, article.department].filter(Boolean).join(" ／ ")}</p>
          <h3>{article.title}</h3>
          {article.subtitle && <p>{article.subtitle}</p>}
        </div>
        <span aria-hidden="true">↗</span>
      </a>
    </li>
  )
}

export default function FeaturesPage() {
  const lead = articles.find((article) => article.slug === "feature-5")
  const domestic = articles.filter((article) => article.kind === "国内特集")
  const global = articles.filter((article) => article.kind === "海外編")

  return (
    <>
      <Header />
      <main className="portal-editorial pb-20">
        <section className="portal-hero">
          <img className="portal-hero-image" src="/connection.jpg" alt="" fetchPriority="high" />
          <div className="portal-width portal-hero-content">
            <h1>特集</h1>
            <p>手術室から、外科の技術が生まれる場所へ。消化器外科の取り組みを、公開資料からひもときます。</p>
            {lead && <a className="portal-text-link mt-5" href={`/features/${lead.slug}`}>{lead.title} →</a>}
          </div>
        </section>
        <div className="portal-width">
          <section aria-labelledby="domestic-features">
            <h2 className="portal-section-head" id="domestic-features">国内特集</h2>
            <ul className="feature-grid">{domestic.map((article) => <ArticleRow key={article.slug} article={article} />)}</ul>
          </section>
          <section aria-labelledby="global-features">
            <h2 className="portal-section-head" id="global-features">海外編</h2>
            <ul className="feature-grid">{global.map((article) => <ArticleRow key={article.slug} article={article} />)}</ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
