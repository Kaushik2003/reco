"use client"

import type React from "react"
import type { ReactNode } from "react"
import { GripVertical } from "lucide-react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { Draggable } from "@hello-pangea/dnd"

interface DraggableSectionProps {
  id: string
  index: number
  children: ReactNode
}

export function DraggableSection({ id, index, children }: DraggableSectionProps) {
  const { isEditMode } = useEditMode()

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={!isEditMode}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`relative group transition-all duration-200 rounded-xl bg-white shadow-md border border-slate-200 mb-4 ${isEditMode ? "cursor-grab active:cursor-grabbing touch-manipulation" : ""
            } ${snapshot.isDragging ? "ring-2 ring-blue-400 scale-[1.01] z-20" : "hover:shadow-lg hover:-translate-y-1"}`}
          style={{
            ...provided.draggableProps.style,
            touchAction: "pan-y",
            userSelect: "none",
          }}
        >
          {isEditMode && (
            <div className="absolute -left-8 top-4 opacity-100 transition-opacity z-10">
              <div className="bg-slate-200 p-2 rounded-lg shadow-md flex items-center">
                <GripVertical className="w-4 h-4 text-slate-600" />
                <span className="ml-2 text-xs text-slate-500 font-medium select-none">Drag</span>
              </div>
            </div>
          )}
          {children}
        </div>
      )}
    </Draggable>
  )
}
