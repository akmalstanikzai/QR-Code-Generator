import { useEffect, useState, useRef } from "react"
import QRCode from "qrcode"

/**
 * useQRCode - returns { dataUrl, loading, error }
 * Debounces generation slightly to avoid frequent regenerations while typing.
 */
export default function useQRCode(text, size, opts = {}) {
  const [dataUrl, setDataUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const mounted = useRef(true)
  const timer = useRef(null)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  useEffect(() => {
    if (!text) {
      setDataUrl("")
      setError("")
      setLoading(false)
      return
    }

    // Debounce to avoid regenerating on every keystroke.
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setLoading(true)
      setError("")

      const qropts = {
        width: +size || 256,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
        ...opts,
      }

      QRCode.toDataURL(text, qropts)
        .then((url) => {
          if (!mounted.current) return
          setDataUrl(url)
          setError("")
        })
        .catch((err) => {
          console.error("QR generation error:", err)
          if (!mounted.current) return
          setError("Failed to generate QR code")
          setDataUrl("")
        })
        .finally(() => {
          if (!mounted.current) return
          setLoading(false)
        })
    }, 220)

    // cleanup on param change
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
      }
    }
  }, [text, size, JSON.stringify(opts)])

  return { dataUrl, loading, error }
}