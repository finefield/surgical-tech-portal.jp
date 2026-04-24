"use client"

import { Search } from "lucide-react"
import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { GlobalShowcase } from "@/components/global-showcase"
import { Footer } from "@/components/footer"
import { FacilityCard } from "@/components/facility-card"
import { facilities, areas, prefectureOrder } from "@/data/facilities"

// 都道府県順にソート
const sortedFacilities = [...facilities].sort((a, b) => {
  const aIndex = prefectureOrder.indexOf(a.prefecture)
  const bIndex = prefectureOrder.indexOf(b.prefecture)
  const orderA = aIndex === -1 ? 999 : aIndex
  const orderB = bIndex === -1 ? 999 : bIndex
  return orderA - orderB
})

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArea, setSelectedArea] = useState("すべて")

  const filteredFacilities = sortedFacilities.filter((facility) => {
    const matchesSearch =
      facility.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      facility.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.prefecture.includes(searchQuery)

    const matchesArea =
      selectedArea === "すべて" || facility.area === selectedArea

    return matchesSearch && matchesArea
  })

  return (
    <main className="relative min-h-screen">
      <Header />
      <HeroSection onSearch={(query) => setSearchQuery(query)} />

      {/* Global Showcase Section - Japan Top 5 / Global Frontrunners */}
      <GlobalShowcase />

      {/* Database Section */}
      <section id="database-section" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
              </span>
              {facilities.length} 医局を収録
            </div>
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              全国外科DX・最新テクノロジー
              <br />
              <span className="bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">
                データベース
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              日本全国の消化器外科系医局のDX・最先端テクノロジー導入事例を網羅
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mx-auto mb-8 max-w-4xl space-y-4">
            {/* Search */}
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

            {/* Area Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedArea === area
                      ? "border border-neon-cyan/50 bg-neon-cyan/20 text-neon-cyan"
                      : "border border-border/50 bg-secondary/50 text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center text-sm text-muted-foreground">
            {filteredFacilities.length} 件の医局
            {selectedArea !== "すべて" && ` - ${selectedArea}`}
            {searchQuery && ` - 「${searchQuery}」の検索結果`}
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
                  setSelectedArea("すべて")
                }}
                className="mt-4 text-sm text-primary hover:underline"
              >
                フィルターをリセット
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
