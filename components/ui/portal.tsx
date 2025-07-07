"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface PortalProps {
  children: React.ReactNode
  containerId?: string
}

export function Portal({ children, containerId = "modal-root" }: PortalProps) {
  const [mounted, setMounted] = useState(false)
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Create or get the portal container
    let portalContainer = document.getElementById(containerId)

    if (!portalContainer) {
      portalContainer = document.createElement("div")
      portalContainer.id = containerId
      portalContainer.style.position = "fixed"
      portalContainer.style.top = "0"
      portalContainer.style.left = "0"
      portalContainer.style.width = "100%"
      portalContainer.style.height = "100%"
      portalContainer.style.pointerEvents = "none"
      portalContainer.style.zIndex = "9999"
      document.body.appendChild(portalContainer)
    }

    setContainer(portalContainer)
    setMounted(true)

    return () => {
      // Clean up empty portal containers
      if (portalContainer && portalContainer.children.length === 0 && portalContainer.parentNode) {
        portalContainer.parentNode.removeChild(portalContainer)
      }
    }
  }, [containerId])

  if (!mounted || !container) {
    return null
  }

  return createPortal(children, container)
}
