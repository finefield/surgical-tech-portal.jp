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
          <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
            掲載情報は各医局・病院の公式情報を出典とし、2026年11月9日に全件の照合を行いました。定期的に再確認を行い、変更はトップページの更新情報に記録します。誤りにお気づきの場合は<a href="/contact" className="underline underline-offset-2">お問い合わせ</a>からご連絡ください。集計データは<a href="/insights" className="underline underline-offset-2">「データで見る」</a>で公開しています。
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
