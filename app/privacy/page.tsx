"use client"

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
                  <li>お問い合わせへの対応</li>
                  <li>必要に応じたご連絡</li>
                  <li>サービス改善および分析</li>
                </ul>
              </Section>

              <Section title="個人情報の第三者提供">
                <p>
                  法令に基づく場合を除き、本人の同意なく第三者に提供することはありません。
                </p>
              </Section>

              <Section title="安全管理措置">
                <p>
                  当社は、個人情報の漏洩・紛失を防止するため、適切な管理を行います。
                </p>
              </Section>

              <Section title="アクセス解析ツールについて">
                <p>
                  本サイトでは、サービス向上のためにアクセス解析ツールを利用する場合があります。これにより収集される情報には、個人を特定するものは含まれません。
                </p>
              </Section>

              <Section title="お問い合わせ窓口">
                <p className="mb-4">
                  個人情報の取扱いに関するお問い合わせは、以下までご連絡ください。
                </p>
                <ContactEmail />
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

function ContactEmail() {
  const handleClick = () => {
    const user = "info"
    const domain = "finefield.net"
    window.location.href = `mailto:${user}@${domain}`
  }

  return (
    <div className="space-y-3">
      <p className="font-mono text-sm text-foreground">
        info [at] finefield [dot] net
      </p>
      <p className="text-xs text-muted-foreground">
        ※迷惑メール対策のため、メールアドレスは一部表記を変更しています。
        送信時は [at] を @ に、[dot] を . に置き換えてください。
      </p>
      <button
        onClick={handleClick}
        className="mt-1 inline-block rounded-md border border-border/60 bg-secondary/40 px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary/70"
      >
        メールを送る
      </button>
    </div>
  )
}
