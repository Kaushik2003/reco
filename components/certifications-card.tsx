"use client"

import { useState } from "react"
import { Award, Edit, Trash2, Plus } from "lucide-react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { usePortfolioData } from "@/hooks/use-portfolio-data"
import { Modal } from "@/components/ui/modal"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { CertificationForm } from "@/components/forms/certification-form"
import type { Certification } from "@/lib/types"

interface CertificationsCardProps {
  certifications?: Certification[]
}

export function CertificationsCard({ certifications }: CertificationsCardProps) {
  const { isEditMode } = useEditMode()
  const { certifications: storeCerts, addCertification, updateCertification, deleteCertification } = usePortfolioData()
  const list = certifications ?? storeCerts

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; certification: Certification | null }>({
    isOpen: false,
    certification: null,
  })

  const handleAdd = () => {
    setEditingCertification(null)
    setIsModalOpen(true)
  }

  const handleEdit = (cert: Certification) => {
    setEditingCertification(cert)
    setIsModalOpen(true)
  }

  const handleSave = (certificationData: Omit<Certification, "id"> | Certification) => {
    if ("id" in certificationData) {
      updateCertification(certificationData.id, certificationData)
    } else {
      addCertification(certificationData)
    }
    setIsModalOpen(false)
    setEditingCertification(null)
  }

  const handleDelete = (cert: Certification) => {
    setDeleteConfirm({ isOpen: true, certification: cert })
  }

  const confirmDelete = () => {
    if (deleteConfirm.certification) {
      deleteCertification(deleteConfirm.certification.id)
    }
    setDeleteConfirm({ isOpen: false, certification: null })
  }

  return (
    <>
      <div className="card-base card-spacing">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Certifications & Awards</h2>
          {isEditMode && (
            <button onClick={handleAdd} className="btn-primary px-4 py-2 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Certification</span>
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No certifications yet</p>
            <p className="text-sm text-gray-400 mb-4">
              Add your certifications and awards to showcase your achievements
            </p>
            {isEditMode && (
              <button onClick={handleAdd} className="btn-primary px-6 py-3">
                Add your first certification
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {list.map((cert) => (
              <div key={cert.id} className="border border-slate-200 rounded-2xl p-5 group edit-mode-card relative">
                {/* Edit Controls */}
                {isEditMode && (
                  <div className="edit-controls">
                    <button onClick={() => handleEdit(cert)} className="edit-button" aria-label="Edit certification">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(cert)}
                      className="delete-button"
                      aria-label="Delete certification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-slate-900">{cert.title}</h3>
                    <p className="text-base text-slate-600">{cert.issuer}</p>
                    {cert.dateEarned && (
                      <p className="text-sm text-slate-500 mt-1">
                        Earned: {new Date(cert.dateEarned).toLocaleDateString()}
                      </p>
                    )}
                    {cert.credentialId && <p className="text-xs text-slate-400 mt-1">ID: {cert.credentialId}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`text-sm font-semibold px-4 py-2 rounded-full flex-shrink-0 ${
                        cert.earned ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {cert.status}
                    </span>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Certificate
                      </a>
                    )}
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
          setEditingCertification(null)
        }}
        title={editingCertification ? "Edit Certification" : "Add Certification"}
        size="lg"
      >
        <CertificationForm
          certification={editingCertification || undefined}
          onSave={handleSave}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingCertification(null)
          }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, certification: null })}
        onConfirm={confirmDelete}
        title="Delete Certification"
        message={`Are you sure you want to delete "${deleteConfirm.certification?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </>
  )
}
