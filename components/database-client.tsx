"use client"

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, X } from "lucide-react"
import styles from "./database-client.module.css"
import { facilityHref } from "@/lib/portal-themes"
import { normalizeDirectorySearch, specialties } from "@/lib/directory-search"
import { prefectureOrder, type Facility } from "@/data/facilities"
import {
  explorerMappings,
  explorerThemes,
  explorerTopics,
  isExplorerThemeKey,
  type ExplorerMapping,
  type ExplorerViewKey,
} from "@/data/explorer"

const SERIF = '"Yu Mincho", "Hiragino Mincho ProN", serif'
const EDGE = "#304457"
const MUTED = "#b2c3d2"

// summary 冒頭の「段階｜」はメタ行の段階と重なるため、見本どおり本文では落とす
function stripSummaryPrefix(summary: string): string {
  const idx = summary.indexOf("｜")
  return idx >= 0 ? summary.slice(idx + 1) : summary
}

interface RowVM {
  facilityId: number
  prefecture: string
  area: string
  topics: string[]
  projectsByTopic?: ReadonlyMap<string, ExplorerMapping>
  specialties: (typeof specialties)[number][]
  inModal?: boolean
  meta: string
  feature: string
  institution: string
  department: string
  sourceUrl?: string
  sourceLabel?: string
  searchText: string
}

interface DatabaseClientProps {
  facilities: Facility[]
  areas: string[]
  initialTheme: ExplorerViewKey
  initialArea: string | null
  initialKeyword: string
  initialPrefecture: string
}

