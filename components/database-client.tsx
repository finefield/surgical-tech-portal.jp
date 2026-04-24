"use client"

import { Search, Filter } from "lucide-react"
import { useState } from "react"
import { FacilityCard } from "@/components/facility-card"
import type { Facility } from "@/data/facilities"

interface DatabaseClientProps {
  facilities: Facility[]
  areas: string[]
  totalCount: number
}

export function DatabaseClient({ facilities, areas, totalCount }: DatabaseClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch =
      facility.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      facility.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.prefecture.includes(searchQuery)

    const matchesArea = !selectedArea || facility.area === selectedArea

    return matchesSearch && matchesArea
  })

  return (
    <>
      {/* Title Section */}
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
          </span>
          {totalCount} 医局を収録
        </div>
        <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          全国消化器外科系医局
          <br />
          <span className="bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">
            DXデータベース
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          日本全国の消化器外科系医局のDX・最先端テクノロジー導入事例を網羅。
          大学名、医局名、技術タグ、都道府県で検索できます。
        </p>
      </div>

      {/* Search Bar */}
      <div className="mx-auto mb-8 max-w-2xl">
        <div className="group relative">
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 opacity-0 blur transition-opacity group-focus-within:opacity-100" />
          <div className="relative flex items-center rounded-xl border border-border/50 bg-secondary/50 backdrop-blur-sm">
            <Search className="ml-4 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="大学名、医局名、技術タグ、都道府県で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mr-4 text-sm text-muted-foreground hover:text-foreground"
              >
                クリア
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Area Filter */}
      <div className="mx-auto mb-12 max-w-4xl">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="mr-2 flex items-center gap-1 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            エリア:
          </div>
          {/* All Button - More prominent design */}
          <button
            onClick={() => setSelectedArea(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              selectedArea === null
                ? "bg-neon-cyan text-background border border-neon-cyan shadow-[0_0_12px_rgba(0,255,255,0.3)]"
                : "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/50 hover:bg-neon-cyan/20"
            }`}
          >
            全エリア
          </button>
          <span className="mx-1 text-border">|</span>
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                selectedArea === area
                  ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground border border-border/50"
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Reset Button */}
      <div className="mb-6 flex items-center justify-center gap-4">
        <span className="text-sm text-muted-foreground">
          {filteredFacilities.length} 件の医局
        </span>
        {(selectedArea || searchQuery) && (
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedArea(null)
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-1.5 text-sm font-medium text-neon-cyan transition-colors hover:bg-neon-cyan/20"
          >
            <span>全医局を表示</span>
          </button>
        )}
      </div>

      {/* Facility Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredFacilities.map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </div>

      {/* No Results */}
      {filteredFacilities.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">
            該当する医局が見つかりませんでした。
          </p>
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedArea(null)
            }}
            className="mt-4 text-sm text-primary hover:underline"
          >
            検索をクリア
          </button>
        </div>
      )}
    </>
  )
}
