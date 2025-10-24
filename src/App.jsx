import React, { useState, useCallback } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Editor from "./components/Editor"
import Preview from "./components/Preview"
import useQRCode from "./hooks/useQRCode"

export default function App() {
  const [text, setText] = useState("https://example.com")
  const [size, setSize] = useState(256)

  // useQRCode returns dataUrl, loading, error
  const { dataUrl: qrDataUrl, loading, error } = useQRCode(text, size)

  const handleClear = useCallback(() => {
    setText("")
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Editor
            text={text}
            setText={setText}
            size={size}
            setSize={setSize}
            qrDataUrl={qrDataUrl}
            onClear={handleClear}
          />

          <Preview
            qrDataUrl={qrDataUrl}
            size={size}
            text={text}
            loading={loading}
            error={error}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}