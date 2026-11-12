export const specialties = [
  { key: "upper", label: "食道・胃", match: /上部消化管|食道|胃[が癌切外]/ },
  { key: "lower", label: "大腸・直腸", match: /下部消化管|大腸|直腸|結腸/ },
  { key: "hpb", label: "肝胆膵", match: /肝胆膵|肝・胆・膵|肝切除|肝移植|胆道|膵切除|膵がん|膵癌/ },
] as const

export function normalizeDirectorySearch(value: string) {
  return value.normalize("NFKC").toLowerCase().replaceAll("癌", "がん")
}
