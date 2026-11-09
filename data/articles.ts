import { features } from "@/data/features"
import { japanItems, globalItems } from "@/data/showcase"

// 特集記事（features.ts と showcase.ts）を1つの記事モデルに統一する
export interface Article {
  slug: string
  kind: "国内特集" | "海外編"
  title: string
  subtitle?: string
  university: string
  department: string
  prefecture: string
  tags: string[]
  description: string
  refs: { label: string; url: string }[]
}

export const articles: Article[] = [
  ...features.map((f) => ({
    slug: `feature-${f.id}`,
    kind: "国内特集" as const,
    title: f.title,
    subtitle: f.subtitle,
    university: f.university,
    department: f.department,
    prefecture: f.prefecture,
    tags: f.tags,
    description: f.description,
    refs: f.references,
  })),
  ...japanItems.map((s) => ({
    slug: `showcase-${s.id}`,
    kind: "国内特集" as const,
    title: s.title,
    university: s.university,
    department: s.department,
    prefecture: s.prefecture,
    tags: s.tags,
    description: s.description,
    refs: s.refs,
  })),
  ...globalItems.map((s) => ({
    slug: `showcase-${s.id}`,
    kind: "海外編" as const,
    title: s.title,
    university: s.university,
    department: s.department,
    prefecture: s.prefecture,
    tags: s.tags,
    description: s.description,
    refs: s.refs,
  })),
]

export function findArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
