import styles from "./header.module.css"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" aria-label="Surgical Tech Portal ホーム" className={`${styles.logo} flex items-center transition-opacity hover:opacity-80`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/surgical-tech-portal-logo.png"
              alt=""
              width={1389}
              height={414}
              className="h-auto w-[162px] sm:w-[205px]"
            />
          </a>

          <nav className="flex items-center gap-0.5 whitespace-nowrap text-xs sm:gap-2 sm:text-sm">
            <a href="/database" className="rounded-full px-2 py-1.5 sm:px-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              データベース
            </a>
            <a href="/features" className="hidden rounded-full px-2 py-1.5 sm:px-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:block">
              特集
            </a>
            <a href="/insights" className="hidden rounded-full px-2 py-1.5 sm:px-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:block">
              データで見る
            </a>
            <a href="/contact" className="rounded-full px-2 py-1.5 sm:px-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              お問い合わせ
            </a>
          </nav>
        </div>
      </div>

      
    </header>
  )
}
