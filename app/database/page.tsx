import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { facilities, areas, prefectureOrder } from "@/data/facilities"
import { DatabaseClient } from "@/components/database-client"
import { isExplorerThemeKey, type ExplorerViewKey } from "@/data/explorer"

export const metadata: Metadata = {
  title: "消化器外科チームを探す",
  description:
    "関わりたい技術や学びたいことから、全国の消化器外科系外科チームを探せる一覧です。",
}

// サーバーサイドで都道府県順にソート
const sortedFacilities = [...facilities].sort((a, b) => {
  const aIndex = prefectureOrder.indexOf(a.prefecture)
  const bIndex = prefectureOrder.indexOf(b.prefecture)
  // 未定義の都道府県は末尾に
  const orderA = aIndex === -1 ? 999 : aIndex
  const orderB = bIndex === -1 ? 999 : bIndex
  return orderA - orderB
})

export default async function DatabasePage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string; area?: string; q?: string; prefecture?: string }>
}) {
  const sp = await searchParams
  // テーマ指定がない・未知のキーの場合は「すべて」
  const initialTheme: ExplorerViewKey =
    typeof sp.theme === "string" && isExplorerThemeKey(sp.theme) ? sp.theme : "all"

  return (
    <div className="min-h-screen bg-[#06111e]">
      <Header />

      <main className="pt-16 pb-16">
        <DatabaseClient
          facilities={sortedFacilities}
          areas={areas}
          initialTheme={initialTheme}
          initialArea={areas.find((area) => area === sp.area) ?? null}
          initialKeyword={typeof sp.q === "string" ? sp.q : ""}
          initialPrefecture={prefectureOrder.find((item) => item === sp.prefecture) ?? ""}
        />
      </main>

      <Footer />
    </div>
  )
}
