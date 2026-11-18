import { ImageResponse } from "next/og"
import { articles, findArticle } from "@/data/articles"
import { ArticleOgCard, loadOgAssets, ogFonts, ogSize } from "@/lib/og/card"

export const alt = "Surgical Tech Portal 特集ページの共有画像"
export const size = ogSize
export const contentType = "image/png"

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = findArticle(slug)
  const assets = await loadOgAssets()
  return new ImageResponse(<ArticleOgCard article={article} assets={assets} />, {
    ...size,
    fonts: ogFonts(assets.fontData),
  })
}
