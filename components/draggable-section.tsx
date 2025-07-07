"use client"

import type React from "react"
import type { ReactNode } from "react"
import { GripVertical } from "lucide-react"
import { useEditMode } from "@/hooks/use-edit-mode"

interface DraggableSectionProps {
  id: string
  children: ReactNode
  onDragStart?: (e: React.DragEvent) => void
  onDragOver?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
}

export function DraggableSection({ id, children, onDragStart, onDragOver, onDrop }: DraggableSectionProps) {
  const { isEditMode } = useEditMode()

  return (
    <div
      draggable={isEditMode}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${
        isEditMode ? "cursor-move" : ""
      }`}
    >
      {isEditMode && (
        <div className="absolute -left-8 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-slate-200 p-2 rounded-lg">
            <GripVertical className="w-4 h-4 text-slate-600" />
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
