"use client"

import type React from "react"
import { useState } from "react"
import { FormField } from "@/components/ui/form-field"
import type { Education } from "@/lib/types"

interface EducationFormProps {
  education?: Education
  onSave: (education: Omit<Education, "id"> | Education) => void
  onCancel: () => void
}

export function EducationForm({ education, onSave, onCancel }: EducationFormProps) {
  const [formData, setFormData] = useState({
    degree: education?.degree || "",
    institution: education?.institution || "",
    startDate: education?.startDate || "",
    endDate: education?.endDate || "",
    description: education?.description || "",
    gpa: education?.gpa || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.degree.trim()) {
      newErrors.degree = "Degree is required"
    }
    if (!formData.institution.trim()) {
      newErrors.institution = "Institution is required"
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required"
    }
    if (formData.endDate && formData.startDate && formData.endDate < formData.startDate) {
      newErrors.endDate = "End date must be after start date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const period = formData.endDate
        ? `${new Date(formData.startDate).getFullYear()} - ${new Date(formData.endDate).getFullYear()}`
        : `${new Date(formData.startDate).getFullYear()} - Present`

      const educationData = {
        ...formData,
        period,
        ...(education?.id && { id: education.id }),
      }

      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
      onSave(educationData as Education)
    } catch (error) {
      console.error("Error saving education:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-spacing form-spacing">
      <FormField
        label="Degree"
        value={formData.degree}
        onChange={(value) => setFormData({ ...formData, degree: value })}
        placeholder="e.g., Bachelor of Technology in Computer Science"
        required
        error={errors.degree}
      />

      <FormField
        label="Institution"
        value={formData.institution}
        onChange={(value) => setFormData({ ...formData, institution: value })}
        placeholder="e.g., University of Technology"
        required
        error={errors.institution}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(value) => setFormData({ ...formData, startDate: value })}
          required
          error={errors.startDate}
        />

        <FormField
          label="End Date"
          type="date"
          value={formData.endDate}
          onChange={(value) => setFormData({ ...formData, endDate: value })}
          placeholder="Leave empty if ongoing"
          error={errors.endDate}
        />
      </div>

      <FormField
        label="GPA/Grade"
        value={formData.gpa}
        onChange={(value) => setFormData({ ...formData, gpa: value })}
        placeholder="e.g., 3.8/4.0 or 85%"
      />

      <FormField
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={(value) => setFormData({ ...formData, description: value })}
        placeholder="Brief description of your studies, achievements, or relevant coursework..."
        rows={4}
      />

      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 py-3" disabled={isLoading}>
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1 py-3 disabled:opacity-50" disabled={isLoading}>
          {isLoading ? "Saving..." : education ? "Update" : "Add"} Education
        </button>
      </div>
    </form>
  )
}
