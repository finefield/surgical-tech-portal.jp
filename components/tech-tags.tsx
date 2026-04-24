"use client"

const tags = [
  { label: "ダヴィンチ", color: "cyan" },
  { label: "Saroa", color: "blue" },
  { label: "ライブサージェリー", color: "cyan" },
  { label: "4K内視鏡", color: "blue" },
  { label: "腹腔鏡", color: "cyan" },
  { label: "Web配信", color: "blue" },
]

export function TechTags() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="text-sm text-muted-foreground">人気のタグ:</span>
      {tags.map((tag) => (
        <button
          key={tag.label}
          className={`group relative overflow-hidden rounded-full px-4 py-1.5 text-sm font-medium transition-all hover:scale-105 ${
            tag.color === "cyan"
              ? "border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan hover:border-neon-cyan/50 hover:bg-neon-cyan/20"
              : "border border-neon-blue/30 bg-neon-blue/10 text-neon-blue hover:border-neon-blue/50 hover:bg-neon-blue/20"
          }`}
        >
          <span className="relative z-10">{tag.label}</span>
          <div
            className={`absolute inset-0 opacity-0 blur-sm transition-opacity group-hover:opacity-50 ${
              tag.color === "cyan" ? "bg-neon-cyan/30" : "bg-neon-blue/30"
            }`}
          />
        </button>
      ))}
    </div>
  )
}
