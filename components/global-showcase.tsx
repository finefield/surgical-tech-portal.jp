"use client"

import { useState } from "react"
import { japanItems, globalItems, type ShowcaseItem } from "@/data/showcase"
import { ArrowUpRight, Globe, MapPin, ChevronDown, ChevronUp, Bot, Cpu, Brain, Zap, Network, Activity, Satellite, Box, Server, Users } from "lucide-react"
import { cn } from "@/lib/utils"

function getItemIcon(title: string, isGlobal: boolean) {
  const iconClass = isGlobal ? "h-6 w-6 text-purple-400" : "h-6 w-6 text-blue-400"
  
  if (title.includes("HOLY LAND") || title.includes("ロボット")) return <Bot className={iconClass} />
  if (title.includes("INNOVATOR") || title.includes("触覚")) return <Activity className={iconClass} />
  if (title.includes("INTELLIGENCE") || title.includes("AI")) return <Brain className={iconClass} />
  if (title.includes("AGILITY") || title.includes("da Vinci")) return <Zap className={iconClass} />
  if (title.includes("CONNECTIVITY") || title.includes("メタバース")) return <Network className={iconClass} />
  if (title.includes("STANDARD") || title.includes("標準")) return <Cpu className={iconClass} />
  if (title.includes("CONNECTED") || title.includes("遠隔")) return <Satellite className={iconClass} />
  if (title.includes("HUMANOID") || title.includes("分身")) return <Box className={iconClass} />
  if (title.includes("ENGINE") || title.includes("演算")) return <Server className={iconClass} />
  if (title.includes("COLLECTIVE") || title.includes("民主化")) return <Users className={iconClass} />
  
  return isGlobal ? <Globe className={iconClass} /> : <MapPin className={iconClass} />
}

function formatDescription(description: string) {
  const lines = description.split("\n").filter((line) => line.trim())
  return lines.map((line, index) => {
    const headingMatch = line.match(/^【(.+?)】(.*)$/)
    if (headingMatch) {
      return (
        <div key={index} className="mb-4">
          <h4 className="mb-2 text-base font-bold text-foreground">
            {headingMatch[1]}
          </h4>
          {headingMatch[2] && (
            <p className="leading-relaxed text-foreground/80">{headingMatch[2]}</p>
          )}
        </div>
      )
    }
    return (
      <p key={index} className="mb-3 leading-relaxed text-foreground/80">
        {line}
      </p>
    )
  })
}

