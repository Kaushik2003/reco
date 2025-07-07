"use client"

import type React from "react"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { usePortfolioData } from "@/hooks/use-portfolio-data"

const techColors = [
  "from-yellow-400 to-orange-400",
  "from-blue-400 to-purple-400",
  "from-purple-400 to-pink-400",
  "from-green-400 to-blue-400",
  "from-red-400 to-pink-400",
]

export function TechnologiesCard() {
  const { isEditMode } = useEditMode()
  const { technologies, addTechnology, removeTechnology } = usePortfolioData()
  const [newTech, setNewTech] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = () => {
    if (newTech.trim()) {
      addTechnology(newTech.trim())
      setNewTech("")
      setIsAdding(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd()
    } else if (e.key === "Escape") {
      setNewTech("")
      setIsAdding(false)
    }
  }

  return (
    <div className="card-base card-spacing">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Technologies Used</h2>
        {isEditMode && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn-primary px-4 py-2 flex items-center space-x-2"
            disabled={isAdding}
          >
            <Plus className="w-4 h-4" />
            <span>Add Technology</span>
          </button>
        )}
      </div>

      <div className="grid-responsive grid-technologies">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="tech-grid-item aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex flex-col items-center justify-center card-hover p-4"
          >
            {isEditMode && (
              <button
                onClick={() => removeTechnology(tech)}
                className="tech-remove-button"
                aria-label={`Remove ${tech}`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
            <div
              className={`w-12 h-12 bg-gradient-to-br ${techColors[index % techColors.length]} rounded-xl flex items-center justify-center mb-2`}
            >
              <span className="text-white font-bold text-lg">{tech.charAt(0)}</span>
            </div>
            <span className="text-xs font-medium text-slate-700 text-center leading-tight">{tech}</span>
          </div>
        ))}

        {/* Add New Technology Input */}
        {isEditMode && isAdding && (
          <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex flex-col items-center justify-center p-4 border-2 border-dashed border-blue-300">
            <input
              type="text"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={() => {
                if (!newTech.trim()) {
                  setIsAdding(false)
                }
              }}
              placeholder="Technology name"
              className="w-full text-center text-xs font-medium bg-transparent border-none outline-none placeholder-blue-400"
              autoFocus
              maxLength={20}
            />
            <div className="flex space-x-1 mt-2">
              <button
                onClick={handleAdd}
                className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                disabled={!newTech.trim()}
              >
                <Plus className="w-3 h-3" />
              </button>
              <button
                onClick={() => {
                  setNewTech("")
                  setIsAdding(false)
                }}
                className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {technologies.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-400 font-bold text-lg">T</span>
          </div>
          <p className="text-lg font-medium mb-2">No technologies added yet</p>
          <p className="text-sm text-gray-400 mb-4">Add the tools and technologies you work with</p>
          {isEditMode && (
            <button onClick={() => setIsAdding(true)} className="btn-primary px-6 py-3">
              Add your first technology
            </button>
          )}
        </div>
      )}
    </div>
  )
}
