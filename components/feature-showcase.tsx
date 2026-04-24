"use client"

import { useState } from "react"
import { features, allFeatureTags, type Feature } from "@/data/features"
import { ArrowUpRight, X, Hash, ChevronDown, ChevronUp } from "lucide-react"

const themeStyles: Record<
  Feature["theme"],
  {
    gradient: string
    glow: string
    accent: string
    bgPattern: string
  }
> = {
  "holy-land": {
    gradient: "from-rose-500/20 via-amber-500/10 to-transparent",
    glow: "bg-rose-500/30",
    accent: "text-rose-400",
    bgPattern: "radial-gradient(ellipse at 80% 20%, rgba(244, 63, 94, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
  },
  innovator: {
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    glow: "bg-cyan-500/30",
    accent: "text-cyan-400",
    bgPattern: "radial-gradient(ellipse at 70% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
  },
  intelligence: {
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    glow: "bg-violet-500/30",
    accent: "text-violet-400",
    bgPattern: "radial-gradient(ellipse at 60% 40%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 40% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
  },
  agility: {
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    glow: "bg-emerald-500/30",
    accent: "text-emerald-400",
    bgPattern: "radial-gradient(ellipse at 75% 25%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 25% 75%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
  },
  connectivity: {
    gradient: "from-fuchsia-500/20 via-pink-500/10 to-transparent",
    glow: "bg-fuchsia-500/30",
    accent: "text-fuchsia-400",
    bgPattern: "radial-gradient(ellipse at 65% 35%, rgba(217, 70, 239, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 35% 65%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
  },
}

function FeatureCard({
  feature,
  isExpanded,
  onToggle,
}: {
  feature: Feature
  isExpanded: boolean
  onToggle: () => void
}) {
  const style = themeStyles[feature.theme]

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-secondary/30 backdrop-blur-xl transition-all duration-500 hover:border-white/20"
      style={{ background: style.bgPattern }}
    >
      {/* Glow effect */}
      <div
        className={`absolute -right-20 -top-20 h-40 w-40 rounded-full ${style.glow} blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-80`}
      />
      <div
        className={`absolute -bottom-20 -left-20 h-40 w-40 rounded-full ${style.glow} blur-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-50`}
      />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
              FEATURE {feature.id}
            </span>
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${style.accent}`}>
              {feature.title}
            </h2>
            <p className="mt-2 text-lg text-foreground/90 sm:text-xl">
              {feature.subtitle}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-right text-sm text-muted-foreground">
            <span>{feature.university}</span>
            <span className="text-xs">{feature.department}</span>
            <span className="text-xs text-white/40">{feature.prefecture}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {feature.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium transition-colors hover:bg-white/10 ${style.accent}`}
            >
              <Hash className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* Description preview or full */}
        <div className="relative">
          <div
            className={`prose prose-invert max-w-none text-sm leading-relaxed text-foreground/80 sm:text-base ${
              isExpanded ? "" : "line-clamp-6"
            }`}
          >
            {feature.description.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4 last:mb-0 whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-secondary/80 to-transparent" />
          )}
        </div>

        {/* Expand/Collapse button */}
        <button
          onClick={onToggle}
          className={`mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition-all hover:bg-white/10 ${style.accent}`}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              閉じる
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              続きを読む
            </>
          )}
        </button>

        {/* References - only show when expanded */}
        {isExpanded && feature.references.length > 0 && (
          <div className="mt-6 border-t border-white/10 pt-6">
            <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              参照元
            </h4>
            <div className="flex flex-wrap gap-2">
              {feature.references.map((ref, idx) => (
                <a
                  key={idx}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md bg-white/5 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
                >
                  {ref.label}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export function FeatureShowcase() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [expandedIds, setExpandedIds] = useState<number[]>([])
  const [showAllTags, setShowAllTags] = useState(false)

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const toggleExpanded = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const filteredFeatures =
    selectedTags.length === 0
      ? features
      : features.filter((f) => f.tags.some((tag) => selectedTags.includes(tag)))

  const displayedTags = showAllTags ? allFeatureTags : allFeatureTags.slice(0, 12)

  return (
    <section className="relative py-20 sm:py-28">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-rose-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-1 text-xs font-medium tracking-wider text-neon-cyan">
            FEATURED STORIES
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            日本の外科医療の
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              未来を創る
            </span>
            先駆者たち
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            最先端テクノロジーと医療が融合する、5つの革新的なストーリー
          </p>
        </div>

        {/* Tag filter */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-secondary/30 p-4 backdrop-blur-sm sm:p-6">
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Hash className="h-4 w-4" />
            <span>ハッシュタグでフィルター</span>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="ml-auto flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-xs hover:bg-white/20"
              >
                <X className="h-3 w-3" />
                クリア
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {displayedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? "border-neon-cyan bg-neon-cyan/20 text-neon-cyan"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:bg-white/10"
                }`}
              >
                <Hash className="h-3 w-3" />
                {tag}
              </button>
            ))}
          </div>
          {allFeatureTags.length > 12 && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="mt-3 text-xs text-muted-foreground hover:text-foreground"
            >
              {showAllTags
                ? "タグを折りたたむ"
                : `他 ${allFeatureTags.length - 12} 件のタグを表示`}
            </button>
          )}
        </div>

        {/* Feature cards */}
        <div className="space-y-8">
          {filteredFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isExpanded={expandedIds.includes(feature.id)}
              onToggle={() => toggleExpanded(feature.id)}
            />
          ))}
        </div>

        {filteredFeatures.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-secondary/30 p-12 text-center">
            <p className="text-muted-foreground">
              選択したタグに該当するストーリーがありません。
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
