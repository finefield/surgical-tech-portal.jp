import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              プライバシーポリシー
            </h1>
            <p className="text-muted-foreground">
              Privacy Policy
            </p>
          </div>

          {/* Content */}
          <div className="rounded-2xl border border-border/50 bg-secondary/20 p-8 backdrop-blur-sm">
            <div className="prose prose-invert max-w-none">
              <p className="mb-8 text-muted-foreground">
                ファインフィールド合同会社（以下、「当社」）は、本サイトを通じて提供するサービス（以下、「本サービス」）における、ユーザーの個人情報の取扱いについて、以下の通りプライバシーポリシーを定めます。
              </p>

              <Section title="個人情報の定義">
                <p>
                  氏名、勤務先、メールアドレス、電話番号等、特定の個人を識別できる情報を指します。
                </p>
              </Section>

              <Section title="個人情報の収集・利用目的">
                <p className="mb-4">本サービスでは、以下の目的で個人情報を利用します。</p>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>本サービスに関するお問い合わせへの回答</li>
                  <li>医局情報等のアップデートに関する連絡</li>
                  <li>サイト利用状況の分析によるサービス改善</li>
                </ul>
              </Section>

              <Section title="個人情報の第三者提供">
                <p>
                  法令に基づく場合を除き、本人の同意なく個人情報を第三者に提供することはありません。
                </p>
              </Section>

              <Section title="安全管理措置">
                <p>
                  当社は、個人情報の漏洩や紛失を防止するため、適切なセキュリティ対策を講じ、厳重に管理いたします。
                </p>
              </Section>

              <Section title="お問い合わせ窓口">
                <p>
                  個人情報の取扱いに関するお問い合わせは、当社公式サイトのお問い合わせフォームよりご連絡ください。
                </p>
                <a
                  href="https://finefield.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-primary transition-colors hover:text-primary/80"
                >
                  お問い合わせフォームへ →
                </a>
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
