"use client"

import { useState } from "react"
import { ArrowUpRight, X, MapPin, Tag } from "lucide-react"
import type { Facility } from "@/data/facilities"

function formatDescription(description: string) {
  // ■ で始まるセクションや【】で囲まれた小見出しを構造化表示
  const lines = description.split(/(?=■)|(?=【)/)
  
  return lines.map((line, index) => {
    const trimmed = line.trim()
    if (!trimmed) return null
    
    // ■ で始まる大見出し
    if (trimmed.startsWith("■")) {
      const content = trimmed.replace(/^■\s*/, "")
      return (
        <div key={index} className="mt-6 first:mt-0">
          <h4 className="mb-3 text-base font-bold text-neon-cyan border-b border-neon-cyan/30 pb-2">
            {content.split(/\n/)[0]}
          </h4>
          {content.split(/\n/).slice(1).map((p, i) => (
            p.trim() && <p key={i} className="mb-2 text-foreground/80">{p.trim()}</p>
          ))}
        </div>
      )
    }
    
    // 【】で囲まれた小見出し
    if (trimmed.startsWith("【")) {
      const match = trimmed.match(/^【([^】]+)】(.*)$/s)
      if (match) {
        return (
          <div key={index} className="mt-4 pl-4 border-l-2 border-neon-cyan/20">
            <h5 className="mb-2 text-sm font-bold text-foreground">
              {match[1]}
            </h5>
            <p className="text-sm text-foreground/70 leading-relaxed">
              {match[2].trim()}
            </p>
          </div>
        )
      }
    }
    
    // 通常のテキスト
    return (
      <p key={index} className="mb-3 text-foreground/80">
        {trimmed}
      </p>
    )
  }).filter(Boolean)
}

export function FacilityCard({ facility }: { facility: Facility }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <article
        className="group relative cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {/* Glow effect on hover */}
        <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-blue opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-50" />

        {/* Card */}
        <div className="relative flex min-h-[320px] flex-col rounded-xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-neon-cyan/50 group-hover:bg-card">
          {/* Area Badge */}
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-secondary/80 px-2 py-0.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {facility.prefecture}
            </span>
          </div>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {facility.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-2.5 py-0.5 text-xs font-medium text-neon-cyan"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* University & Department Name */}
          <h3 className="mb-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
            {facility.university}
          </h3>
          <p className="mb-3 text-sm text-muted-foreground">
            {facility.name}
          </p>

          {/* Headline */}
          <p className="mb-2 text-sm font-medium text-foreground/80 line-clamp-2">
            {facility.headline}
          </p>

          {/* Description Preview - remove 【】 markers for card view */}
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-4">
            {facility.description.replace(/【[^】]+】/g, "")}
          </p>

          {/* Link */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">詳細を見る</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-secondary/50 transition-all duration-300 group-hover:border-neon-cyan/50 group-hover:bg-neon-cyan/20">
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
          </div>
        </div>
      </article>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effect - wraps entire content */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 blur-sm" />

            {/* Inner container with background */}
            <div className="relative rounded-2xl border border-neon-cyan/30 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-800 p-6 shadow-2xl sm:p-8">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-secondary/80 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Area & Prefecture */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-neon-cyan/10 border border-neon-cyan/30 px-3 py-1 text-sm text-neon-cyan">
                  <MapPin className="h-4 w-4" />
                  {facility.area}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-secondary/80 px-3 py-1 text-sm text-muted-foreground">
                  {facility.prefecture}
                </span>
              </div>

              {/* University & Department Name */}
              <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
                {facility.university}
              </h2>
              <p className="mb-4 text-lg text-muted-foreground">
                {facility.name}
              </p>

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
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  最新の取り組み
                </h3>
                <p className="text-lg font-semibold text-foreground">
                  {facility.headline}
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="mb-4 text-sm font-medium text-muted-foreground">
                  取り組み内容
                </h3>
                <div className="text-base leading-relaxed text-foreground/80">
                  {formatDescription(facility.description)}
                </div>
              </div>

              {/* References */}
              {facility.references && facility.references.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                    参照元
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {facility.references.map((ref, index) => (
                      <a
                        key={index}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-neon-cyan/10 hover:text-neon-cyan"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {ref.label}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border/50 pt-6 mt-6">
                <div className="text-xs text-muted-foreground">
                  ID: {facility.id.toString().padStart(3, "0")}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 rounded-lg border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2 text-sm font-medium text-neon-cyan transition-colors hover:bg-neon-cyan/20"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
