"use client"

import type React from "react"

import { useState } from "react"
import { FormField } from "@/components/ui/form-field"
import type { Project } from "@/lib/types"

interface ProjectFormProps {
  project?: Project
  onSave: (project: Omit<Project, "id"> | Project) => void
  onCancel: () => void
}

export function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    url: project?.url || "",
    githubUrl: project?.githubUrl || "",
    startDate: project?.startDate || "",
    endDate: project?.endDate || "",
    status: project?.status || ("completed" as const),
    technologies: project?.technologies?.join(", ") || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Project title is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Project description is required"
    }
    if (formData.url && !isValidUrl(formData.url)) {
      newErrors.url = "Please enter a valid URL"
    }
    if (formData.githubUrl && !isValidUrl(formData.githubUrl)) {
      newErrors.githubUrl = "Please enter a valid GitHub URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
        image: formData.image || "/placeholder.svg?height=240&width=320",
        ...(project?.id && { id: project.id }),
      }

      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
      onSave(projectData as Project)
    } catch (error) {
      console.error("Error saving project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <FormField
        label="Project Title"
        value={formData.title}
        onChange={(value) => setFormData({ ...formData, title: value })}
        placeholder="e.g., E-commerce Platform"
        required
        error={errors.title}
      />

      <FormField
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={(value) => setFormData({ ...formData, description: value })}
        placeholder="Describe your project, its purpose, and key features..."
        rows={4}
        required
        error={errors.description}
      />

      <FormField
        label="Technologies Used"
        value={formData.technologies}
        onChange={(value) => setFormData({ ...formData, technologies: value })}
        placeholder="e.g., React, Node.js, MongoDB, Tailwind CSS (comma-separated)"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Project Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as Project["status"] })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
        >
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="planned">Planned</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(value) => setFormData({ ...formData, startDate: value })}
        />

        <FormField
          label="End Date"
          type="date"
          value={formData.endDate}
          onChange={(value) => setFormData({ ...formData, endDate: value })}
          placeholder="Leave empty if ongoing"
        />
      </div>

      <FormField
        label="Project URL"
        type="url"
        value={formData.url}
        onChange={(value) => setFormData({ ...formData, url: value })}
        placeholder="https://your-project.com"
        error={errors.url}
      />

      <FormField
        label="GitHub URL"
        type="url"
        value={formData.githubUrl}
        onChange={(value) => setFormData({ ...formData, githubUrl: value })}
        placeholder="https://github.com/username/project"
        error={errors.githubUrl}
      />

      <FormField
        label="Image URL"
        type="url"
        value={formData.image}
        onChange={(value) => setFormData({ ...formData, image: value })}
        placeholder="https://example.com/project-image.jpg"
      />

      <div className="flex space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : project ? "Update" : "Add"} Project
        </button>
      </div>
    </form>
  )
}
