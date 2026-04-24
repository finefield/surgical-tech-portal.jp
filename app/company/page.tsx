import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Building2, MapPin, Globe, Briefcase, Heart } from "lucide-react"

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              運営会社について
            </h1>
            <p className="text-muted-foreground">
              Company Profile
            </p>
          </div>

          {/* Company Info Card */}
          <div className="rounded-2xl border border-border/50 bg-secondary/20 p-8 backdrop-blur-sm">
            <div className="space-y-8">
              {/* Company Name */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-1 text-sm font-medium text-muted-foreground">運営会社名</h2>
                  <p className="text-lg font-semibold text-foreground">
                    ファインフィールド合同会社（Finefield Inc.）
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-1 text-sm font-medium text-muted-foreground">本社所在地</h2>
                  <p className="text-foreground">
                    〒101-0051<br />
                    東京都千代田区神田神保町2-19<br />
                    神保町SF II 401
                  </p>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-1 text-sm font-medium text-muted-foreground">公式サイト</h2>
                  <a
                    href="https://finefield.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary transition-colors hover:text-primary/80"
                  >
                    https://finefield.net/
                  </a>
                </div>
              </div>

              {/* Business */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-1 text-sm font-medium text-muted-foreground">事業内容</h2>
                  <ul className="space-y-1 text-foreground">
                    <li>医師主導の医療メディア開発・運用</li>
                    <li>デジタルコンテンツ企画制作</li>
                    <li>マーケティング</li>
                    <li>映像制作・配信</li>
                    <li>医学会イベントサポート</li>
                    <li>通信環境コンサルティング</li>
                  </ul>
                </div>
              </div>

              {/* Mission */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-1 text-sm font-medium text-muted-foreground">運営の想い</h2>
                  <p className="leading-relaxed text-foreground">
                    当社は「実臨床に役立つ情報提供」をミッションとしています。
                    本ポータルサイトでは、全国の外科医局が取り組む最新のDX（デジタルトランスフォーメーション）を可視化し、
                    日本の外科医療の未来と技術伝承を支援することを目指しています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