function ShowcaseCard({
  item,
  isGlobal,
}: {
  item: ShowcaseItem
  isGlobal: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-all duration-500",
        isGlobal
          ? "border-purple-500/30 bg-gradient-to-br from-gray-900 via-purple-950/20 to-gray-900 hover:border-purple-400/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]"
          : "border-blue-500/30 bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-900 hover:border-blue-400/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]"
      )}
    >
      {/* Background glow effect */}
      <div
        className={cn(
          "pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40",
          isGlobal
            ? "bg-gradient-to-br from-purple-500 to-pink-500"
            : "bg-gradient-to-br from-blue-400 to-cyan-400"
        )}
      />

      <div className="relative p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                isGlobal
                  ? "bg-purple-500/20 text-purple-400"
                  : "bg-blue-500/20 text-blue-400"
              )}
            >
              {isGlobal ? (
                <Globe className="h-5 w-5" />
              ) : (
                <MapPin className="h-5 w-5" />
              )}
            </div>
            <div>
              <p
                className={cn(
                  "text-sm font-medium",
                  isGlobal ? "text-purple-400" : "text-blue-400"
                )}
              >
                {item.university}
              </p>
              <p
                className={cn(
                  "text-xs",
                  isGlobal ? "text-gray-500" : "text-gray-400"
                )}
              >
                {item.department}
              </p>
            </div>
          </div>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              isGlobal
                ? "bg-purple-500/20 text-purple-300"
                : "bg-blue-500/20 text-blue-300"
            )}
          >
            {item.prefecture}
          </span>
        </div>

        {/* Title with Icon */}
        <div className="mb-6 flex items-start gap-4">
          <div
            className={cn(
              "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl",
              isGlobal
                ? "bg-purple-500/20"
                : "bg-blue-500/20"
            )}
          >
            {getItemIcon(item.title, isGlobal)}
          </div>
          <h3
            className={cn(
              "text-xl font-bold leading-tight sm:text-2xl",
              isGlobal ? "text-white" : "text-white"
            )}
          >
            {item.title}
          </h3>
        </div>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                isGlobal
                  ? "bg-gray-800 text-gray-300 ring-1 ring-purple-500/30"
                  : "bg-slate-800 text-blue-300 ring-1 ring-blue-500/30"
              )}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Description - Preview */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500",
            isExpanded ? "max-h-[2000px]" : "max-h-32"
          )}
        >
          <div className={cn("text-sm", isGlobal ? "text-gray-300" : "text-gray-300")}>
            {formatDescription(item.description)}
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "mt-4 flex items-center gap-2 text-sm font-medium transition-colors",
            isGlobal
              ? "text-purple-400 hover:text-purple-300"
              : "text-blue-400 hover:text-blue-300"
          )}
        >
          {isExpanded ? (
            <>
              閉じる <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              続きを読む <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>

        {/* References - Source Buttons */}
        <div className="mt-6 border-t border-current/10 pt-6">
          <p
            className={cn(
              "mb-4 text-xs font-medium uppercase tracking-wider",
              isGlobal ? "text-gray-500" : "text-gray-400"
            )}
          >
            Sources
          </p>
          <div className="flex flex-wrap gap-2">
            {item.refs.map((ref, index) => (
              <a
                key={index}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all",
                  isGlobal
                    ? "bg-gray-800/80 text-gray-300 ring-1 ring-purple-500/30 hover:bg-purple-500/20 hover:text-purple-300 hover:ring-purple-400/50"
                    : "bg-slate-800/80 text-blue-300 ring-1 ring-blue-500/30 hover:bg-blue-500/20 hover:text-blue-200 hover:ring-blue-400/50"
                )}
              >
                Source {index + 1}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export function GlobalShowcase() {
  const [activeTab, setActiveTab] = useState<"japan" | "global">("japan")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const items = activeTab === "japan" ? japanItems : globalItems
  const allTags = Array.from(new Set(items.flatMap((item) => item.tags)))

  const filteredItems = selectedTag
    ? items.filter((item) => item.tags.includes(selectedTag))
    : items

  return (
    <section className="relative min-h-screen">
      {/* Background */}
      <div
        className={cn(
          "absolute inset-0 transition-colors duration-700",
          activeTab === "global"
            ? "bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
            : "bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900"
        )}
      />

      {/* Grid pattern overlay */}
      <div
        className={cn(
          "absolute inset-0 opacity-30",
          activeTab === "global"
            ? "[background-image:linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] [background-size:60px_60px]"
            : "[background-image:linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)] [background-size:60px_60px]"
        )}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header with Toggle */}
        <div className="mb-12 text-center">
          <h2
            className={cn(
              "mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl",
              activeTab === "global" ? "text-white" : "text-white"
            )}
          >
            {activeTab === "japan"
              ? "Japanese Leaders"
              : "Global Frontrunners"}
          </h2>
          <p
            className={cn(
              "mx-auto max-w-2xl text-lg",
              activeTab === "global" ? "text-gray-400" : "text-blue-200"
            )}
          >
            {activeTab === "japan"
              ? "日本の外科医療を牽引する5つの最先端拠点"
              : "世界の外科DXを牽引するグローバルイノベーター"}
          </p>

          {/* Toggle Switch */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setActiveTab("japan")
                setSelectedTag(null)
              }}
              className={cn(
                "relative rounded-full px-6 py-3 text-sm font-medium transition-all",
                activeTab === "japan"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-slate-800 text-gray-400 hover:text-white"
              )}
            >
              <MapPin className="mr-2 inline-block h-4 w-4" />
              Japanese Leaders
            </button>
            <button
              onClick={() => {
                setActiveTab("global")
                setSelectedTag(null)
              }}
              className={cn(
                "relative rounded-full px-6 py-3 text-sm font-medium transition-all",
                activeTab === "global"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-slate-800 text-gray-400 hover:text-white"
              )}
            >
              <Globe className="mr-2 inline-block h-4 w-4" />
              Global Frontrunners
            </button>
          </div>
        </div>

        {/* Tag Filter */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-medium transition-all",
                selectedTag === null
                  ? activeTab === "global"
                    ? "bg-purple-600 text-white"
                    : "bg-blue-500 text-white"
                  : activeTab === "global"
                    ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
              )}
            >
              すべて
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium transition-all",
                  selectedTag === tag
                    ? activeTab === "global"
                      ? "bg-purple-600 text-white"
                      : "bg-blue-500 text-white"
                    : activeTab === "global"
                      ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                )}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {filteredItems.map((item) => (
            <ShowcaseCard
              key={item.id}
              item={item}
              isGlobal={activeTab === "global"}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div
            className={cn(
              "py-20 text-center",
              activeTab === "global" ? "text-gray-500" : "text-gray-500"
            )}
          >
            該当する記事がありません
          </div>
        )}
      </div>
    </section>
  )
}
