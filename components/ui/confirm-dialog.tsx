"use client"

import type React from "react"
import { useEffect, useRef, useCallback } from "react"
import { Portal } from "./portal"

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: "danger" | "warning" | "info"
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const confirmButtonRef = useRef<HTMLButtonElement>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const scrollbarWidth = useRef<number>(0)

  // Calculate scrollbar width
  useEffect(() => {
    scrollbarWidth.current = window.innerWidth - document.documentElement.clientWidth
  }, [])

  // Handle body scroll lock and focus management
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      const originalPaddingRight = window.getComputedStyle(document.body).paddingRight

      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${Number.parseInt(originalPaddingRight) + scrollbarWidth.current}px`

      // Focus the appropriate button based on dialog type
      const focusTimeout = setTimeout(() => {
        if (type === "danger" && confirmButtonRef.current) {
          confirmButtonRef.current.focus()
        } else if (cancelButtonRef.current) {
          cancelButtonRef.current.focus()
        } else if (dialogRef.current) {
          dialogRef.current.focus()
        }
      }, 100)

      return () => {
        clearTimeout(focusTimeout)
        document.body.style.overflow = originalStyle
        document.body.style.paddingRight = originalPaddingRight
      }
    }
  }, [isOpen, type])

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

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose],
  )

  // Handle confirm action
  const handleConfirm = useCallback(() => {
    onConfirm()
    onClose()
  }, [onConfirm, onClose])

  // Handle key navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      const buttons = [cancelButtonRef.current, confirmButtonRef.current].filter(Boolean)
      if (buttons.length === 0) return

      const currentIndex = buttons.findIndex((button) => button === document.activeElement)

      if (e.shiftKey) {
        const prevIndex = currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1
        e.preventDefault()
        buttons[prevIndex]?.focus()
      } else {
        const nextIndex = currentIndex >= buttons.length - 1 ? 0 : currentIndex + 1
        e.preventDefault()
        buttons[nextIndex]?.focus()
      }
    }
  }, [])

  if (!isOpen) {
    return null
  }

  const typeStyles = {
    danger: "btn-danger",
    warning: "bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-xl transition-colors duration-200",
    info: "btn-primary",
  }

  return (
    <Portal>
      <div className="portal-modal-overlay" onClick={handleBackdropClick} style={{ pointerEvents: "auto" }}>
        <div
          ref={dialogRef}
          className="portal-modal-content max-w-md"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          tabIndex={-1}
        >
          <div className="p-6">
            <h3 id="confirm-title" className="text-lg font-bold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>
            <div className="flex space-x-3 justify-end">
              <button ref={cancelButtonRef} onClick={onClose} className="btn-secondary px-4 py-2" type="button">
                {cancelText}
              </button>
              <button
                ref={confirmButtonRef}
                onClick={handleConfirm}
                className={`px-4 py-2 ${typeStyles[type]}`}
                type="button"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}
