import React from "react"

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-8 text-center text-white">
        <h1 className="text-3xl font-bold tracking-wide animate-fade-in">
          QR Code Generator
        </h1>
        <p className="text-sm text-blue-100 mt-2">
          Generate a QR code from any text or URL.
        </p>
      </div>
    </header>
  )
}
