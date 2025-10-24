// small helper to create a safe filename from input text
export function sanitizeFilename(input = "qr", maxLength = 50) {
  const cleaned = String(input)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_\-\.]/g, "")
  return (cleaned || "qr").slice(0, maxLength)
}