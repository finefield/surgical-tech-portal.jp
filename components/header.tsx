export function Header() {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="group relative isolate flex items-center gap-2 transition-opacity hover:opacity-80">
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
            <span className="logo-shine-layer" aria-hidden="true">
              <span className="logo-shine-sweep" />
            </span>
          </a>

          <nav className="flex items-center gap-1 text-sm sm:gap-2">
            <a href="/database" className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              データベース
            </a>
            <a href="/features" className="hidden rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:block">
              特集
            </a>
            <a href="/insights" className="hidden rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:block">
              データで見る
            </a>
            <a href="/contact" className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              お問い合わせ
            </a>
          </nav>
        </div>
      </div>

      
    </header>
  )
}
