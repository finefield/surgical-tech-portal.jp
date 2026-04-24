export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-blue opacity-50 blur-sm" />
                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                  <span className="font-mono text-sm font-bold text-primary">ST</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  Japan Surgical Tech
                </span>
                <span className="text-xs text-muted-foreground">&amp; DX</span>
              </div>
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
              <FooterLink href="/company">運営会社について</FooterLink>
              <FooterLink href="/privacy">プライバシーポリシー</FooterLink>
              <FooterLink href="/terms">利用規約</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 ファインフィールド合同会社. All rights reserved.
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
