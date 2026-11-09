import type { Metadata} from "next"
import { ArrowUpRight, MapPin} from "lucide-react"
import { Header} from "@/components/header"
import { Footer} from "@/components/footer"
import { articles, type Article} from "@/data/articles"

export const metadata: Metadata = {
title: "特集記事 | Surgical Tech Portal",
description:
"国内の先進的な消化器外科医局の取り組みと、世界の手術支援テクノロジーの動向を伝える特集記事の一覧です。各記事の内容は公式情報を出典として確認しています。",
}

function ArticleCard({ article}: { article: Article}) {
const excerpt = article.description
.replace(/\u3010[^\u3011]+\u3011/g, "")
.replace(/■[^\n]*/g, "")
.replace(/\s+/g, " ")
.trim()
return (
<a
href={`/features/${article.slug}`}
className="group flex flex-col rounded-xl border border-border/50 bg-secondary/20 p-6 transition-colors hover:border-neon-cyan/40"
>
<div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
<span className="rounded-md bg-neon-cyan/10 px-2 py-0.5 font-medium text-neon-cyan">
{article.kind}
</span>
{article.prefecture && (
<span className="inline-flex items-center gap-1">
<MapPin className="h-3 w-3" />
{article.prefecture}
</span>
)}
<span>
{article.university} {article.department}
</span>
</div>
<h3 className="mb-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
{article.title}
</h3>
{article.subtitle && (
<p className="mb-2 text-sm text-muted-foreground">{article.subtitle}</p>
)}
<p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
{excerpt}
</p>
<div className="mt-auto flex items-center justify-between">
<div className="flex flex-wrap gap-1.5">
{article.tags.slice(0, 3).map((t) => (
<span
key={t}
className="rounded-full border border-border/50 px-2 py-0.5 text-xs text-muted-foreground"
>
{t}
</span>
))}
</div>
<ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-primary" />
</div>
</a>
)
}

export default function FeaturesPage() {
const domestic = articles.filter((a) => a.kind === "国内特集")
const global = articles.filter((a) => a.kind === "海外編")

return (
<div className="min-h-screen bg-background">
<Header />
<main className="pt-24 pb-16">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div className="mb-12">
<p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
Features
</p>
<h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
特集記事
</h1>
<p className="max-w-3xl leading-relaxed text-muted-foreground">
国内の先進的な消化器外科医局の取り組みと、世界の手術支援テクノロジーの動向を伝える特集です。記事の内容は、大学・病院・企業等の公式情報を出典として確認しています。
</p>
</div>

<h2 className="mb-6 text-xl font-bold tracking-tight text-foreground">
国内特集（{domestic.length}件）
</h2>
<div className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
{domestic.map((a) => (
<ArticleCard key={a.slug} article={a} />
))}
</div>

<h2 className="mb-6 text-xl font-bold tracking-tight text-foreground">
海外編（{global.length}件）
</h2>
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
{global.map((a) => (
<ArticleCard key={a.slug} article={a} />
))}
</div>
</div>
</main>
<Footer />
</div>
)
}
