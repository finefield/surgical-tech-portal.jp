import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { facilities, areas, prefectureOrder } from "@/data/facilities"
import { DatabaseClient } from "@/components/database-client"

// サーバーサイドで都道府県順にソート
const sortedFacilities = [...facilities].sort((a, b) => {
  const aIndex = prefectureOrder.indexOf(a.prefecture)
  const bIndex = prefectureOrder.indexOf(b.prefecture)
  // 未定義の都道府県は末尾に
  const orderA = aIndex === -1 ? 999 : aIndex
  const orderB = bIndex === -1 ? 999 : bIndex
  return orderA - orderB
})

export default function DatabasePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DatabaseClient 
            facilities={sortedFacilities} 
            areas={areas} 
            totalCount={facilities.length} 
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