export function DatabaseClient({
  facilities,
  areas,
  initialTheme,
  initialArea,
  initialKeyword,
  initialPrefecture,
}: DatabaseClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [theme, setTheme] = useState<ExplorerViewKey>(initialTheme)
  const [topicKey, setTopic] = useState(searchParams.get("topic") ?? "")
  const [prefecture, setPrefecture] = useState(initialPrefecture)
  const [area, setArea] = useState<string | null>(initialArea)
  const [keyword, setKeyword] = useState(initialKeyword)
  const [currentPrefecture, setCurrentPrefecture] = useState("")
  const railRef = useRef<HTMLElement>(null)
  const groupsRef = useRef<HTMLDivElement>(null)

  const rowsByTheme = useMemo(() => {
    const map = new Map<ExplorerViewKey, RowVM[]>(explorerThemes.map(({ key }) => [key, []]))
    const mappingsByFacility = new Map<number, ExplorerMapping[]>()
    for (const mapping of explorerMappings) {
      const existing = mappingsByFacility.get(mapping.facilityId) ?? []
      existing.push(mapping)
      mappingsByFacility.set(mapping.facilityId, existing)
    }

    for (const facility of facilities) {
      const mappings = mappingsByFacility.get(facility.id) ?? []
      const publishedLabels = [facility.name, ...facility.tags].join(" ")
      const fields = specialties.filter(({ match }) => match.test(publishedLabels))
      const searchText = normalizeDirectorySearch([
        facility.university, facility.name, facility.headline, facility.description, facility.prefecture, facility.area,
        ...facility.tags, ...fields.map(({ label }) => label),
        ...mappings.flatMap(({ name, topic, headline, summary, description, technology }) => [name, topic, headline, summary, description, technology ?? ""]),
      ].join(" "))
      const common = {
        facilityId: facility.id,
        prefecture: facility.prefecture,
        area: facility.area,
        institution: facility.university,
        department: facility.name,
        specialties: fields,
        searchText,
      }
      const featured = mappings[0]
      const projectsByTopic = new Map<string, ExplorerMapping>()
      for (const mapping of mappings) {
        const labels = explorerTopics[mapping.theme]
          ?.filter(({ teams }) => teams.includes(mapping))
          .map(({ label }) => label) ?? []
        const topics = [...new Set([mapping.topic, ...labels])]
        for (const label of topics) {
          if (!projectsByTopic.has(label)) projectsByTopic.set(label, mapping)
        }
        map.get(mapping.theme)?.push({
          ...common,
          topics,
          inModal: mapping.inModal,
          meta: `${facility.prefecture} ／ ${mapping.topic} ／ ${mapping.stage}`,
          feature: stripSummaryPrefix(mapping.summary),
          sourceUrl: mapping.sourceUrl,
          sourceLabel: mapping.sourceLabel ?? "公式資料 ↗",
        })
      }
      map.get("all")?.push({
        ...common,
        topics: [...projectsByTopic.keys()],
        projectsByTopic,
        meta: [facility.prefecture, ...fields.map(({ label }) => label)].join(" ／ "),
        feature: featured ? stripSummaryPrefix(featured.summary) : facility.headline,
        sourceUrl: featured?.sourceUrl ?? facility.officialWebsite?.url,
        sourceLabel: featured ? featured.sourceLabel ?? "公式資料 ↗" : "公式サイト ↗",
      })
    }

    for (const [key, rows] of map) {
      if (key === "all") continue
      const position = new Map(explorerMappings.filter((mapping) => mapping.theme === key).map(({ facilityId }, index) => [facilityId, index]))
      rows.sort((a, b) => (position.get(a.facilityId) ?? 0) - (position.get(b.facilityId) ?? 0))
    }
    return map
  }, [facilities])

  const chapterMode = theme !== "all"
  const specialty = specialties.find(({ key }) => key === searchParams.get("specialty"))
  const activeTheme = explorerThemes.find((item) => item.key === theme) ?? explorerThemes[0]
  const accent = chapterMode ? activeTheme.accent : "#a7ece9"
  const themeRows = rowsByTheme.get(theme)
  const moreOnly = theme !== "all" && searchParams.get("view") === "more"
  const baseRows = useMemo(() => {
    const rows = themeRows ?? []
    if (moreOnly) return rows.filter((row) => !row.inModal)
    return rows
  }, [themeRows, moreOnly])
  const featuredCount = theme === "all" ? 0 : themeRows?.filter((row) => row.inModal).length ?? 0
  const topicOptions = [...new Set((themeRows ?? []).flatMap((row) => row.topics))]
  const topic = topicOptions.includes(topicKey) ? topicKey : ""
  const keywordTerms = normalizeDirectorySearch(keyword).trim().split(/\s+/).filter(Boolean)

  const filteredRows = baseRows.filter((row) => {
    if (topic && !row.topics.includes(topic)) return false
    if (specialty && !row.specialties.includes(specialty)) return false
    if (prefecture && row.prefecture !== prefecture) return false
    if (area && row.area !== area) return false
    return keywordTerms.every((term) => row.searchText.includes(term))
  })

  const hasFilters = Boolean(topic || prefecture || area || keywordTerms.length || specialty)

  // 「すべて」では都道府県単位の案内（見出し＋ジャンプ）を付ける
  const groupedByPrefecture = useMemo(() => {
    if (chapterMode) return null
    const groups: { prefecture: string; rows: RowVM[] }[] = []
    for (const p of prefectureOrder) {
      const rows = filteredRows.filter((r) => r.prefecture === p)
      if (rows.length) groups.push({ prefecture: p, rows })
    }
    const known = new Set(groups.map((g) => g.prefecture))
    for (const row of filteredRows) {
      if (!known.has(row.prefecture)) {
        groups.push({ prefecture: row.prefecture, rows: [row] })
        known.add(row.prefecture)
      }
    }
    return groups
  }, [chapterMode, filteredRows])

  useEffect(() => {
    const rail = railRef.current
    if (!rail || !groupsRef.current) return
    const groups = Array.from(groupsRef.current.querySelectorAll<HTMLElement>("[data-prefecture]"))
    let frame = 0
    function update() {
      const bottom = (rail?.getBoundingClientRect().bottom ?? 64) + 12
      const current = groups.find((group) => group.getBoundingClientRect().bottom > bottom) ?? groups.at(-1)
      setCurrentPrefecture(current?.dataset.prefecture ?? "")
    }
    function onScroll() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [groupedByPrefecture])

  useEffect(() => {
    const rail = railRef.current
    const current = rail?.querySelector<HTMLElement>('[aria-current="location"]')
    if (rail && current) rail.scrollLeft = current.offsetLeft - (rail.clientWidth - current.offsetWidth) / 2
  }, [currentPrefecture, groupedByPrefecture])

  const selectPath = (key: ExplorerViewKey, { field = specialty?.key ?? "", nationwide = false } = {}) => {
    const sameChapter = key === theme && !nationwide
    setTheme(key)
    if (!sameChapter) setTopic("")
    if (nationwide) {
      setPrefecture("")
      setArea(null)
    }
    const query = new URLSearchParams()
    if (key !== "all") query.set("theme", key)
    if (field && !nationwide) query.set("specialty", field)
    if (sameChapter && moreOnly) query.set("view", "more")
    if (sameChapter && topic) query.set("topic", topic)
    if (area && !nationwide) query.set("area", area)
    if (prefecture && !nationwide) query.set("prefecture", prefecture)
    if (keyword) query.set("q", keyword)
    router.push(query.size ? `/database?${query}` : "/database", { scroll: false })
  }

  const toggleFeatured = () => {
    const query = new URLSearchParams(searchParams.toString())
    if (moreOnly) query.delete("view")
    else query.set("view", "more")
    router.push(`/database?${query}`, { scroll: false })
  }

  // ブラウザの戻る・進むでテーマをURLに合わせる
  useEffect(() => {
    const onPopState = () => {
      const query = new URLSearchParams(window.location.search)
      const t = query.get("theme")
      const next: ExplorerViewKey = t && isExplorerThemeKey(t) ? t : "all"
      setTheme(next)
      setTopic(query.get("topic") ?? "")
      setPrefecture(prefectureOrder.find((item) => item === query.get("prefecture")) ?? "")
      setArea(areas.find((area) => area === query.get("area")) ?? null)
      setKeyword(query.get("q") ?? "")
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [areas])

  const isNarrowed = chapterMode || hasFilters

  const selectClass =
    "w-full min-h-[42px] rounded-[3px] border bg-[#102232] px-[11px] py-2 text-sm text-[#f2eee6] max-sm:min-h-[44px]"
  const selectStyle = { borderColor: EDGE, colorScheme: "dark" as const }

  const renderRow = (row: RowVM) => {
    const project = row.projectsByTopic?.get(topic)
    const sourceUrl = project?.sourceUrl ?? row.sourceUrl
    const sourceLabel = project ? project.sourceLabel ?? "公式資料 ↗" : row.sourceLabel
    return (
      <article key={`${theme}-${row.facilityId}`}
        className="group relative grid gap-2 border-b py-[19px] transition-colors hover:bg-white/[0.04] focus-within:bg-white/[0.04] motion-reduce:transition-none sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-7"
        style={{ borderColor: EDGE }}>
        <div>
          <p className="mb-[7px] text-xs" style={{ color: accent }}>
            {project ? `${row.prefecture} ／ ${topic} ／ ${project.stage}` : row.meta}
          </p>
          <h3 className="mb-1 text-[clamp(23px,3vw,34px)] leading-[1.35] [overflow-wrap:anywhere]" style={{ fontFamily: SERIF }}>
            {row.institution}
          </h3>
          <p className="text-sm text-[#e5eef1]">{row.department}</p>
          <p className="mt-2 text-sm leading-[1.75] text-[#b2c3d2]">{project ? stripSummaryPrefix(project.summary) : row.feature}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 text-xs sm:max-w-[220px] sm:justify-end sm:text-right" style={{ color: accent }}>
          <Link href={facilityHref(row.facilityId, project?.theme ?? theme)}
            className="inline-block py-2 underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-[var(--accent)]"
            aria-label={`${row.institution} ${row.department}の詳細を見る`}>
            チームを見る ↗
          </Link>
          {sourceUrl && (
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="relative z-10 inline-block py-2 underline-offset-4 hover:underline">
              {sourceLabel}
            </a>
          )}
        </div>
      </article>
    )
  }

  return (
    <div
      className="field-explorer bg-[#06111e] text-[#f2eee6]"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <style>{`
        .field-explorer :is(button, select, a, input):focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
      `}</style>

      <section className="relative isolate flex min-h-[clamp(164px,20vw,224px)] flex-col justify-center overflow-hidden px-[6%] py-7">
        {explorerThemes.map((t) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={t.key}
            src={t.image}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-[2] h-full w-full object-cover opacity-0 transition-opacity duration-[240ms] motion-reduce:transition-none"
            style={{
              objectPosition: t.objectPosition,
              opacity: theme === t.key ? 0.9 : 0,
            }}
          />
        ))}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-[1]"
          style={{
            background:
              "linear-gradient(90deg,#06111e 8%,#06111ee6 32%,#06111e44 65%,transparent 90%),linear-gradient(0deg,#06111e,transparent 45%)",
          }}
        />
        <h1
          className="my-3 text-balance text-[clamp(27px,6vw,56px)] leading-[1.3]"
          style={{ fontFamily: SERIF }}
        >
          消化器外科チームを探す
        </h1>
        <p style={{ color: MUTED }}>学びたい領域や、関わりたい取り組みから。</p>
      </section>

      <div id="directory-start" className="scroll-mt-20 px-[6%]">
        <nav aria-label="全チームと5つの章" className={styles.chapters}>
          {explorerThemes.map((item) => {
            const active = theme === item.key
            return (
              <button
                key={item.key}
                type="button"
                aria-pressed={active}
                className={styles.chapter}
                style={{ "--chapter-color": item.accent } as CSSProperties}
                onClick={() => { if (!active) selectPath(item.key) }}
              >
                <span
                  aria-hidden="true"
                  className={styles.chapterArt}
                  style={{ backgroundImage: `url(${item.image})`, backgroundPosition: item.objectPosition }}
                />
                <span className={styles.chapterTitle}>{item.key === "all" ? "全チーム" : item.title}</span>
                <span className={styles.chapterLabel}>{item.key === "all" ? "全国の消化器外科" : item.filterLabel}</span>
              </button>
            )
          })}
        </nav>

        <div role="group" aria-label="取り組み" className={styles.optionRow}>
          <span className={styles.filterLabel} aria-hidden="true">取り組み</span>
          <div className={styles.options}>
            <button type="button" className={styles.option} aria-pressed={!topic} onClick={() => setTopic("")}>
              すべての取り組み
            </button>
            {topicOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={styles.option}
                aria-pressed={topic === option}
                onClick={() => setTopic(topic === option ? "" : option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div role="group" aria-label="診療領域" className={styles.optionRow}>
          <span className={styles.filterLabel} aria-hidden="true">診療領域</span>
          <div className={styles.options}>
            {[{ key: "", filterLabel: "すべての領域" }, ...specialties].map(({ key, filterLabel }) => (
              <button key={key} type="button" aria-pressed={(specialty?.key ?? "") === key}
                onClick={() => { if ((specialty?.key ?? "") !== key) selectPath(theme, { field: key }) }}
                className={styles.option}>
                {filterLabel}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.searchFields}>
          <label className="grid gap-[5px] text-xs" style={{ color: MUTED }}>
            都道府県
            <select
              aria-label="都道府県"
              value={prefecture}
              onChange={(e) => setPrefecture(e.target.value)}
              className={selectClass}
              style={selectStyle}
            >
              <option value="">すべての都道府県</option>
              {prefectureOrder.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-[5px] text-xs" style={{ color: MUTED }}>
            キーワード
            <span className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: MUTED }} />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="例　東京 大腸"
                className="min-h-[42px] w-full rounded-[3px] border bg-[#102232] py-2 pl-9 pr-8 text-sm text-[#f2eee6] placeholder:text-[#b2c3d2]/60 max-sm:min-h-[44px]"
                style={{ borderColor: EDGE }}
              />
              {keyword && (
                <button
                  type="button"
                  aria-label="キーワードをクリア"
                  onClick={() => setKeyword("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  style={{ color: MUTED }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </span>
          </label>
        </div>

        <div className={styles.optionRow} role="group" aria-label="エリア">
          <span className={styles.filterLabel} aria-hidden="true">エリア</span>
          <div className={styles.options}>
            <button type="button" aria-pressed={area === null} onClick={() => setArea(null)} className={styles.option}>全エリア</button>
            {areas.map((item) => (
              <button key={item} type="button" aria-pressed={area === item} onClick={() => setArea(item)} className={styles.option}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 結果 */}
      <section className="px-[6%] pb-8" aria-label="検索結果">
        <div className={styles.resultBar}>
          <div className={styles.resultContext}>
            {[chapterMode ? activeTheme.title : "全チーム", topic || (chapterMode ? activeTheme.filterLabel : ""), specialty?.filterLabel, prefecture || area]
              .filter(Boolean)
              .join(" ／ ")}
            <span aria-live="polite">
              {filteredRows.length} 件
              {hasFilters && `（全${baseRows.length}件中）`}
            </span>
            {moreOnly && <span>TOPの紹介例以外</span>}
          </div>
          <div className={styles.resultActions}>
            {featuredCount > 0 && (
              <button type="button" onClick={toggleFeatured} className={styles.resultAction}>
                {moreOnly ? `TOPで紹介した${featuredCount}チームも見る` : "TOPの紹介例以外を表示"}
              </button>
            )}
            {isNarrowed && <a href="/database" className={styles.resultAction}>条件をすべて外す</a>}
          </div>
        </div>

        {/* 都道府県ジャンプ（「すべて」のとき） */}
        {groupedByPrefecture && groupedByPrefecture.length > 1 && (
          <nav className="portal-prefecture-rail" ref={railRef} aria-label="都道府県へ移動">
            {groupedByPrefecture.map((g) => (
              <a key={g.prefecture} href={`#pref-${g.prefecture}`} aria-current={g.prefecture === currentPrefecture ? "location" : undefined}>
                {g.prefecture}
              </a>
            ))}
          </nav>
        )}

        <div ref={groupsRef}>
          {filteredRows.length === 0 && (
            <div className="py-[22px]">
              <p style={{ color: MUTED }}>
                この条件に合う外科チームは見つかりませんでした。条件を外して探せます。
              </p>
              {keywordTerms.length > 0 && (chapterMode || specialty || prefecture || area) && (
                <button type="button" onClick={() => selectPath("all", { nationwide: true })}
                  className="mt-3 min-h-[44px] rounded-[3px] border px-3 py-2 text-sm" style={{ borderColor: accent, color: accent }}>
                  同じキーワードで全国を探す
                </button>
              )}
            </div>
          )}
          {groupedByPrefecture
            ? groupedByPrefecture.map((g) => (
                <div key={g.prefecture} data-prefecture={g.prefecture} className="portal-prefecture-group">
                  <h2
                    id={`pref-${g.prefecture}`}
                    className="portal-prefecture-heading mb-1 border-b py-2 text-base"
                    style={{ borderColor: EDGE, fontFamily: SERIF }}
                  >
                    {g.prefecture}
                    <span className="ml-2 text-xs" style={{ color: MUTED }}>
                      {g.rows.length} 件
                    </span>
                  </h2>
                  {g.rows.map(renderRow)}
                </div>
              ))
            : filteredRows.map(renderRow)}
        </div>
        <div className={styles.directoryEnd}>
          {isNarrowed ? (
            <a href="/database">ほかの消化器外科チームを探す <span aria-hidden="true">→</span></a>
          ) : (
            <a href="#directory-start">条件を選び直す <span aria-hidden="true">↑</span></a>
          )}
        </div>
      </section>
    </div>
  )
}
