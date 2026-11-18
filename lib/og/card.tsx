import type { Facility } from "@/data/facilities"
import type { Article } from "@/data/articles"
import { FONT_BASE64 } from "./font-data"
import { PANEL_SRC } from "./panel-data"
import { LOGO_SRC } from "./logo-data"

// ページ別 OG カード（1200×630）の共通描画。
// 地色はサイトと同じダークネイビー。右側に TOP の共有画像（surgical-tech-social.jpg）の
// 渦を切り出したパネルを敷く。写真は使わない。全面に柄を敷く／細密な画像を置くと
// ImageResponse の PNG が 500KB を大きく超えるため、パネルはぼかし＋減色し、
// 左端のフェードは画像側に焼き込んである。
//
// 資産は GitHub へバイナリを push できない都合で base64 の TS モジュールにしてある。
// 再生成の手順:
// - フォント（font-data.ts）: Noto Sans JP Bold を、data/facilities.ts・features.ts・
//   showcase.ts・explorer.ts の使用文字＋カード固定文言を --text-file に渡し、
//   --unicodes="U+0020-007E,U+2000-206F,U+2190-21FF,U+3000-303F,U+3040-30FF,U+FF00-FF5E"
//   --no-hinting --desubroutinize でサブセット化して base64 化する。
//   施設名などに新しい漢字が増えたら作り直すこと（未収録字はカードに出ない）。
// - パネル（panel-data.ts）: surgical-tech-social.jpg の右 500×630 を切り出し、
//   ぼかし（半径6）＋64色に減色し、左 38% を地色 #050e1c へフェードさせて base64 化する。
// - ロゴ（logo-data.ts）: public/surgical-tech-portal-logo.png を base64 化する。

export const ogSize = { width: 1200, height: 630 }

export type OgAssets = {
  fontData: ArrayBuffer
  panelSrc: string
  logoSrc: string
}

export function loadOgAssets(): Promise<OgAssets> {
  const fontBuf = Buffer.from(FONT_BASE64, "base64")
  return Promise.resolve({
    fontData: fontBuf.buffer.slice(fontBuf.byteOffset, fontBuf.byteOffset + fontBuf.byteLength) as ArrayBuffer,
    panelSrc: PANEL_SRC,
    logoSrc: LOGO_SRC,
  })
}

export function ogFonts(fontData: ArrayBuffer) {
  return [{ name: "Noto Sans JP", data: fontData, weight: 700 as const, style: "normal" as const }]
}

const ACCENT = "#a5dcf0"
const INK = "#f4f9fc"
const SUB = "#cfe3ee"
const SHADOW = "0 2px 18px rgba(3, 6, 12, 0.9)"

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}

// 1行に収まるよう、文字数から上限サイズを決める（長い診療科名は38pxで2行まで許す）。
function fitSize(text: string, base: number, min: number): number {
  return Math.max(min, Math.min(base, Math.floor(765 / Math.max(1, text.length))))
}

function titleFontSize(title: string): number {
  if (title.length <= 16) return 62
  if (title.length <= 24) return 52
  if (title.length <= 34) return 44
  return 38
}

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return <div />
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {tags.slice(0, 5).map((tag) => (
        <div
          key={tag}
          style={{
            fontSize: 21,
            color: "#d7ecf5",
            border: "1px solid rgba(190, 225, 240, 0.45)",
            borderRadius: 999,
            padding: "5px 14px",
            textShadow: SHADOW,
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  )
}

function Frame({ assets, kicker, children, tags }: {
  assets: OgAssets
  kicker: string
  children: React.ReactNode
  tags: string[]
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#050e1c",
        fontFamily: "Noto Sans JP",
      }}
    >
      <img src={assets.panelSrc} style={{ position: "absolute", top: 0, right: 0, width: 500, height: 630 }} />
      
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "52px 64px",
        }}
      >
        <img src={assets.logoSrc} style={{ width: 236, height: 70 }} />
        <div style={{ display: "flex", flexDirection: "column", width: 780 }}>
          <div style={{ fontSize: 24, color: ACCENT, letterSpacing: 3, marginBottom: 18, textShadow: SHADOW }}>
            {kicker}
          </div>
          {children}
        </div>
        <Tags tags={tags} />
      </div>
    </div>
  )
}

export function FacilityOgCard({ facility, assets }: { facility?: Facility; assets: OgAssets }) {
  const name1 = facility?.university ?? "Surgical Tech Portal"
  const name2 = facility?.name ?? "消化器外科チーム・データベース"
  const size1 = fitSize(name1, 68, 30)
  const size2 = name2.length <= 19 ? fitSize(name2, size1, 34) : 38
  return (
    <Frame
      assets={assets}
      kicker={facility ? `${facility.prefecture} ／ ${facility.area}` : "施設データベース"}
      tags={facility?.tags ?? []}
    >
      <div style={{ fontSize: size1, color: INK, lineHeight: 1.28, fontWeight: 700, textShadow: SHADOW }}>{name1}</div>
      <div style={{ fontSize: size2, color: INK, lineHeight: 1.3, fontWeight: 700, textShadow: SHADOW }}>{name2}</div>
      {facility && (
        <div style={{ fontSize: 28, color: SUB, lineHeight: 1.5, marginTop: 22, textShadow: SHADOW }}>
          {truncate(facility.headline, 56)}
        </div>
      )}
    </Frame>
  )
}

export function ArticleOgCard({ article, assets }: { article?: Article; assets: OgAssets }) {
  const title = article?.title ?? "特集記事"
  const sub = article?.subtitle
    ? truncate(article.subtitle, 46)
    : article
      ? `${article.university} ${article.department}`
      : ""
  return (
    <Frame
      assets={assets}
      kicker={article ? `${article.kind} ／ ${article.prefecture}` : "特集"}
      tags={article?.tags ?? []}
    >
      <div style={{ fontSize: titleFontSize(title), color: INK, lineHeight: 1.35, fontWeight: 700, textShadow: SHADOW }}>
        {truncate(title, 68)}
      </div>
      {sub && (
        <div style={{ fontSize: 27, color: SUB, lineHeight: 1.5, marginTop: 20, textShadow: SHADOW }}>{sub}</div>
      )}
    </Frame>
  )
}
