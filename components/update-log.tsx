const updateLogs = [
  {
    date: "2026.11.09",
    type: "お知らせ",
    area: "全体",
    title: "特集記事ページへのリンクを戻しました",
    description:
      "特集記事の一覧ページと記事ごとのページへ、ヘッダー・フッター・特集カードから再びアクセスできるようにしました。",
  },
  {
    date: "2026.11.09",
    type: "お知らせ",
    area: "全体",
    title: "特集記事ページへのリンクを一時的に外しました",
    description:
      "特集はトップページの特集コーナーでお読みいただけます。記事ページの公開形態は改めて検討します。",
  },
  {
    date: "2026.11.09",
    type: "お知らせ",
    area: "全体",
    title: "特集記事の重複を整理しました",
    description:
      "同じ大学について2種類あった特集記事を、詳しい記事の方に一本化しました（国内特集は6記事）。あわせて記事本文に残っていた編集時の作業記号を取り除きました。",
  },
  {
    date: "2026.11.09",
    type: "お知らせ",
    area: "全体",
    title: "医局ごとの個別ページと特集記事ページを公開しました",
    description:
      "収録している全113医局に個別ページ（URL）を設け、リンクの共有や検索からの直接アクセスができるようにしました。あわせて、特集記事の一覧ページと記事ごとのページを新設し、これまで表示されていなかった特集5記事を含む全14記事を読めるようにしました。",
  },
  {
    date: "2026.11.09",
    type: "お知らせ",
    area: "全体",
    title: "サイトの使い勝手を改善しました",
    description:
      "データベースに都道府県別の見出しとジャンプボタンを追加し、途中からでも目的の都道府県へ移動できるようにしました。あわせてヘッダーにナビゲーション（データベース／特集／データで見る／お問い合わせ）を追加し、トップページの技術タグから関連する医局を検索できるようにしました。",
  },
  {
    date: "2026.11.09",
    type: "お知らせ",
    area: "全体",
    title: "集計ページ「データで見る」を公開しました",
    description:
      "収録データから自動集計した、ロボット支援手術の広がりや機種別の記載状況、技術タグ・地域別の収録状況を公開しました。数値は収録データの変更に連動して更新されます。",
  },
  {
    date: "2026.11.09",
    type: "お知らせ",
    area: "全体",
    title: "掲載情報の正確性を確認し、修正しました",
    description:
      "収録している全113医局の情報と特集記事について、大学・病院等の公式情報との照合を行い、裏付けの取れない記載の削除・訂正を実施しました。",
  },
  {
    date: "2026.04.28",
    type: "お知らせ",
    area: "全体",
    title: "Surgical Tech Portal を公開しました",
    description:
      "全国の消化器外科系医局におけるロボット手術、映像DX、AI、ナビゲーション、手術教育、医工連携の取り組みを整理するポータルサイトとして公開しました。",
  },
]

export function UpdateLog() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Update Log
          </p>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            更新情報
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Surgical Tech Portal の公開情報をお知らせします。
          </p>
        </div>

        <div className="space-y-3">
          {updateLogs.map((log, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-xl border border-border/50 bg-secondary/30 px-5 py-4 sm:flex-row sm:items-start sm:gap-5"
            >
              {/* Date */}
              <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                {log.date}
              </span>

              {/* Badges */}
              <div className="flex shrink-0 flex-wrap gap-2">
                <span className="rounded-md border border-neon-cyan/30 bg-neon-cyan/10 px-2 py-0.5 text-xs font-medium text-neon-cyan">
                  {log.type}
                </span>
                <span className="rounded-md border border-border/50 bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground">
                  {log.area}
                </span>
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {log.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {log.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
