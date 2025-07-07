"use client"

import type React from "react"
import { X } from "lucide-react"
import { useEffect, useRef, useCallback } from "react"
import { Portal } from "./portal"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}

export function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const scrollbarWidth = useRef<number>(0)

  // Calculate scrollbar width
  useEffect(() => {
    scrollbarWidth.current = window.innerWidth - document.documentElement.clientWidth
  }, [])

  // Handle body scroll lock and focus management
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement

      // Prevent background scrolling and handle scrollbar compensation
      const originalStyle = window.getComputedStyle(document.body).overflow
      const originalPaddingRight = window.getComputedStyle(document.body).paddingRight

      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${Number.parseInt(originalPaddingRight) + scrollbarWidth.current}px`

      // Focus the modal after a brief delay to ensure it's rendered
      const focusTimeout = setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus()
        }
      }, 100)

      return () => {
        clearTimeout(focusTimeout)
        document.body.style.overflow = originalStyle
        document.body.style.paddingRight = originalPaddingRight

        // Restore focus to the previously focused element
        if (previousActiveElement.current && document.contains(previousActiveElement.current)) {
          previousActiveElement.current.focus()
        }
      }
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault()
        e.stopPropagation()
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape, true)
      return () => document.removeEventListener("keydown", handleEscape, true)
    }
  }, [isOpen, onClose])

  // Handle focus trap
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      const modal = modalRef.current
      if (!modal) return

      const focusableElements = modal.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])',
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (focusableElements.length === 0) {
        e.preventDefault()
        return
      }

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }
  }, [])

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose],
  )

  if (!isOpen) {
    return null
  }

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }

  return (
    <Portal>
      <div
        className="portal-modal-overlay"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{ pointerEvents: "auto" }}
      >
        <div
          ref={modalRef}
          className={`portal-modal-content ${sizeClasses[size]}`}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Fixed Header */}
          <div className="portal-modal-header">
            <h2 id="modal-title" className="text-xl font-bold text-gray-900 truncate pr-4">
              {title}
            </h2>
            <button onClick={onClose} className="portal-modal-close" aria-label="Close modal" type="button">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="portal-modal-body">{children}</div>
        </div>
      </div>
    </Portal>
  )
}
