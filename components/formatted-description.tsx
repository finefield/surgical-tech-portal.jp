// ■ で始まる大見出しとの小見出しを含む本文テキストを構造化表示する
export function FormattedDescription({ description}: { description: string}) {
const lines = description.split(/(?=■)|(?=【)/)

return (
<>
{lines
.map((line, index) => {
const trimmed = line.trim()
if (!trimmed) return null

if (trimmed.startsWith("■")) {
const content = trimmed.replace(/^■\s*/, "")
return (
<div key={index} className="mt-8 first:mt-0">
<h3 className="mb-3 border-b border-neon-cyan/30 pb-2 text-base font-bold text-neon-cyan">
{content.split(/\n/)[0]}
</h3>
{content
.split(/\n/)
.slice(1)
.map(
(p, i) =>
p.trim() && (
<p key={i} className="mb-2 leading-relaxed text-foreground/80">
{p.trim()}
</p>
),
)}
</div>
)
}

if (trimmed.startsWith("【")) {
const closeIdx = trimmed.indexOf("】")
if (closeIdx > 1) {
const heading = trimmed.slice(1, closeIdx)
const body = trimmed.slice(closeIdx + 1).trim()
return (
<div key={index} className="mt-5 border-l-2 border-neon-cyan/20 pl-4">
<h4 className="mb-2 text-sm font-bold text-foreground">{heading}</h4>
<p className="text-sm leading-relaxed text-foreground/70">{body}</p>
</div>
)
}
}

return (
<p key={index} className="mb-3 leading-relaxed text-foreground/80">
{trimmed}
</p>
)
})
.filter(Boolean)}
</>
)
}
