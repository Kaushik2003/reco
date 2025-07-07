"use client"

import { create } from "zustand"
import type { DraggableSection } from "@/lib/types"

interface PortfolioOrderStore {
  sections: DraggableSection[]
  setSections: (sections: DraggableSection[]) => void
  reorderSections: (startIndex: number, endIndex: number) => void
}

const defaultSections: DraggableSection[] = [
  { id: "education", type: "education", title: "Education", order: 0 },
  { id: "technologies", type: "technologies", title: "Technologies Used", order: 1 },
  { id: "experience", type: "experience", title: "Professional Experience", order: 2 },
  { id: "certifications", type: "certifications", title: "Certifications & Awards", order: 3 },
  { id: "projects", type: "projects", title: "Projects", order: 4 },
]

export const usePortfolioOrder = create<PortfolioOrderStore>((set) => ({
  sections: defaultSections,
  setSections: (sections) => set({ sections }),
  reorderSections: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.sections)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)

      // Update order values
      const updatedSections = result.map((section, index) => ({
        ...section,
        order: index,
      }))

      return { sections: updatedSections }
    }),
}))
