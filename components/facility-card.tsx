import Link from "next/link"
import { ArrowUpRight, MapPin} from "lucide-react"
import type { Facility} from "@/data/facilities"

export function FacilityCard({ facility}: { facility: Facility}) {
return (
<Link href={`/facilities/${facility.id}`} className="group relative block">
{/* Glow effect on hover */}
<div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-blue opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-50" />

{/* Card */}
<div className="relative flex min-h-[320px] flex-col rounded-xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-neon-cyan/50 group-hover:bg-card">
{/* Area Badge */}
<div className="mb-3 flex items-center gap-2">
<span className="inline-flex items-center gap-1 rounded-md bg-secondary/80 px-2 py-0.5 text-xs text-muted-foreground">
<MapPin className="h-3 w-3" />
{facility.prefecture}
</span>
</div>

{/* Tags */}
<div className="mb-4 flex flex-wrap gap-2">
{facility.tags.slice(0, 2).map((tag) => (
<span
key={tag}
className="inline-flex items-center rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-2.5 py-0.5 text-xs font-medium text-neon-cyan"
>
{tag}
</span>
))}
</div>

{/* University & Department Name */}
<h3 className="mb-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
{facility.university}
</h3>
<p className="mb-3 text-sm text-muted-foreground">{facility.name}</p>

{/* Headline */}
<p className="mb-2 text-sm font-medium text-foreground/80 line-clamp-2">
{facility.headline}
</p>

{/* Description Preview - remove markers for card view */}
<p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-4">
{facility.description.replace(/\u3010[^\u3011]+\u3011/g, "")}
</p>

{/* Link */}
<div className="mt-auto flex items-center justify-between">
<span className="text-xs text-muted-foreground">詳細を見る</span>
<div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-secondary/50 transition-all duration-300 group-hover:border-neon-cyan/50 group-hover:bg-neon-cyan/20">
<ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
</div>
</div>
</div>
</Link>
)
}
