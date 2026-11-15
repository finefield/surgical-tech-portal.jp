const SITE_ORIGIN = "https://www.surgical-tech-portal.jp"

// 施設・特集ページのシェア導線（X／Facebook／LINE／Threads／LinkedIn／はてなブックマーク／Bluesky）。
// 文面にはページ固有タイトルと正規URLが入る。デザインは出典リストの言語に合わせる。
export function ShareLinks({ id, title, path }: { id: string; title: string; path: string }) {
  const url = `${SITE_ORIGIN}${path}`
  const links = [
    {
      label: "X でポスト",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "Facebook でシェア",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      label: "LINE で送る",
      href: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
    },
    {
      label: "Threads でポスト",
      href: `https://www.threads.net/intent/post?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
    {
      label: "LinkedIn でシェア",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "はてなブックマーク",
      href: `https://b.hatena.ne.jp/entry/${encodeURIComponent(url)}`,
    },
    {
      label: "Bluesky でポスト",
      href: `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ]
  return (
    <section className="team-share" aria-labelledby={id}>
      <h2 id={id}>このページをシェア</h2>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
