"use client"

import { useState } from "react"
import { Building2, Edit, Trash2, Plus } from "lucide-react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { usePortfolioData } from "@/hooks/use-portfolio-data"
import { Modal } from "@/components/ui/modal"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { ExperienceForm } from "@/components/forms/experience-form"
import type { Experience } from "@/lib/types"

export function ExperienceCard() {
  const { isEditMode } = useEditMode()
  const { experience, addExperience, updateExperience, deleteExperience } = usePortfolioData()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; experience: Experience | null }>({
    isOpen: false,
    experience: null,
  })

  const companyColors = [
    "from-blue-400 to-blue-500",
    "from-red-400 to-red-500",
    "from-green-400 to-green-500",
    "from-purple-400 to-purple-500",
  ]

  const handleAdd = () => {
    setEditingExperience(null)
    setIsModalOpen(true)
  }

  const handleEdit = (exp: Experience) => {
    setEditingExperience(exp)
    setIsModalOpen(true)
  }

  const handleSave = (experienceData: Omit<Experience, "id"> | Experience) => {
    if ("id" in experienceData) {
      updateExperience(experienceData.id, experienceData)
    } else {
      addExperience(experienceData)
    }
    setIsModalOpen(false)
    setEditingExperience(null)
  }

  const handleDelete = (exp: Experience) => {
    setDeleteConfirm({ isOpen: true, experience: exp })
  }

  const confirmDelete = () => {
    if (deleteConfirm.experience) {
      deleteExperience(deleteConfirm.experience.id)
    }
    setDeleteConfirm({ isOpen: false, experience: null })
  }

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Professional Experience</h2>
          {isEditMode && (
            <button
              onClick={handleAdd}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Experience</span>
            </button>
          )}
        </div>

        {experience.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No experience entries yet.</p>
            {isEditMode && (
              <button onClick={handleAdd} className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                Add your first experience
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div
                key={exp.id}
                className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow group edit-mode-card relative"
              >
                {/* Edit Controls */}
                {isEditMode && (
                  <div className="edit-controls">
                    <button onClick={() => handleEdit(exp)} className="edit-button" aria-label="Edit experience">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button onClick={() => handleDelete(exp)} className="delete-button" aria-label="Delete experience">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${companyColors[index % companyColors.length]} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-slate-900">{exp.role}</h3>
                    <p className="text-base text-slate-600">{exp.company}</p>
                    {exp.location && <p className="text-sm text-slate-500">{exp.location}</p>}
                    {exp.description && (
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-cyan-600 font-semibold bg-cyan-50 px-4 py-2 rounded-full flex-shrink-0">
                      {exp.period}
                    </span>
                    {exp.isCurrentRole && <span className="text-xs text-green-600 font-medium mt-1">Current Role</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingExperience(null)
        }}
        title={editingExperience ? "Edit Experience" : "Add Experience"}
        size="lg"
      >
        <ExperienceForm
          experience={editingExperience || undefined}
          onSave={handleSave}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingExperience(null)
          }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, experience: null })}
        onConfirm={confirmDelete}
        title="Delete Experience"
        message={`Are you sure you want to delete "${deleteConfirm.experience?.role}" at "${deleteConfirm.experience?.company}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </>
  )
}
