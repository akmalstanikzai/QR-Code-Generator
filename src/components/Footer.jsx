import React from "react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-inner mt-16">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm">
        <p className="text-blue-100">
          © {new Date().getFullYear()} QR Code Generator. All rights reserved.
        </p>
        <p className="mt-2 md:mt-0 text-blue-50 hover:text-white transition-colors duration-300">
          Created by <span className="font-semibold">Akmal Stanikzai</span>
        </p>
      </div>
    </footer>
  )
}
