import React, { useEffect, useState } from "react"
import QRCode from "qrcode"

export default function App() {
  const [text, setText] = useState("https://example.com")
  const [size, setSize] = useState(256)
  const [qrDataUrl, setQrDataUrl] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!text) {
      setQrDataUrl("")
      return
    }

    let mounted = true
    const opts = {
      width: +size || 256,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff"
      }
    }

    QRCode.toDataURL(text, opts)
      .then((url) => {
        if (mounted) {
          setQrDataUrl(url)
          setError("")
        }
      })
      .catch((err) => {
        console.error(err)
        if (mounted) setError("Failed to generate QR code")
      })

    return () => {
      mounted = false
    }
  }, [text, size])

  const handleDownload = () => {
    if (!qrDataUrl) return
    const a = document.createElement("a")
    a.href = qrDataUrl
    // sanitize filename (replace spaces etc)
    const name = text ? text.replace(/[^a-z0-9]/gi, "_").slice(0, 50) : "qr"
    a.download = `${name}.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold">QR Code Generator</h1>
          <p className="text-sm text-slate-600 mt-1">
            Generate a QR code from any text or URL. Built with React, Vite and Tailwind CSS.
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                onChange={(e) => setSize(e.target.value)}
                className="w-full"
              />
              <span className="w-16 text-right text-sm text-slate-600">{size}px</span>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setText("")}
                className="px-4 py-2 bg-red-50 text-red-700 border rounded-md hover:bg-red-100"
              >
                Clear
              </button>

              <button
                onClick={() => navigator.clipboard.writeText(qrDataUrl)}
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

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </section>

          <section className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-md border">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Generated QR"
                    width={size}
                    height={size}
                    style={{ imageRendering: "pixelated" }}
                    className="block"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-sm text-slate-500">
                    Enter text or URL to generate QR code
                  </div>
                )}
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Tip: Scanning the QR will open the encoded URL/text on devices that support it.
              </p>

              <div className="mt-4 w-full text-xs text-slate-500">
                <strong>Preview info:</strong>
                <div className="mt-1 break-words">{text || <span className="text-slate-400">— empty —</span>}</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-4 text-sm text-slate-600">
          Built with React + Vite + Tailwind — created by {`@${"Akmal Stanikzai"}`}
        </div>
      </footer>
    </div>
  )
}