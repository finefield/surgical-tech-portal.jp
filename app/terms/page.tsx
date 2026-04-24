import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              利用規約
            </h1>
            <p className="text-muted-foreground">
              Terms of Service
            </p>
          </div>

          {/* Content */}
          <div className="rounded-2xl border border-border/50 bg-secondary/20 p-8 backdrop-blur-sm">
            <div className="prose prose-invert max-w-none">
              <Section title="サービスの目的">
                <p>
                  本サイトは、日本全国の消化器外科医局におけるDXの取り組みを紹介し、情報共有を促進することを目的としています。
                </p>
              </Section>

              <Section title="知的財産権">
                <p>
                  本サイトに掲載されている情報（医局DXデータベース、コラム、独自評価等）の著作権は、当社または情報提供元に帰属します。私的使用の範囲を超えて、無断で転載・複製・配布することを禁止します。
                </p>
              </Section>

              <Section title="禁止事項">
                <p className="mb-4">ユーザーは、本サイトの利用にあたり、以下の行為を行ってはなりません。</p>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>本サイトの運営を妨害する行為</li>
                  <li>自動収集ツール（スクレイピング等）を用いてデータベースを取得する行為</li>
                  <li>他者の著作権やプライバシーを侵害する行為</li>
                </ul>
              </Section>

              <Section title="免責事項">
                <p className="mb-4">
                  掲載されている各大学・医局の情報は、公開データおよび独自調査に基づき作成されていますが、その正確性や最新性を永続的に保証するものではありません。
                </p>
                <p>
                  本サイトの情報を利用したことにより生じた損害について、当社は一切の責任を負いません。最終的な確認は各医療機関へ直接行ってください。
                </p>
              </Section>

              <Section title="規約の変更">
                <p>
                  当社は、必要に応じて本規約を変更することがあります。変更後の規約はサイト上に掲載した時点で効力を生じるものとします。
                </p>
              </Section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 last:mb-0">
      <h2 className="mb-4 text-lg font-semibold text-foreground">{title}</h2>
      <div className="text-muted-foreground">{children}</div>
    </div>
  )
}
