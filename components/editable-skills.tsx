"use client"

import type React from "react"
import { useState } from "react"
import { Plus, X } from "lucide-react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { usePortfolioData } from "@/hooks/use-portfolio-data"

export function EditableSkills() {
  const { isEditMode } = useEditMode()
  const { skills, addSkill, removeSkill } = usePortfolioData()
  const [newSkill, setNewSkill] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = () => {
    if (newSkill.trim()) {
      addSkill(newSkill.trim())
      setNewSkill("")
      setIsAdding(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd()
    } else if (e.key === "Escape") {
      setNewSkill("")
      setIsAdding(false)
    }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-start mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Skills</h3>
        {isEditMode && (
          <button
            onClick={() => setIsAdding(true)}
            className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors ml-2"
            disabled={isAdding}
            aria-label="Add skill"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 justify-start">
        {skills.map((skill, index) => (
          <div key={index} className="skill-tag-container">
            <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
              {skill}
            </span>
            {isEditMode && (
              <button onClick={() => removeSkill(skill)} className="skill-remove-button" aria-label={`Remove ${skill}`}>
                <X className="w-2 h-2" />
              </button>
            )}
          </div>
        ))}

        {/* Add New Skill Input */}
        {isEditMode && isAdding && (
          <div className="inline-block">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={() => {
                if (!newSkill.trim()) {
                  setIsAdding(false)
                }
              }}
              placeholder="New skill"
              className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
              maxLength={30}
            />
          </div>
        )}
      </div>

      {skills.length === 0 && (
        <div className="text-left py-4">
          <p className="text-sm text-gray-500 mb-2">No skills added yet</p>
          {isEditMode && (
            <button onClick={() => setIsAdding(true)} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Add your first skill
            </button>
          )}
        </div>
      )}
    </div>
  )
}
