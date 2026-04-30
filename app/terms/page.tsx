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

              <Section title="掲載情報について">
                <p className="mb-4">
                  本サイトに掲載されている各大学・医局等の情報は、公開情報および独自調査に基づき作成されたものであり、特定の医療機関を公式に代表するものではありません。
                </p>
                <p>
                  また、情報の正確性・完全性・最新性について保証するものではありません。
                </p>
              </Section>

              <Section title="医療情報に関する免責">
                <p className="mb-4">
                  本サイトに掲載されている情報は、一般的な情報提供を目的としたものであり、診断・治療・医療行為の代替となるものではありません。
                </p>
                <p>
                  医療に関する最終的な判断は、必ず医療機関等の専門家にご相談ください。
                </p>
              </Section>

              <Section title="免責事項">
                <p>
                  本サイトの情報を利用したことにより生じた損害について、当社は一切の責任を負いません。また、掲載内容に問題がある場合は、確認のうえ適切に対応いたします。
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
