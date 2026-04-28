const updateLogs = [
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
