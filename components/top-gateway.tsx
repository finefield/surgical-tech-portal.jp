"use client"

import "@/styles/top-gateway.css"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { facilities } from "@/data/facilities"
import {
  explorerMappings,
  explorerThemes,
  type ExplorerTheme,
  type ExplorerThemeKey,
} from "@/data/explorer"

// 都道府県の短縮表記（愛知県→愛知、京都府→京都、東京都→東京、北海道はそのまま）
function shortRegion(prefecture: string): string {
  if (prefecture === "北海道") return prefecture
  return prefecture.replace(/(県|府|都)$/, "")
}

const facilityById = new Map(facilities.map((f) => [f.id, f]))

interface GatewayChapter {
  theme: ExplorerTheme
  modalTeams: { facilityId: number; region: string; name: string; summary: string }[]
}

const CHAPTERS: GatewayChapter[] = explorerThemes
  .filter((t) => t.key !== "all")
  .map((theme) => ({
    theme,
    modalTeams: explorerMappings
      .filter((m) => m.theme === theme.key && m.inModal)
      .map((m) => ({
        facilityId: m.facilityId,
        region: shortRegion(facilityById.get(m.facilityId)?.prefecture ?? ""),
        name: m.name,
        summary: m.summary,
      })),
  }))

const LIGHTS: { x: string; y: string; halo: string }[] = [
  { x: "58%", y: "6%", halo: "#a5eaff55" },
  { x: "17%", y: "19%", halo: "#72e7ff66" },
  { x: "73%", y: "31%", halo: "#c4b5ff66" },
  { x: "30%", y: "47%", halo: "#a9ffc955" },
  { x: "80%", y: "66%", halo: "#b7bcff60" },
  { x: "17%", y: "84%", halo: "#fff1a36a" },
  { x: "48%", y: "96%", halo: "#ffe4a860" },
]

