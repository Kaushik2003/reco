"use client"

import { useState } from "react"
import { GraduationCap, Edit, Trash2, Plus } from "lucide-react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { usePortfolioData } from "@/hooks/use-portfolio-data"
import { Modal } from "@/components/ui/modal"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { EducationForm } from "@/components/forms/education-form"
import type { Education } from "@/lib/types"

export function EducationCard() {
  const { isEditMode } = useEditMode()
  const { education, addEducation, updateEducation, deleteEducation } = usePortfolioData()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; education: Education | null }>({
    isOpen: false,
    education: null,
  })

  const handleAdd = () => {
    setEditingEducation(null)
    setIsModalOpen(true)
  }

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu)
    setIsModalOpen(true)
  }

  const handleSave = (educationData: Omit<Education, "id"> | Education) => {
    if ("id" in educationData) {
      updateEducation(educationData.id, educationData)
    } else {
      addEducation(educationData)
    }
    setIsModalOpen(false)
    setEditingEducation(null)
  }

  const handleDelete = (edu: Education) => {
    setDeleteConfirm({ isOpen: true, education: edu })
  }

  const confirmDelete = () => {
    if (deleteConfirm.education) {
      deleteEducation(deleteConfirm.education.id)
    }
    setDeleteConfirm({ isOpen: false, education: null })
  }

  return (
    <>
      <div className="card-base card-spacing">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Education</h2>
          {isEditMode && (
            <button onClick={handleAdd} className="btn-primary px-4 py-2 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Education</span>
            </button>
          )}
        </div>

        {education.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No education entries yet</p>
            <p className="text-sm text-gray-400 mb-4">
              Add your educational background to showcase your qualifications
            </p>
            {isEditMode && (
              <button onClick={handleAdd} className="btn-primary px-6 py-3">
                Add your first education entry
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="education-card card-spacing group edit-mode-card relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-6 left-6 w-8 h-8 border-2 border-white rounded"></div>
                  <div className="absolute top-6 right-6 w-6 h-6 border-2 border-white rounded"></div>
                  <div className="absolute bottom-6 left-6 w-6 h-6 border-2 border-white rounded"></div>
                </div>

                {/* Edit Controls */}
                {isEditMode && (
                  <div className="edit-controls">
                    <button onClick={() => handleEdit(edu)} className="edit-button" aria-label="Edit education">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button onClick={() => handleDelete(edu)} className="delete-button" aria-label="Delete education">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <span className="status-badge bg-white/20 text-white font-semibold">{edu.period}</span>
                  </div>

                  <h3 className="font-bold text-lg mb-2 text-balance">{edu.degree}</h3>
                  <p className="text-base text-white/90 mb-2">{edu.institution}</p>

                  {edu.gpa && <p className="text-sm text-white/80 mb-2">GPA: {edu.gpa}</p>}

                  {edu.description && <p className="text-sm text-white/80 leading-relaxed">{edu.description}</p>}
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
          setEditingEducation(null)
        }}
        title={editingEducation ? "Edit Education" : "Add Education"}
        size="lg"
      >
        <EducationForm
          education={editingEducation || undefined}
          onSave={handleSave}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingEducation(null)
          }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, education: null })}
        onConfirm={confirmDelete}
        title="Delete Education"
        message={`Are you sure you want to delete "${deleteConfirm.education?.degree}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </>
  )
}
