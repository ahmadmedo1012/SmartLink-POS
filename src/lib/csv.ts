// ponytail: one-liner CSV generation, no lib needed
export function downloadCSV(headers: string[], rows: (string | number)[][], filename: string) {
  const bom = "﻿" // UTF-8 BOM for Arabic Excel compat
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n")
  const blob = new Blob([bom + headers.join(",") + "\n" + csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}