function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function TopGateway() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const journeyRef = useRef<HTMLDivElement>(null)
  const openingRef = useRef(false)
  const [paused, setPaused] = useState(false)
  const [activeKey, setActiveKey] = useState<ExplorerThemeKey>("insight")
  const [dialogStyle, setDialogStyle] = useState<React.CSSProperties>({})

  const activeChapter =
    CHAPTERS.find((c) => c.theme.key === activeKey) ?? CHAPTERS[0]

  // 冒頭の高さ：ゲートウェイの可視領域を測って --opening-view に入れる（見本 top.js の sizeOpening）
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const visiblePageArea = () =>
      new Promise<IntersectionObserverEntry["intersectionRect"]>((resolve) => {
        const observer = new IntersectionObserver(([entry]) => {
          observer.disconnect()
          resolve(entry.intersectionRect)
        })
        observer.observe(root)
      })
    let cancelled = false
    const sizeOpening = async () => {
      const { height } = await visiblePageArea()
      if (!cancelled && height >= 280) {
        root.style.setProperty("--opening-view", `${height}px`)
      }
    }
    sizeOpening()
    window.addEventListener("resize", sizeOpening)
    return () => {
      cancelled = true
      window.removeEventListener("resize", sizeOpening)
    }
  }, [])

  // 縦長の光の管：スクロールで光が明暗・きらめきを変える（見本 top.js の IntersectionObserver）
  useEffect(() => {
    const root = rootRef.current
    const journey = journeyRef.current
    if (!root || !journey) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const lights = [...root.querySelectorAll<HTMLElement>(".light")]
    const levels = new Map<Element, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          levels.set(entry.target, entry.intersectionRatio)
          if (reduced.matches) continue
          const level = entry.intersectionRatio
          const el = entry.target as HTMLElement
          el.style.setProperty("--glow", String(level * 0.79))
          el.style.setProperty("--spark", String(level * 0.86))
          if (entry.isIntersecting && level > 0.15) {
            el.getAnimations().forEach((animation) => animation.cancel())
            el.animate(
              [
                { opacity: level * 0.25 },
                { opacity: Math.min(1, level + 0.22) },
                { opacity: level * 0.79 },
              ],
              { duration: 670, easing: "ease-out" },
            )
          }
        }
        const intensity = Math.max(0, ...levels.values())
        journey.style.setProperty(
          "--tube-brightness",
          reduced.matches ? "1" : String(0.91 + intensity * 0.2),
        )
        journey.style.setProperty(
          "--tube-saturation",
          reduced.matches ? "1" : String(1 + intensity * 0.09),
        )
      },
      { threshold: [0, 0.2, 0.55, 0.9, 1] },
    )
    lights.forEach((light) => observer.observe(light))
    const onReducedChange = () => {
      journey.style.setProperty("--tube-brightness", "1")
      journey.style.setProperty("--tube-saturation", "1")
      if (reduced.matches) {
        lights.forEach((light) =>
          light.getAnimations().forEach((animation) => animation.cancel()),
        )
      }
    }
    reduced.addEventListener("change", onReducedChange)
    return () => {
      observer.disconnect()
      reduced.removeEventListener("change", onReducedChange)
    }
  }, [])

  const visiblePageArea = () =>
    new Promise<DOMRectReadOnly>((resolve) => {
      const root = rootRef.current
      if (!root) {
        resolve(new DOMRectReadOnly(0, 0, window.innerWidth, window.innerHeight))
        return
      }
      const observer = new IntersectionObserver(([entry]) => {
        observer.disconnect()
        resolve(entry.intersectionRect)
      })
      observer.observe(root)
    })

  const openChapter = async (
    key: ExplorerThemeKey,
    trigger: HTMLButtonElement,
  ) => {
    const dialog = dialogRef.current
    if (!dialog || openingRef.current || dialog.open) return
    const chapter = CHAPTERS.find((c) => c.theme.key === key)
    if (!chapter) return
    openingRef.current = true
    setActiveKey(key)
    setDialogStyle({
      "--chapter-light": chapter.theme.light,
    } as React.CSSProperties)
    if (!reducedMotion()) {
      const pulse = trigger.animate(
        [
          { filter: "brightness(1)" },
          { filter: "brightness(1.35) drop-shadow(0 0 10px #c2fffb)" },
          { filter: "brightness(1.16)" },
        ],
        { duration: 180, easing: "ease-out" },
      )
      await pulse.finished.catch(() => {})
    }
    const visibleArea = await visiblePageArea()
    const center = visibleArea.height
      ? visibleArea.top + visibleArea.height / 2
      : window.innerHeight / 2
    const rect = trigger.getBoundingClientRect()
    const entryOffset = (distance: number) =>
      `${Math.max(-40, Math.min(40, distance * 0.15))}px`
    setDialogStyle({
      "--chapter-light": chapter.theme.light,
      "--dialog-center": `${center}px`,
      "--dialog-height": `${visibleArea.height || window.innerHeight}px`,
      "--entry-x": entryOffset(rect.x + rect.width / 2 - window.innerWidth / 2),
      "--entry-y": entryOffset(rect.y + rect.height / 2 - center),
    } as React.CSSProperties)
    requestAnimationFrame(() => {
      dialog.showModal()
      dialog.scrollTop = 0
      closeRef.current?.focus()
      openingRef.current = false
    })
  }

  const onOpeningNext = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const target = document.getElementById("st-top-insight")
    if (!target) return
    target.scrollIntoView({
      block: "center",
      behavior: reducedMotion() ? "auto" : "smooth",
    })
    target.querySelector("button")?.focus({ preventScroll: true })
  }

  return (
    <div id="st-top-gateway" lang="ja" ref={rootRef}>
      <section
        className={`opening${paused ? " is-paused" : ""}`}
        aria-labelledby="st-top-hero"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.jpg" alt="" />
        <span className="opening-glow" aria-hidden="true" />
        <span className="ey">INTO THE UNSEEN</span>
        <h1 id="st-top-hero">
          外科は、どこまで
          <br />
          未来をひらけるか。
        </h1>
        <p className="max-[650px]:font-[family-name:var(--mincho)] max-[650px]:font-normal">
          その一手の先に、まだ見ぬ可能性がある。
          <br />
          外科の新しい景色を、見にいこう。
        </p>
        <a className="opening-next" href="#st-top-insight" onClick={onOpeningNext}>
          光の先へ <span aria-hidden="true">↓</span>
        </a>
        <button
          className="opening-motion cursor-interaction"
          type="button"
          aria-label={paused ? "冒頭の動きを再開" : "冒頭の動きを一時停止"}
          onClick={() => setPaused((v) => !v)}
        >
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
        </button>
      </section>

      <div className="journey" ref={journeyRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/journey.jpg" alt="" />
        <div className="light-field" aria-hidden="true">
          {LIGHTS.map((light, i) => (
            <span
              key={i}
              className="light"
              style={
                {
                  "--x": light.x,
                  "--y": light.y,
                  "--halo": light.halo,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        {CHAPTERS.map((chapter) => {
          const key = chapter.theme.key as ExplorerThemeKey
          return (
            <section
              key={key}
              className={`beat ${key}`}
              {...(key === "insight" ? { id: "st-top-insight" } : {})}
            >
              <span className="ey">{chapter.theme.eyebrow}</span>
              <h2>
                <button
                  className="cursor-interaction"
                  type="button"
                  data-chapter={key}
                  aria-haspopup="dialog"
                  onClick={(e) => openChapter(key, e.currentTarget)}
                >
                  {chapter.theme.title}{" "}
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
              </h2>
              <p>
                {chapter.theme.beatCopy.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </section>
          )
        })}
      </div>

      <section
        className="gateway"
        id="st-top-chapters"
        aria-labelledby="st-top-chapters-title"
      >
        <div className="gateway-grid">
          <div>
            <h2 id="st-top-chapters-title">
              この未来を、
              <br />
              つくるチームへ。
            </h2>
            <p>気になった章から、消化器外科の取り組みを知る。</p>
          </div>
          <div>
            <nav className="choices" aria-label="５つの章">
              {CHAPTERS.map((chapter) => {
                const key = chapter.theme.key as ExplorerThemeKey
                return (
                  <button
                    key={key}
                    className="choice cursor-interaction"
                    type="button"
                    data-chapter={key}
                    onClick={(e) => openChapter(key, e.currentTarget)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="thumb" src={chapter.theme.image} alt="" />
                    <span className="word">{chapter.theme.title}</span>
                    <span className="descr">{chapter.theme.choiceDescr}</span>
                    <span className="arr" aria-hidden="true">
                      ↗
                    </span>
                  </button>
                )
              })}
            </nav>
            <Link className="search" href="/database">
              消化器外科チームを探す <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="st-top-destination"
        style={dialogStyle}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close()
        }}
      >
        <div className="chapter-frame">
          <div className="chapter-controls">
            <button
              type="button"
              className="chapter-close cursor-interaction"
              ref={closeRef}
              onClick={() => dialogRef.current?.close()}
            >
              閉じる <span aria-hidden="true">×</span>
            </button>
          </div>
          <header className="chapter-intro">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="dialog-art" src={activeChapter.theme.image} alt="" />
            <h3 id="st-top-destination">{activeChapter.theme.listDescription}</h3>
          </header>
          <ul className="chapter-teams">
            {activeChapter.modalTeams.map((team) => (
              <li key={team.facilityId}>
                <Link href={`/facilities/${team.facilityId}?theme=${activeChapter.theme.key}`}>
                  <span className="chapter-region">{team.region}</span>
                  <span className="chapter-team-content">
                    <span className="chapter-team-name">{team.name}</span>
                    <span className="chapter-team-summary">{team.summary}</span>
                  </span>
                  <span className="chapter-team-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className="chapter-explore"
            href={`/database?theme=${activeChapter.theme.key}&view=more`}
          >
            同じテーマで他のチームを探す <span aria-hidden="true">→</span>
          </Link>
        </div>
      </dialog>
    </div>
  )
}
