"use client"

import { ArrowUpRight } from "lucide-react"

interface CaseStudy {
  id: number
  institution: string
  tags: string[]
  title: string
  description: string
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    institution: "東京科学大学 消化管外科",
    tags: ["国産ロボットSaroa", "Web配信"],
    title: "世界初・触覚ロボットの導入と均てん化",
    description:
      "国産手術支援ロボット「Saroa」の世界初導入事例。触覚フィードバック技術による安全性向上と、Web配信システムを活用した技術の均てん化を実現。",
  },
  {
    id: 2,
    institution: "高知大学 外科学講座",
    tags: ["腹腔鏡", "合同カンファレンス"],
    title: "全領域の低侵襲化とハイブリッド講演会",
    description:
      "消化器・呼吸器・乳腺など全領域での腹腔鏡手術の標準化。オンラインとオンサイトを組み合わせたハイブリッド形式の学術講演会を定期開催。",
  },
  {
    id: 3,
    institution: "佐野病院（神戸市）",
    tags: ["民間病院", "Saroa", "4K動画広報"],
    title: "Saroa県内初導入と年間2000件の内視鏡実績",
    description:
      "民間病院として兵庫県内初のSaroa導入。年間2000件を超える内視鏡検査・手術実績を4K高画質動画で発信し、地域医療の発展に貢献。",
  },
]

export function CaseCards() {
  return (
    <section id="cases" className="relative py-24">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            最新の導入事例
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            全国の医療機関における先進的なテクノロジー導入事例をご紹介
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseCard key={study.id} study={study} />
          ))}
        </div>

        {/* View all link */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            すべての事例を見る
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group relative">
      {/* Glow effect on hover */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-neon-cyan/50 to-neon-blue/50 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

      {/* Card */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-neon-cyan/50 group-hover:shadow-lg group-hover:shadow-neon-cyan/10">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

        <div className="relative flex flex-1 flex-col p-6">
          {/* Institution */}
          <div className="mb-3 text-sm font-medium text-muted-foreground">
            {study.institution}
          </div>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neon-cyan/10 px-2.5 py-0.5 text-xs font-medium text-neon-cyan"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="mb-3 text-lg font-semibold text-foreground transition-colors group-hover:text-neon-cyan">
            {study.title}
          </h3>

          {/* Description */}
          <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
            {study.description}
          </p>

          {/* Read more link */}
          <div className="flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-neon-cyan">
            <span>詳細を見る</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Bottom gradient accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </article>
  )
}
