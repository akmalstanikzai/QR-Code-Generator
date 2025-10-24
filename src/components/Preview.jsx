import React from "react"

export default function Preview({ qrDataUrl, size, text, loading, error }) {
  return (
    <section className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-md border">
          {loading ? (
            <div className="w-64 h-64 flex items-center justify-center text-sm text-slate-500">
              Generating...
            </div>
          ) : qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Generated QR"
              width={size}
              height={size}
              style={{ imageRendering: "pixelated" }}
              className="block"
            />
          ) : (
            <div className="w-64 h-64 flex items-center justify-center text-sm text-slate-500">
              Enter text or URL to generate QR code
            </div>
          )}
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <p className="mt-4 text-sm text-slate-600">
          Tip: Scanning the QR will open the encoded URL/text on devices that support it.
        </p>

        <div className="mt-4 w-full text-xs text-slate-500">
          <strong>Preview info:</strong>
          <div className="mt-1 break-words">{text || <span className="text-slate-400">— empty —</span>}</div>
        </div>
      </div>
    </section>
  )
}