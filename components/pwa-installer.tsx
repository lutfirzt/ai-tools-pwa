"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
    }

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setShowInstall(false)
    }

    setDeferredPrompt(null)
  }

  if (!showInstall) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-medium">Install AI Tools</p>
          <p className="text-gray-400 text-xs">Add to home screen for quick access</p>
        </div>
        <Button onClick={handleInstall} size="sm" className="bg-blue-600 hover:bg-blue-700">
          Install
        </Button>
      </div>
    </div>
  )
}
