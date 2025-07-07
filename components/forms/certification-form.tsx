"use client"

import type React from "react"
import { useState } from "react"
import { FormField } from "@/components/ui/form-field"
import type { Certification } from "@/lib/types"

interface CertificationFormProps {
  certification?: Certification
  onSave: (certification: Omit<Certification, "id"> | Certification) => void
  onCancel: () => void
}

export function CertificationForm({ certification, onSave, onCancel }: CertificationFormProps) {
  const [formData, setFormData] = useState({
    title: certification?.title || "",
    issuer: certification?.issuer || "",
    dateEarned: certification?.dateEarned || "",
    expiryDate: certification?.expiryDate || "",
    credentialId: certification?.credentialId || "",
    url: certification?.url || "",
    earned: certification?.earned ?? true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Certification title is required"
    }
    if (!formData.issuer.trim()) {
      newErrors.issuer = "Issuer is required"
    }
    if (formData.earned && !formData.dateEarned) {
      newErrors.dateEarned = "Date earned is required for earned certifications"
    }
    if (formData.url && !isValidUrl(formData.url)) {
      newErrors.url = "Please enter a valid URL"
    }
    if (formData.expiryDate && formData.dateEarned && formData.expiryDate < formData.dateEarned) {
      newErrors.expiryDate = "Expiry date must be after the date earned"
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
      const status = formData.earned ? "Certificate earned" : "Certificate not earned"

      const certificationData = {
        ...formData,
        status,
        ...(certification?.id && { id: certification.id }),
      }

      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
      onSave(certificationData as Certification)
    } catch (error) {
      console.error("Error saving certification:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-spacing form-spacing">
      <FormField
        label="Certification Title"
        value={formData.title}
        onChange={(value) => setFormData({ ...formData, title: value })}
        placeholder="e.g., Google UX Design Professional Certificate"
        required
        error={errors.title}
      />

      <FormField
        label="Issuing Organization"
        value={formData.issuer}
        onChange={(value) => setFormData({ ...formData, issuer: value })}
        placeholder="e.g., Google, Microsoft, AWS"
        required
        error={errors.issuer}
      />

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="earned"
          checked={formData.earned}
          onChange={(e) => setFormData({ ...formData, earned: e.target.checked })}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="earned" className="text-sm font-medium text-gray-700">
          I have earned this certification
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Date Earned"
          type="date"
          value={formData.dateEarned}
          onChange={(value) => setFormData({ ...formData, dateEarned: value })}
          required={formData.earned}
          error={errors.dateEarned}
          disabled={!formData.earned}
        />

        <FormField
          label="Expiry Date"
          type="date"
          value={formData.expiryDate}
          onChange={(value) => setFormData({ ...formData, expiryDate: value })}
          placeholder="Leave empty if no expiry"
          error={errors.expiryDate}
        />
      </div>

      <FormField
        label="Credential ID"
        value={formData.credentialId}
        onChange={(value) => setFormData({ ...formData, credentialId: value })}
        placeholder="e.g., ABC123XYZ789"
      />

      <FormField
        label="Certificate URL"
        type="url"
        value={formData.url}
        onChange={(value) => setFormData({ ...formData, url: value })}
        placeholder="https://coursera.org/verify/..."
        error={errors.url}
      />

      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 py-3" disabled={isLoading}>
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1 py-3 disabled:opacity-50" disabled={isLoading}>
          {isLoading ? "Saving..." : certification ? "Update" : "Add"} Certification
        </button>
      </div>
    </form>
  )
}
