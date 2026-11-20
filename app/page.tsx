import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TopGateway } from "@/components/top-gateway"
import { UpdateLog } from "@/components/update-log"
import { ShareLinks } from "@/components/share-links"
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo"

const homeSocialImage = "https://www.surgical-tech-portal.jp/surgical-tech-social.jpg"

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://www.surgical-tech-portal.jp/",
    siteName: "Surgical Tech Portal",
    images: [
      {
        url: homeSocialImage,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [homeSocialImage],
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
      <section className="home-about" aria-labelledby="home-about-title">
        <div className="home-about-inner">
          <h2 id="home-about-title">Surgical Tech Portal（サージカルテック）について</h2>
          <p>
            Surgical Tech Portal（サージカルテック）は、全国の消化器外科医局が取り組むロボット手術・AI・遠隔医療などの先端テクノロジーの導入状況を、公開情報に基づいて整理したデータベースです。医局ごとの取り組みは技術テーマや地域から探すことができ、特集記事では個別の取り組みを詳しく紹介しています。
          </p>
          <ul>
            <li><a href="/database">医局データベース</a></li>
            <li><a href="/features">特集記事</a></li>
            <li><a href="/insights">データで見る 日本の消化器外科DX</a></li>
          </ul>
        </div>
      </section>
      <div className="home-share">
        <ShareLinks id="home-share" title={SITE_TITLE} path="/" />
      </div>
      <Footer />
    </div>
  )
}
