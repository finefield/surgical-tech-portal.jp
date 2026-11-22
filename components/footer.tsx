export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" aria-label="Surgical Tech Portal ホーム" className="flex items-center transition-opacity hover:opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/surgical-tech-portal-logo.png"
                alt=""
                width={1389}
                height={414}
                className="h-auto w-[180px]"
              />
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              日本の外科医療テクノロジーの
              <br />
              情報プラットフォーム
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">リンク</h3>
            <ul className="space-y-3">
              <FooterLink href="/insights">データで見る</FooterLink>
              <FooterLink href="/features">特集記事</FooterLink>
              <FooterLink href="/company">運営会社について</FooterLink>
              <FooterLink href="/contact">お問い合わせ</FooterLink>
              <FooterLink href="/privacy">プライバシーポリシー</FooterLink>
              <FooterLink href="/terms">利用規約</FooterLink>
            </ul>
          </div>
        </div>

        {/* Listing information note */}
        <div className="mt-10">
          <p className="text-sm leading-relaxed text-muted-foreground">
            掲載情報は公開情報に基づき、予告なく更新する場合があります。最新情報は各施設の公式サイトをご確認ください。
            <a
              href="/terms#listing-information"
              className="ml-2 underline decoration-muted-foreground/50 underline-offset-4 transition-colors hover:text-foreground"
            >
              掲載情報について
            </a>
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Finefield.inc.
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by Finefield Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {children}
      </a>
    </li>
  )
}
