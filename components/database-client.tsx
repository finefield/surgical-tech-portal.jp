"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { facilityHref } from "@/lib/portal-themes"
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

// 都道府県の短縮表記（愛知県→愛知、京都府→京都、東京都→東京、北海道はそのまま）
function shortRegion(prefecture: string): string {
  if (prefecture === "北海道") return prefecture
  return prefecture.replace(/(県|府|都)$/, "")
}

// summary 冒頭の「段階｜」はメタ行の段階と重なるため、見本どおり本文では落とす
function stripSummaryPrefix(summary: string): string {
  const idx = summary.indexOf("｜")
  return idx >= 0 ? summary.slice(idx + 1) : summary
}

// 施設説明文の【…】マーカーは一覧表示では落とす（施設カードと同じ扱い）
function cleanDescription(description: string): string {
  return description.replace(/【[^】]+】/g, "")
}

interface RowVM {
  facilityId: number
  prefecture: string
  area: string
  topic?: string
  meta: string
  headline: string
  feature: string
  clampFeature: boolean
  teamName: string
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
}

export function DatabaseClient({
  facilities,
  areas,
  totalCount,
  initialTheme,
  initialArea,
  initialKeyword,
}: DatabaseClientProps) {
  const router = useRouter()
  const [theme, setTheme] = useState<ExplorerViewKey>(initialTheme)
  const [topic, setTopic] = useState("")
  const [prefecture, setPrefecture] = useState("")
  const [area, setArea] = useState<string | null>(initialArea)
  const [keyword, setKeyword] = useState(initialKeyword)
  const [currentPrefecture, setCurrentPrefecture] = useState("")
  const railRef = useRef<HTMLElement>(null)
  const groupsRef = useRef<HTMLDivElement>(null)

  const facilityById = useMemo(
    () => new Map(facilities.map((f) => [f.id, f])),
    [facilities],
  )

  const mappedVM = useMemo(() => {
    return (m: ExplorerMapping): RowVM | null => {
      const facility = facilityById.get(m.facilityId)
      if (!facility) return null
      const searchText = [
        facility.university,
        facility.name,
        facility.headline,
        facility.description,
        facility.prefecture,
        ...facility.tags,
        m.name,
        m.topic,
        m.headline,
        m.summary,
        m.description,
      ]
        .join(" ")
        .toLowerCase()
      return {
        facilityId: m.facilityId,
        prefecture: facility.prefecture,
        area: facility.area,
        topic: m.topic,
        meta: `${m.topic} ／ ${shortRegion(facility.prefecture)} ／ ${m.stage}`,
        headline: m.headline,
        feature: stripSummaryPrefix(m.summary),
        clampFeature: false,
        teamName: m.name,
        sourceUrl: m.sourceUrl,
        sourceLabel: m.sourceLabel ?? "公式資料 ↗",
        searchText,
      }
    }
  }, [facilityById])

  const rowsByTheme = useMemo(() => {
    const map = new Map<ExplorerViewKey, RowVM[]>()
    // 「すべて」：既存データベースの全チーム。テーマ対応がある施設は対応行の内容で1行にまとめる
    const firstMappingByFacility = new Map<number, ExplorerMapping>()
    for (const m of explorerMappings) {
      if (!firstMappingByFacility.has(m.facilityId)) {
        firstMappingByFacility.set(m.facilityId, m)
      }
    }
    map.set(
      "all",
      facilities.flatMap((f) => {
        const m = firstMappingByFacility.get(f.id)
        if (m) {
          const vm = mappedVM(m)
          return vm ? [vm] : []
        }
        const searchText = [
          f.university,
          f.name,
          f.headline,
          f.description,
          f.prefecture,
          ...f.tags,
        ]
          .join(" ")
          .toLowerCase()
        return [
          {
            facilityId: f.id,
            prefecture: f.prefecture,
            area: f.area,
            meta: shortRegion(f.prefecture),
            headline: f.headline,
            feature: cleanDescription(f.description),
            clampFeature: true,
            teamName: `${f.university} ${f.name}`,
            sourceUrl: f.officialWebsite?.url,
            sourceLabel: f.officialWebsite
              ? `${f.officialWebsite.label} ↗`
              : undefined,
            searchText,
          },
        ]
      }),
    )
    for (const t of explorerThemes) {
      if (t.key === "all") continue
      map.set(
        t.key,
        explorerMappings
          .filter((m) => m.theme === t.key)
          .flatMap((m) => {
            const vm = mappedVM(m)
            return vm ? [vm] : []
          }),
      )
    }
    return map
  }, [facilities, mappedVM])

  const activeTheme =
    explorerThemes.find((t) => t.key === theme) ?? explorerThemes[0]
  const accent = activeTheme.accent
  const baseRows = rowsByTheme.get(theme) ?? []

  const topicOptions = useMemo(() => {
    const source =
      theme === "all"
        ? explorerMappings
        : explorerMappings.filter((m) => m.theme === theme)
    return [...new Set(source.map((m) => m.topic))]
  }, [theme])

  const prefectureOptions = useMemo(() => {
    const present = [...new Set(baseRows.map((r) => r.prefecture))].sort(
      (a, b) => {
        const ia = prefectureOrder.indexOf(a)
        const ib = prefectureOrder.indexOf(b)
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib)
      },
    )
    // テーマ切替後も都道府県の指定は保持するため、選択中は選択肢に含める
    if (prefecture && !present.includes(prefecture)) present.push(prefecture)
    return present
  }, [baseRows, prefecture])

  const filteredRows = baseRows.filter((row) => {
    if (topic && row.topic !== topic) return false
    if (prefecture && row.prefecture !== prefecture) return false
    if (area && row.area !== area) return false
    if (keyword && !row.searchText.includes(keyword.toLowerCase())) return false
    return true
  })

  const hasFilters = Boolean(topic || prefecture || area || keyword)

  // 「すべて」では都道府県単位の案内（見出し＋ジャンプ）を付ける
  const groupedByPrefecture = useMemo(() => {
    if (theme !== "all") return null
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
  }, [theme, filteredRows])

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

  const selectTheme = (key: ExplorerViewKey) => {
    if (key === theme) return
    setTheme(key)
    setTopic("")
    const query = new URLSearchParams()
    if (key !== "all") query.set("theme", key)
    if (area) query.set("area", area)
    if (keyword) query.set("q", keyword)
    router.push(query.size ? `/database?${query}` : "/database", { scroll: false })
  }

  // ブラウザの戻る・進むでテーマをURLに合わせる
  useEffect(() => {
    const onPopState = () => {
      const query = new URLSearchParams(window.location.search)
      const t = query.get("theme")
      const next: ExplorerViewKey = t && isExplorerThemeKey(t) ? t : "all"
      setTheme(next)
      setTopic("")
      setPrefecture("")
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
      clear: () => selectTheme("all"),
    })
  }
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
    <article
      key={`${theme}-${row.facilityId}`}
      className="border-b py-[19px]"
      style={{ borderColor: EDGE }}
    >
      <div className="mb-[7px] text-[11px]" style={{ color: accent }}>
        {row.meta}
      </div>
      <h3
        className="mb-1 text-[clamp(18px,2.6vw,25px)] leading-[1.45]"
        style={{ fontFamily: SERIF }}
      >
        {row.headline}
      </h3>
      <p
        className={`text-sm leading-[1.75] text-[#e5eef1] ${row.clampFeature ? "line-clamp-4" : ""}`}
      >
        {row.feature}
      </p>
      <p className="mt-1.5 text-[13px]">{row.teamName}</p>
      <div className="mt-1.5 flex flex-wrap gap-5 text-xs">
        <Link
          href={facilityHref(row.facilityId, theme)}
          className="inline-block py-1.5 underline-offset-4"
          style={{ color: accent }}
        >
          チームを見る ↗
        </Link>
        {row.sourceUrl && (
          <a
            href={row.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-1.5 underline-offset-4"
            style={{ color: accent }}
          >
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
          className="my-3 text-[clamp(32px,6vw,56px)] leading-[1.3]"
          style={{ fontFamily: SERIF }}
        >
          消化器外科チームを探す
        </h1>
        <p style={{ color: MUTED }}>関わりたい技術や、学びたいことから。</p>
      </section>

      {/* 章ボタンと絞り込み */}
      <div className="px-[6%]">
        <nav aria-label="章から探す" className="flex flex-wrap gap-1.5 pb-[18px] pt-[5px]">
          {explorerThemes.map((t) => {
            const active = theme === t.key
            return (
              <button
                key={t.key}
                type="button"
                aria-pressed={active}
                onClick={() => selectTheme(t.key)}
                className="min-h-[42px] rounded-[3px] border bg-[#102232] px-[11px] py-2 text-sm max-sm:min-h-[44px]"
                style={
                  active
                    ? { background: accent, color: "#092323", borderColor: accent }
                    : { borderColor: EDGE }
                }
              >
                {t.title}
              </button>
            )
          })}
        </nav>

        <div className="grid grid-cols-1 gap-3 border-t py-[17px] min-[560px]:grid-cols-3" style={{ borderColor: EDGE }}>
          <label className="grid gap-[5px] text-xs" style={{ color: MUTED }}>
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
          </label>
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
              {prefectureOptions.map((o) => (
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
                placeholder="大学名、医局名、技術タグなど"
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
                selectTheme("all")
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
        <div
          className="flex flex-wrap justify-between gap-1 border-b py-2.5 text-xs"
          style={{ color: MUTED, borderColor: EDGE }}
        >
          <span>
            {theme === "all"
              ? activeTheme.filterLabel
              : `${activeTheme.title} ／ ${activeTheme.filterLabel}`}
          </span>
          <span aria-live="polite">
            {filteredRows.length} 件
            {hasFilters && `（全${baseRows.length}件中）`}
            {theme === "all" && !hasFilters && ` ／ ${totalCount} 件の外科チームを収録`}
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
