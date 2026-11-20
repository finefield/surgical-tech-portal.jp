import type { MetadataRoute } from "next"
import { facilities } from "@/data/facilities"
import { articles } from "@/data/articles"

const BASE = "https://www.surgical-tech-portal.jp"

// lastmod は付けない：データ側にページ単位の実更新日情報がないため、
// 一律の日時を入れるくらいなら付けない（本人の指示）。
export default function sitemap(): MetadataRoute.Sitemap {
  const statics: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, priority: 1.0 },
    { url: `${BASE}/database`, priority: 0.9 },
    { url: `${BASE}/features`, priority: 0.8 },
    { url: `${BASE}/insights`, priority: 0.6 },
    { url: `${BASE}/database/insight`, priority: 0.6 },
    { url: `${BASE}/company`, priority: 0.4 },
    { url: `${BASE}/contact`, priority: 0.4 },
    { url: `${BASE}/privacy`, priority: 0.3 },
    { url: `${BASE}/terms`, priority: 0.3 },
  ]
  const facilityUrls: MetadataRoute.Sitemap = facilities.map((f) => ({
    url: `${BASE}/facilities/${f.id}`,
    priority: 0.6,
  }))
  const featureUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/features/${a.slug}`,
    priority: 0.6,
  }))
  return [...statics, ...facilityUrls, ...featureUrls]
}
