import { explorerThemes, isExplorerThemeKey, type ExplorerViewKey } from "@/data/explorer"

export function parseTheme(value: string | undefined) {
  return value && isExplorerThemeKey(value) ? value : undefined
}

export function themeInfo(key: ExplorerViewKey) {
  return explorerThemes.find((theme) => theme.key === key) ?? explorerThemes[0]
}

export function databaseHref(theme?: ExplorerViewKey) {
  return theme && theme !== "all" ? `/database?theme=${theme}` : "/database"
}

export function facilityHref(id: number, theme?: ExplorerViewKey) {
  return `/facilities/${id}${theme && theme !== "all" ? `?theme=${theme}` : ""}`
}
