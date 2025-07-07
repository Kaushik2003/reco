"use client"

import { create } from "zustand"

interface EditModeStore {
  isEditMode: boolean
  toggleEditMode: () => void
  setEditMode: (mode: boolean) => void
}

export const useEditMode = create<EditModeStore>((set) => ({
  isEditMode: false,
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  setEditMode: (mode: boolean) => set({ isEditMode: mode }),
}))
