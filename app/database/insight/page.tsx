import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { explorerMappings, explorerThemes, explorerTopics } from "@/data/explorer"
import styles from "./insight.module.css"

export const metadata: Metadata = {
  title: "見極める。｜画像・ナビゲーションから探す",
}

const theme = explorerThemes.find(({ key }) => key === "insight")!
const teams = explorerMappings
  .filter(({ theme }) => theme === "insight")
  .sort((a, b) => Number(a.inModal) - Number(b.inModal))

const topics = explorerTopics.insight ?? []

const path = "/database/insight"

export default async function InsightDiscovery({ searchParams }: {
  searchParams: Promise<{ topic?: string }>
}) {
  const { topic } = await searchParams
  const selected = topics.find(({ key }) => key === topic)
  const visibleTeams = selected?.teams ?? teams

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.art} aria-hidden="true" style={{ backgroundImage: `url(${theme.image})` }} />
        <div className={styles.inner}>
          <nav className={styles.breadcrumb} aria-label="現在地">
            <Link href="/#st-top-insight">TOP</Link><span aria-hidden="true">/</span>
            <span aria-current="page">見極める。</span>
          </nav>
          <header className={styles.heading}>
            <p>画像・ナビゲーション</p>
            <h1>見極める。</h1>
            <p className={styles.intro}>気になる取り組みから、外科チームを探す。</p>
          </header>

          <nav className={styles.topics} aria-label="取り組みで絞り込む">
            {topics.map(({ key, label }) => (
              <Link key={key} href={`${path}?topic=${key}`} scroll={false} aria-current={key === selected?.key ? "true" : undefined}>
                <span className={styles.dot} aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>

          <section aria-labelledby="insight-results" className={styles.results}>
            <div className={styles.resultBar}>
              <h2 id="insight-results" aria-live="polite">
                {selected?.label ?? "すべての取り組み"} <span>{visibleTeams.length}チーム</span>
              </h2>
              {selected && <Link href={path} scroll={false}>絞り込みを解除</Link>}
            </div>
            <ul key={selected?.key ?? "all"} className={styles.teams}>
              {visibleTeams.map((team) => (
                <li key={team.facilityId} className={styles.team}>
                  <Link href={`/facilities/${team.facilityId}?theme=insight`}>
                    <span className={styles.teamTopic}>{team.topic}</span>
                    <h3>{team.name}</h3>
                    <p>{team.summary}</p>
                    <span className={styles.arrow} aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <div className={styles.other}>
            <Link href="/database?theme=insight">一覧で見る <span aria-hidden="true">→</span></Link>
            <Link href="/database">全国の消化器外科チームを探す <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </main>
    </>
  )
}
