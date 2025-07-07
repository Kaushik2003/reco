"use client"

import type React from "react"

import { useState } from "react"
import { FormField } from "@/components/ui/form-field"
import type { Experience } from "@/lib/types"

interface ExperienceFormProps {
  experience?: Experience
  onSave: (experience: Omit<Experience, "id"> | Experience) => void
  onCancel: () => void
}

export function ExperienceForm({ experience, onSave, onCancel }: ExperienceFormProps) {
  const [formData, setFormData] = useState({
    role: experience?.role || "",
    company: experience?.company || "",
    startDate: experience?.startDate || "",
    endDate: experience?.endDate || "",
    description: experience?.description || "",
    location: experience?.location || "",
    isCurrentRole: experience?.isCurrentRole || false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.role.trim()) {
      newErrors.role = "Role is required"
    }
    if (!formData.company.trim()) {
      newErrors.company = "Company is required"
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required"
    }
    if (!formData.isCurrentRole && !formData.endDate) {
      newErrors.endDate = "End date is required for past roles"
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
      const period =
        formData.isCurrentRole || !formData.endDate
          ? `${new Date(formData.startDate).getFullYear()} - Present`
          : `${new Date(formData.startDate).getFullYear()} - ${new Date(formData.endDate).getFullYear()}`

      const experienceData = {
        ...formData,
        period,
        endDate: formData.isCurrentRole ? "" : formData.endDate,
        ...(experience?.id && { id: experience.id }),
      }

      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
      onSave(experienceData as Experience)
    } catch (error) {
      console.error("Error saving experience:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <FormField
        label="Role/Position"
        value={formData.role}
        onChange={(value) => setFormData({ ...formData, role: value })}
        placeholder="e.g., Senior UX Designer"
        required
        error={errors.role}
      />

      <FormField
        label="Company"
        value={formData.company}
        onChange={(value) => setFormData({ ...formData, company: value })}
        placeholder="e.g., Google Inc."
        required
        error={errors.company}
      />

      <FormField
        label="Location"
        value={formData.location}
        onChange={(value) => setFormData({ ...formData, location: value })}
        placeholder="e.g., San Francisco, CA"
      />

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="currentRole"
          checked={formData.isCurrentRole}
          onChange={(e) =>
            setFormData({
              ...formData,
              isCurrentRole: e.target.checked,
              endDate: e.target.checked ? "" : formData.endDate,
            })
          }
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="currentRole" className="text-sm font-medium text-gray-700">
          This is my current role
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
          placeholder={formData.isCurrentRole ? "Current role" : "End date"}
          error={errors.endDate}
        />
      </div>

      <FormField
        label="Description"
        type="textarea"
        value={formData.description}
        onChange={(value) => setFormData({ ...formData, description: value })}
        placeholder="Describe your responsibilities, achievements, and key contributions..."
        rows={4}
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
          {isLoading ? "Saving..." : experience ? "Update" : "Add"} Experience
        </button>
      </div>
    </form>
  )
}
