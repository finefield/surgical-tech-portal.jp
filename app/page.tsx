import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TopGateway } from "@/components/top-gateway"
import { UpdateLog } from "@/components/update-log"

// 共有画像は TOP のみ ogp-logo.png（layout の既定 /ogp.png は他ページで維持）
export const metadata: Metadata = {
  openGraph: {
    title: "外科DX・最新テクノロジー導入医局データベース",
    description:
      "日本全国の外科系医局におけるロボット手術、AI、VR、内視鏡、遠隔医療などの最新テクノロジー導入状況を可視化するデータベースです。",
    url: "https://www.surgical-tech-portal.jp/",
    siteName: "Surgical Tech Portal",
    images: [
      {
        url: "https://www.surgical-tech-portal.jp/ogp-logo.png",
        width: 1200,
        height: 630,
        alt: "Surgical Tech Portal の共有画像：外科は、どこまで未来をひらけるか。",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "外科DX・最新テクノロジー導入医局データベース",
    description:
      "日本全国の外科系医局におけるロボット手術、AI、VR、内視鏡、遠隔医療などの最新テクノロジー導入状況を可視化するデータベースです。",
    images: ["https://www.surgical-tech-portal.jp/ogp-logo.png"],
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030e1b]">
      <Header />
      <main className="pt-16">
        <TopGateway />
        <UpdateLog />
      </main>
      <Footer />
    </div>
  )
}
