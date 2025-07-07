"use client"

import type React from "react"
import { useState } from "react"
import { FormField } from "@/components/ui/form-field"
import type { Social } from "@/lib/types"

interface SocialFormProps {
  social?: Social
  onSave: (social: Omit<Social, "id"> | Social) => void
  onCancel: () => void
}

const platformOptions = [
  { value: "instagram", label: "Instagram", icon: "instagram" },
  { value: "linkedin", label: "LinkedIn", icon: "linkedin" },
  { value: "youtube", label: "YouTube", icon: "youtube" },
  { value: "twitter", label: "Twitter", icon: "twitter" },
  { value: "behance", label: "Behance", icon: "behance" },
  { value: "dribbble", label: "Dribbble", icon: "circle" },
  { value: "github", label: "GitHub", icon: "github" },
  { value: "website", label: "Website", icon: "globe" },
]

export function SocialForm({ social, onSave, onCancel }: SocialFormProps) {
  const [formData, setFormData] = useState({
    platform: social?.platform || "",
    handle: social?.handle || "",
    url: social?.url || "",
    icon: social?.icon || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.platform.trim()) {
      newErrors.platform = "Platform is required"
    }
    if (!formData.handle.trim()) {
      newErrors.handle = "Handle/Username is required"
    }
    if (!formData.url.trim()) {
      newErrors.url = "URL is required"
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = "Please enter a valid URL"
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

  const handlePlatformChange = (platform: string) => {
    const selectedPlatform = platformOptions.find((p) => p.value === platform)
    if (selectedPlatform) {
      setFormData({
        ...formData,
        platform: selectedPlatform.label,
        icon: selectedPlatform.icon,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const socialData = {
        ...formData,
        ...(social?.id && { id: social.id }),
      }

      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
      onSave(socialData as Social)
    } catch (error) {
      console.error("Error saving social link:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-spacing form-spacing">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Platform <span className="text-red-500">*</span>
        </label>
        <select
          value={platformOptions.find((p) => p.label === formData.platform)?.value || ""}
          onChange={(e) => handlePlatformChange(e.target.value)}
          className="form-input"
          required
        >
          <option value="">Select a platform</option>
          {platformOptions.map((platform) => (
            <option key={platform.value} value={platform.value}>
              {platform.label}
            </option>
          ))}
        </select>
        {errors.platform && (
          <p className="text-sm text-red-600" role="alert">
            {errors.platform}
          </p>
        )}
      </div>

      <FormField
        label="Handle/Username"
        value={formData.handle}
        onChange={(value) => setFormData({ ...formData, handle: value })}
        placeholder="@yourusername"
        required
        error={errors.handle}
      />

      <FormField
        label="Profile URL"
        type="url"
        value={formData.url}
        onChange={(value) => setFormData({ ...formData, url: value })}
        placeholder="https://platform.com/yourusername"
        required
        error={errors.url}
      />

      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 py-3" disabled={isLoading}>
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1 py-3 disabled:opacity-50" disabled={isLoading}>
          {isLoading ? "Saving..." : social ? "Update" : "Add"} Social Link
        </button>
      </div>
    </form>
  )
}
