"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { facilityHref } from "@/lib/portal-themes"
import { normalizeDirectorySearch, specialties } from "@/lib/directory-search"
import { prefectureOrder, type Facility } from "@/data/facilities"
import {
  explorerMappings,
  explorerThemes,
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
  totalCount: number
  initialTheme: ExplorerViewKey
  initialArea: string | null
  initialKeyword: string
  initialPrefecture: string
}

export function DatabaseClient({
  facilities,
  areas,
  totalCount,
  initialTheme,
  initialArea,
  initialKeyword,
  initialPrefecture,
}: DatabaseClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [theme, setTheme] = useState<ExplorerViewKey>(initialTheme)
  const [topic, setTopic] = useState("")
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
      map.get("all")?.push({
        ...common,
        topics: mappings.map(({ topic }) => topic),
        meta: [facility.prefecture, ...fields.map(({ label }) => label)].join(" ／ "),
        feature: featured ? stripSummaryPrefix(featured.summary) : facility.headline,
        sourceUrl: featured?.sourceUrl ?? facility.officialWebsite?.url,
        sourceLabel: featured ? featured.sourceLabel ?? "公式資料 ↗" : "公式サイト ↗",
      })
      for (const mapping of mappings) {
        map.get(mapping.theme)?.push({
          ...common,
          topics: [mapping.topic],
          inModal: mapping.inModal,
          meta: `${facility.prefecture} ／ ${mapping.topic} ／ ${mapping.stage}`,
          feature: stripSummaryPrefix(mapping.summary),
          sourceUrl: mapping.sourceUrl,
          sourceLabel: mapping.sourceLabel ?? "公式資料 ↗",
        })
      }
    }

    for (const [key, rows] of map) {
      if (key === "all") continue
      const position = new Map(explorerMappings.filter((mapping) => mapping.theme === key).map(({ facilityId }, index) => [facilityId, index]))
      rows.sort((a, b) => (position.get(a.facilityId) ?? 0) - (position.get(b.facilityId) ?? 0))
    }
    return map
  }, [facilities])

  const chapterMode = theme !== "all" || searchParams.get("mode") === "chapters"
  const specialty = chapterMode ? undefined : specialties.find(({ key }) => key === searchParams.get("specialty"))
  const activeTheme = explorerThemes.find((item) => item.key === theme) ?? explorerThemes[0]
  const accent = chapterMode ? activeTheme.accent : "#a7ece9"
  const themeRows = rowsByTheme.get(theme)
  const moreOnly = theme !== "all" && searchParams.get("view") === "more"
  const baseRows = useMemo(() => {
    const rows = themeRows ?? []
    if (moreOnly) return rows.filter((row) => !row.inModal)
    if (chapterMode && theme === "all") return rows.filter((row) => row.topics.length)
    if (specialty) return rows.filter((row) => row.specialties.includes(specialty))
    return rows
  }, [themeRows, moreOnly, chapterMode, theme, specialty])
  const featuredCount = theme === "all" ? 0 : themeRows?.filter((row) => row.inModal).length ?? 0
  const topicOptions = [...new Set([...baseRows.flatMap((row) => row.topics), ...(topic ? [topic] : [])])]
  const keywordTerms = normalizeDirectorySearch(keyword).trim().split(/\s+/).filter(Boolean)

  const filteredRows = baseRows.filter((row) => {
    if (topic && !row.topics.includes(topic)) return false
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

  const selectPath = (key: ExplorerViewKey, mode: "specialties" | "chapters", field?: string, nationwide = false) => {
    setTheme(key)
    setTopic("")
    if (nationwide) {
      setPrefecture("")
      setArea(null)
    }
    const query = new URLSearchParams()
    if (key !== "all") query.set("theme", key)
    else if (mode === "chapters") query.set("mode", "chapters")
    if (field) query.set("specialty", field)
    if (area && !nationwide) query.set("area", area)
    if (prefecture && !nationwide) query.set("prefecture", prefecture)
    if (keyword) query.set("q", keyword)
    router.push(query.size ? `/database?${query}` : "/database", { scroll: false })
  }

  const toggleFeatured = () => {
    const query = new URLSearchParams(searchParams.toString())
    if (moreOnly) query.delete("view")
    else query.set("view", "more")
    router.replace(`/database?${query}`, { scroll: false })
  }

  // ブラウザの戻る・進むでテーマをURLに合わせる
  useEffect(() => {
    const onPopState = () => {
      const query = new URLSearchParams(window.location.search)
      const t = query.get("theme")
      const next: ExplorerViewKey = t && isExplorerThemeKey(t) ? t : "all"
      setTheme(next)
      setTopic("")
      setPrefecture(prefectureOrder.find((item) => item === query.get("prefecture")) ?? "")
      setArea(areas.find((area) => area === query.get("area")) ?? null)
      setKeyword(query.get("q") ?? "")
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [areas])

  const clearFilters = () => {
    setTopic("")
    setPrefecture("")
    setArea(null)
    setKeyword("")
  }

  const chips: { key: string; label: string; clear: () => void }[] = []
  if (theme !== "all") {
    chips.push({
      key: "theme",
      label: `テーマ：${activeTheme.title}`,
      clear: () => selectPath("all", "chapters"),
    })
  }
  if (specialty) chips.push({ key: "specialty", label: `診療領域：${specialty.label}`, clear: () => selectPath("all", "specialties") })
  if (topic) {
    chips.push({ key: "topic", label: `取り組み：${topic}`, clear: () => setTopic("") })
  }
  if (prefecture) {
    chips.push({
      key: "prefecture",
      label: `都道府県：${prefecture}`,
      clear: () => setPrefecture(""),
    })
  }
  if (area) {
    chips.push({ key: "area", label: `地域：${area}`, clear: () => setArea(null) })
  }
  if (keyword) {
    chips.push({
      key: "keyword",
      label: `キーワード：${keyword}`,
      clear: () => setKeyword(""),
    })
  }

  const selectClass =
    "w-full min-h-[42px] rounded-[3px] border bg-[#102232] px-[11px] py-2 text-sm text-[#f2eee6] max-sm:min-h-[44px]"
  const selectStyle = { borderColor: EDGE, colorScheme: "dark" as const }

  const renderRow = (row: RowVM) => (
    <article key={`${theme}-${row.facilityId}`}
      className="grid gap-2 border-b py-[19px] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-7"
      style={{ borderColor: EDGE }}>
      <div>
        <p className="mb-[7px] text-xs" style={{ color: accent }}>{row.meta}</p>
        <h3 className="mb-1 text-[clamp(23px,3vw,34px)] leading-[1.35] [overflow-wrap:anywhere]" style={{ fontFamily: SERIF }}>
          {row.institution}
        </h3>
        <p className="text-sm text-[#e5eef1]">{row.department}</p>
        <p className="mt-2 text-sm leading-[1.75] text-[#b2c3d2]">{row.feature}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 text-xs sm:max-w-[220px] sm:justify-end sm:text-right" style={{ color: accent }}>
        <Link href={facilityHref(row.facilityId, theme)}
          className="inline-block py-2 underline-offset-4 hover:underline"
          aria-label={`${row.institution} ${row.department}の詳細を見る`}>
          チームを見る ↗
        </Link>
        {row.sourceUrl && (
          <a href={row.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-block py-2 underline-offset-4 hover:underline">
            {row.sourceLabel}
          </a>
        )}
      </div>
    </article>
  )

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

      {/* 見出しバンド */}
      <section className="relative isolate flex min-h-[clamp(205px,29vw,280px)] flex-col justify-center overflow-hidden px-[6%] py-9 max-sm:min-h-[192px] max-sm:py-6">
        {explorerThemes.map((t) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={t.key}
            src={t.key === "all" ? "/insight.jpg" : t.image}
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
          className="my-3 text-[clamp(32px,6vw,56px)] leading-[1.3]"
          style={{ fontFamily: SERIF }}
        >
          消化器外科チームを探す
        </h1>
        <p style={{ color: MUTED }}>学びたい領域や、関わりたい取り組みから。</p>
      </section>

      {/* 章ボタンと絞り込み */}
      <div className="px-[6%]">
        <nav aria-label="探し方" className="grid grid-cols-2 border-b" style={{ borderColor: EDGE }}>
          {(["specialties", "chapters"] as const).map((mode) => {
            const active = chapterMode === (mode === "chapters")
            return (
              <button key={mode} type="button" aria-pressed={active}
                onClick={() => { if (!active) selectPath("all", mode) }}
                className="min-h-[52px] border border-b-2 px-3 text-left text-sm sm:text-base"
                style={{ borderColor: EDGE, borderBottomColor: active ? accent : EDGE, background: active ? "#13293c" : "#0b1a2a", color: active ? "#f2eee6" : MUTED }}>
                {mode === "specialties" ? "診療領域から探す" : "5章から探す"}
              </button>
            )
          })}
        </nav>
        {chapterMode ? (
          <nav aria-label="章から探す" className="flex flex-wrap gap-1.5 py-4">
            {explorerThemes.map((item) => (
              <button key={item.key} type="button" aria-pressed={theme === item.key}
                onClick={() => { if (theme !== item.key) selectPath(item.key, "chapters") }}
                className="min-h-[42px] rounded-[3px] border px-[11px] py-2 text-sm max-sm:min-h-[44px]"
                style={theme === item.key ? { background: accent, color: "#092323", borderColor: accent } : { borderColor: EDGE }}>
                {item.key === "all" ? "すべての章" : item.title}
              </button>
            ))}
          </nav>
        ) : (
          <nav aria-label="診療領域" className="flex flex-wrap gap-1.5 py-4">
            {[{ key: "", label: "すべての領域" }, ...specialties].map(({ key, label }) => (
              <button key={key} type="button" aria-pressed={(specialty?.key ?? "") === key}
                onClick={() => { if ((specialty?.key ?? "") !== key) selectPath("all", "specialties", key) }}
                className="min-h-[42px] rounded-[3px] border px-[11px] py-2 text-sm max-sm:min-h-[44px]"
                style={(specialty?.key ?? "") === key ? { background: accent, color: "#092323", borderColor: accent } : { borderColor: EDGE }}>
                {label}
              </button>
            ))}
          </nav>
        )}

        <div className={`grid grid-cols-1 gap-3 border-t py-[17px] ${chapterMode ? "min-[560px]:grid-cols-3" : "grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)]"}`} style={{ borderColor: EDGE }}>
          {chapterMode && <label className="grid gap-[5px] text-xs" style={{ color: MUTED }}>
            取り組み
            <select
              aria-label="取り組み"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={selectClass}
              style={selectStyle}
            >
              <option value="">すべての取り組み</option>
              {topicOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>}
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

        {/* 地域（エリア）絞り込み：従来の一覧から維持 */}
        <div className="flex flex-wrap items-center gap-2 pb-4" aria-label="地域で絞り込む">
          <button
            type="button"
            onClick={() => setArea(null)}
            className="rounded-full border px-3 py-1 text-xs"
            style={
              area === null
                ? { background: accent, color: "#092323", borderColor: accent }
                : { borderColor: EDGE, color: MUTED }
            }
          >
            全エリア
          </button>
          {areas.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setArea(a)}
              className="rounded-full border px-3 py-1 text-xs"
              style={
                area === a
                  ? { background: accent, color: "#092323", borderColor: accent }
                  : { borderColor: EDGE, color: MUTED }
              }
            >
              {a}
            </button>
          ))}
        </div>

        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pb-4" aria-label="選択中の条件">
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={chip.clear}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
                style={{ borderColor: accent, color: accent }}
                title="この条件を外す"
              >
                {chip.label}
                <X className="h-3 w-3" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                clearFilters()
                setTheme("all")
                router.push("/database", { scroll: false })
              }}
              className="text-xs underline underline-offset-4"
              style={{ color: MUTED }}
            >
              条件をすべて外す
            </button>
          </div>
        )}
      </div>

      {/* 結果 */}
      <section className="px-[6%] pb-8" aria-label="検索結果">
        {featuredCount > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 border-t py-2 text-sm" style={{ borderColor: EDGE }}>
            <span style={{ color: MUTED }}>{moreOnly ? "TOPの紹介例以外から探す" : "このテーマの全チーム"}</span>
            <button type="button" onClick={toggleFeatured} className="min-h-[44px] underline underline-offset-4" style={{ color: accent }}>
              {moreOnly ? `TOPで紹介した${featuredCount}件も含める` : "TOPの紹介例以外を表示"}
            </button>
          </div>
        )}
        <div
          className="flex flex-wrap justify-between gap-1 border-b py-2.5 text-xs"
          style={{ color: MUTED, borderColor: EDGE }}
        >
          <span>
            {chapterMode
              ? theme === "all" ? "すべての章" : `${activeTheme.title} ／ ${activeTheme.filterLabel}`
              : `${specialty?.label ?? "すべての領域"} ／ ${prefecture || area || "全国"}`}
          </span>
          <span aria-live="polite">
            {filteredRows.length} 件
            {hasFilters && `（全${baseRows.length}件中）`}
            {!chapterMode && !hasFilters && ` ／ ${totalCount} 件の外科チームを収録`}
          </span>
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
                <button type="button" onClick={() => selectPath("all", "specialties", undefined, true)}
                  className="mt-3 min-h-[44px] rounded-[3px] border px-3 py-2 text-sm" style={{ borderColor: accent, color: accent }}>
                  同じキーワードで全国を探す
                </button>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={chip.clear}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
                    style={{ borderColor: accent, color: accent }}
                    title="この条件を外す"
                  >
                    {chip.label}
                    <X className="h-3 w-3" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-[3px] border bg-[#102232] px-[11px] py-2 text-sm"
                  style={{ borderColor: EDGE }}
                >
                  絞り込みを外す
                </button>
              </div>
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
      </section>
    </div>
  )
}
