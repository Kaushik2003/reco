"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight, Plus, Edit, Trash2, Instagram, Linkedin, Youtube, Twitter, Palette, Circle } from "lucide-react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { usePortfolioData } from "@/hooks/use-portfolio-data"
import { Modal } from "@/components/ui/modal"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { SocialForm } from "@/components/forms/social-form"
import type { Social } from "@/lib/types"

const iconMap: Record<string, React.FC<any>> = {
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Twitter,
  palette: Palette,
  circle: Circle,
  behance: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M22 7h-7v2h7V7zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3c3.055 0 2.897 4-.391 4H3v-4h3.391z" />
    </svg>
  ),
  github: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  globe: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="m12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
}

export function EditableSocials() {
  const { isEditMode } = useEditMode()
  const { socials, addSocial, updateSocial, deleteSocial } = usePortfolioData()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSocial, setEditingSocial] = useState<Social | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; social: Social | null }>({
    isOpen: false,
    social: null,
  })

  const handleAdd = () => {
    setEditingSocial(null)
    setIsModalOpen(true)
  }

  const handleEdit = (social: Social) => {
    setEditingSocial(social)
    setIsModalOpen(true)
  }

  const handleSave = (socialData: Omit<Social, "id"> | Social) => {
    if ("id" in socialData) {
      updateSocial(socialData.id, socialData)
    } else {
      addSocial(socialData)
    }
    setIsModalOpen(false)
    setEditingSocial(null)
  }

  const handleDelete = (social: Social) => {
    setDeleteConfirm({ isOpen: true, social })
  }

  const confirmDelete = () => {
    if (deleteConfirm.social) {
      deleteSocial(deleteConfirm.social.id)
    }
    setDeleteConfirm({ isOpen: false, social: null })
  }

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Social Links</h3>
          {isEditMode && (
            <button
              onClick={handleAdd}
              className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
              aria-label="Add social link"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>

        {socials.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500 mb-2">No social links added yet</p>
            {isEditMode && (
              <button onClick={handleAdd} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Add your first social link
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {socials.map((social) => {
              const key = (social.icon || "").toLowerCase()
              const Icon = iconMap[key] ?? ChevronRight // fallback icon
              return (
                <div
                  key={social.id}
                  className="social-item bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-3 flex items-center gap-2 hover:shadow-md transition-all cursor-pointer"
                >
                  {/* Edit Controls */}
                  {isEditMode && (
                    <div className="social-edit-controls">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleEdit(social)
                        }}
                        className="social-edit-button"
                        aria-label="Edit social link"
                      >
                        <Edit className="w-2.5 h-2.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleDelete(social)
                        }}
                        className="social-delete-button"
                        aria-label="Delete social link"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}

                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 flex-1 min-w-0"
                    onClick={(e) => {
                      if (isEditMode) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-900 truncate">{social.platform}</div>
                      <div className="text-xs text-slate-500 truncate">{social.handle}</div>
                    </div>
                    {!isEditMode && (
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    )}
                  </a>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingSocial(null)
        }}
        title={editingSocial ? "Edit Social Link" : "Add Social Link"}
        size="md"
      >
        <SocialForm
          social={editingSocial || undefined}
          onSave={handleSave}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingSocial(null)
          }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, social: null })}
        onConfirm={confirmDelete}
        title="Delete Social Link"
        message={`Are you sure you want to delete your ${deleteConfirm.social?.platform} link? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </>
  )
}
