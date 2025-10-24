import React from "react"
import { sanitizeFilename } from "../utils/fileName"

export default function Editor({
  text,
  setText,
  size,
  setSize,
  qrDataUrl,
  onClear,
}) {
  const handleCopyDataUrl = async () => {
    if (!qrDataUrl) return
    try {
      await navigator.clipboard.writeText(qrDataUrl)
    } catch (err) {
      console.error("Clipboard copy failed", err)
    }
  }

  const handleDownload = () => {
    if (!qrDataUrl) return
    const a = document.createElement("a")
    a.href = qrDataUrl
    const name = sanitizeFilename(text || "qr")
    a.download = `${name}.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <label className="block text-sm font-medium text-slate-700">Text or URL</label>
      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL to encode"
        className="mt-2 w-full border rounded-md p-3 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="mt-4 flex items-center gap-4">
        <label className="text-sm text-slate-700">Size:</label>
        <input
          type="range"
          min="128"
          max="1024"
          step="32"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full"
        />
        <span className="w-16 text-right text-sm text-slate-600">{size}px</span>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onClear}
          className="px-4 py-2 bg-red-50 text-red-700 border rounded-md hover:bg-red-100"
        >
          Clear
        </button>

        <button
          onClick={handleCopyDataUrl}
          disabled={!qrDataUrl}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          Copy Image Data URL
        </button>

        <button
          onClick={handleDownload}
          disabled={!qrDataUrl}
          className="ml-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          Download PNG
        </button>
      </div>
    </section>
  )
}