"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Edit, Trash2, Plus, Github, FolderOpen } from "lucide-react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { usePortfolioData } from "@/hooks/use-portfolio-data"
import { Modal } from "@/components/ui/modal"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { ProjectForm } from "@/components/forms/project-form"
import type { Project } from "@/lib/types"

export function ProjectsCard() {
  const { isEditMode } = useEditMode()
  const { projects, addProject, updateProject, deleteProject } = usePortfolioData()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; project: Project | null }>({
    isOpen: false,
    project: null,
  })

  const handleAdd = () => {
    setEditingProject(null)
    setIsModalOpen(true)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsModalOpen(true)
  }

  const handleSave = (projectData: Omit<Project, "id"> | Project) => {
    if ("id" in projectData) {
      updateProject(projectData.id, projectData)
    } else {
      addProject(projectData)
    }
    setIsModalOpen(false)
    setEditingProject(null)
  }

  const handleDelete = (project: Project) => {
    setDeleteConfirm({ isOpen: true, project })
  }

  const confirmDelete = () => {
    if (deleteConfirm.project) {
      deleteProject(deleteConfirm.project.id)
    }
    setDeleteConfirm({ isOpen: false, project: null })
  }

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "status-badge status-success"
      case "in-progress":
        return "status-badge status-info"
      case "planned":
        return "status-badge status-warning"
      default:
        return "status-badge bg-gray-100 text-gray-700"
    }
  }

  return (
    <>
      <div className="card-base card-spacing">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Projects</h2>
          {isEditMode && (
            <button onClick={handleAdd} className="btn-primary px-4 py-2 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No projects yet</p>
            <p className="text-sm text-gray-400 mb-4">Showcase your work by adding your projects</p>
            {isEditMode && (
              <button onClick={handleAdd} className="btn-primary px-6 py-3">
                Add your first project
              </button>
            )}
          </div>
        ) : (
          <div className="projects-horizontal-scroll">
            <div className="projects-horizontal-container">
              {projects.map((project) => (
                <div key={project.id} className="project-card-horizontal group edit-mode-card relative">
                  {/* Edit Controls */}
                  {isEditMode && (
                    <div className="edit-controls">
                      <button onClick={() => handleEdit(project)} className="edit-button" aria-label="Edit project">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(project)}
                        className="delete-button"
                        aria-label="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl mb-4 overflow-hidden relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Status Badge */}
                    {project.status && (
                      <div className="absolute top-4 left-4">
                        <span className={getStatusColor(project.status)}>
                          {project.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                        <h3 className="font-bold text-slate-900 text-base mb-2 text-balance">{project.title}</h3>

                        {project.description && (
                          <p className="text-sm text-slate-600 mb-3 line-clamp-2">{project.description}</p>
                        )}

                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.technologies.slice(0, 3).map((tech, index) => (
                              <span key={index} className="status-badge status-info text-xs">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="status-badge bg-gray-100 text-gray-600 text-xs">
                                +{project.technologies.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-sm bg-slate-900 text-white px-3 py-2 rounded-full hover:bg-slate-800 hover-lift font-medium focus-visible-ring"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>View</span>
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-sm bg-gray-700 text-white px-3 py-2 rounded-full hover:bg-gray-800 hover-lift font-medium focus-visible-ring"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Github className="w-3 h-3" />
                                <span>Code</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProject(null)
        }}
        title={editingProject ? "Edit Project" : "Add Project"}
        size="lg"
      >
        <ProjectForm
          project={editingProject || undefined}
          onSave={handleSave}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingProject(null)
          }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, project: null })}
        onConfirm={confirmDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteConfirm.project?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </>
  )
}
