import { ImageResponse } from "next/og"
import { facilities } from "@/data/facilities"
import { FacilityOgCard, loadOgAssets, ogFonts, ogSize } from "@/lib/og/card"

export const alt = "Surgical Tech Portal 施設ページの共有画像"
export const size = ogSize
export const contentType = "image/png"

export function generateStaticParams() {
  return facilities.map(({ id }) => ({ id: String(id) }))
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const facility = facilities.find((f) => f.id === Number(id))
  const assets = await loadOgAssets()
  return new ImageResponse(<FacilityOgCard facility={facility} assets={assets} />, {
    ...size,
    fonts: ogFonts(assets.fontData),
  })
}
