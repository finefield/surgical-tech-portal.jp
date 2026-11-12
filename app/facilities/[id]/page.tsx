import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { CSSProperties } from "react"
import { Footer } from "@/components/footer"
import { FormattedDescription } from "@/components/formatted-description"
import { Header } from "@/components/header"
import { articles } from "@/data/articles"
import { facilities, getPrefectureIndex } from "@/data/facilities"
import { databaseHref, facilityHref, facilityTopics, parseTheme, themeExamples, themeKeys, themes } from "@/lib/portal-themes"

const sorted = [...facilities].sort((a, b) => getPrefectureIndex(a.prefecture) - getPrefectureIndex(b.prefecture))

function findFacility(id: string) {
  return facilities.find((facility) => String(facility.id) === id)
}

export function generateStaticParams() {
  return facilities.map(({ id }) => ({ id: String(id) }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const facility = findFacility((await params).id)
  if (!facility) return { title: "医局が見つかりません | Surgical Tech Portal" }
  return {
    title: `${facility.university} ${facility.name} | Surgical Tech Portal`,
    description: facility.headline,
    alternates: { canonical: facilityHref(facility.id) },
  }
}

const careerLinks: Record<number, { label: string; url: string }[]> = {
  74: [
    { label: "外科専門研修・募集要項", url: "https://www.keio.ac.jp/ja/med/about/sotsugo/senior-resident-center/" },
    { label: "外科学教室の見学案内", url: "https://keiosurg-shokikenshui.com/recruit/recruit01.html" },
  ],
  22: [{ label: "消化器外科の臨床実習", url: "https://www.hosp.gifu-u.ac.jp/origin/2geka/clinical_training/" }],
}

function ExternalLink({ url, label }: { url: string; label: string }) {
  return <a href={url} target="_blank" rel="noopener noreferrer">{label} <span aria-hidden="true">↗</span></a>
}

export default async function FacilityPage({ params, searchParams }: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ theme?: string | string[] }>
}) {
  const [{ id }, { theme: inputTheme }] = await Promise.all([params, searchParams])
  const facility = findFacility(id)
  if (!facility) notFound()

  const requested = typeof inputTheme === "string" ? parseTheme(inputTheme) : undefined
  const supportedThemes = themeKeys.filter((key) => facilityTopics(facility, key).length)
  const theme = requested && supportedThemes.includes(requested) ? requested : undefined
  const visual = theme ?? supportedThemes[0]
  const example = theme && themeExamples[theme].find((item) => item.id === facility.id)
  const related = articles.filter((article) => facility.id === 74
    ? article.slug === "feature-5"
    : article.kind === "国内特集" && article.university === facility.university &&
      (facility.name.includes(article.department) || article.department.includes(facility.name))).slice(0, 2)
  const index = sorted.findIndex((item) => item.id === facility.id)
  const nearby = theme
    ? sorted.filter((item) => item.id !== facility.id && facilityTopics(item, theme).length).slice(0, 2)
    : [sorted[index - 1], sorted[index + 1]].filter(Boolean)
  const career = careerLinks[facility.id] ?? []

  return (
    <>
      <Header />
      <main className="team-page" style={{ "--portal-accent": visual ? themes[visual].color : "#b9e9ef" } as CSSProperties}>
        <section className="portal-hero team-hero">
          {visual && <img className="portal-hero-image" src={`/${visual}.jpg`} alt="" fetchPriority="high" />}
          <div className="portal-width portal-hero-content">
            <nav className="portal-crumb" aria-label="現在の位置">
              <a href={databaseHref(theme)}>← {theme ? themes[theme].label : "消化器外科チームを探す"}</a>
            </nav>
            <p className="portal-kicker">{facility.prefecture}{theme ? ` ／ ${themes[theme].word}` : ""}</p>
            <h1>{facility.university}<span>{facility.name}</span></h1>
            <p className="team-headline">{example?.summary ?? facility.headline}</p>
            {example && <div className="team-hero-source"><ExternalLink label="この取り組みの出典" url={example.source} /></div>}
          </div>
        </section>

        <div className="portal-width team-body">
          <div className="team-reading">
            {facility.tags.length > 0 && <ul className="portal-tags" aria-label="掲載タグ">{facility.tags.map((tag) => (
              <li key={tag}><a href={`/database?q=${encodeURIComponent(tag)}`}>{tag}</a></li>
            ))}</ul>}
            <section aria-labelledby="team-work">
              <h2 id="team-work">チームの取り組み</h2>
              <div className="team-description"><FormattedDescription description={facility.description} /></div>
            </section>
            {facility.references.length > 0 && (
              <section className="team-sources" aria-labelledby="team-sources">
                <h2 id="team-sources">出典</h2>
                <ul>{facility.references.map((reference) => <li key={reference.url + reference.label}><ExternalLink {...reference} /></li>)}</ul>
              </section>
            )}
          </div>

          <aside className="team-aside" aria-label="関連情報">
            {(facility.officialWebsite || career.length > 0) && (
              <section>
                <h2>このチームをもっと知る</h2>
                <ul>
                  {facility.officialWebsite && <li><ExternalLink label="医局・診療科の公式サイト" url={facility.officialWebsite.url} /></li>}
                  {career.map((link) => <li key={link.url}><ExternalLink {...link} /></li>)}
                </ul>
              </section>
            )}
            {related.length > 0 && (
              <section>
                <h2>特集で読む</h2>
                <ul>{related.map((article) => <li key={article.slug}><a href={`/features/${article.slug}`}>{article.title} →</a></li>)}</ul>
              </section>
            )}
          </aside>
        </div>

        {nearby.length > 0 && <section className="portal-width team-related" aria-labelledby="team-more">
          <h2 id="team-more">{theme ? "同じテーマのチーム" : "ほかの消化器外科チーム"}</h2>
          <ul>{nearby.map((item) => <li key={item.id}><a className="portal-row" href={facilityHref(item.id, theme)}>{item.university} {item.name} <span aria-hidden="true">↗</span></a></li>)}</ul>
          <a className="portal-text-link" href={databaseHref(theme)}>消化器外科チームを探す →</a>
        </section>}
      </main>
      <Footer />
    </>
  )
}
