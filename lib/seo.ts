export const SITE_URL = "https://www.surgical-tech-portal.jp"
export const SITE_NAME = "Surgical Tech Portal"
export const SITE_NAME_JP = "サージカルテック"
export const SITE_TITLE = "Surgical Tech Portal（サージカルテック）｜消化器外科の技術革新・医局情報"
export const SITE_DESCRIPTION =
  "Surgical Tech Portal（サージカルテック）は、日本全国の外科系医局におけるロボット手術、AI、VR、内視鏡、遠隔医療などの最新テクノロジー導入状況を可視化するデータベースです。"

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_NAME_JP,
    url: `${SITE_URL}/`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/database?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: SITE_NAME_JP,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/ogp-logo.png`,
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}
