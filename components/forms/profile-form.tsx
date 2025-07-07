"use client"

import type React from "react"
import { useState } from "react"
import { FormField } from "@/components/ui/form-field"
import type { Profile } from "@/lib/types"

interface ProfileFormProps {
  profile: Profile
  onSave: (profile: Partial<Profile>) => void
  onCancel: () => void
}

export function ProfileForm({ profile, onSave, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: profile.name || "",
    bio: profile.bio || "",
    status: profile.status || "",
    email: profile.email || "",
    phone: profile.phone || "",
    location: profile.location || "",
    avatar: profile.avatar || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required"
    }
    if (!formData.status.trim()) {
      newErrors.status = "Status is required"
    }
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (formData.avatar && !isValidUrl(formData.avatar)) {
      newErrors.avatar = "Please enter a valid image URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
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
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
      onSave(formData)
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-spacing form-spacing">
      <FormField
        label="Full Name"
        value={formData.name}
        onChange={(value) => setFormData({ ...formData, name: value })}
        placeholder="e.g., John Doe"
        required
        error={errors.name}
      />

      <FormField
        label="Professional Status"
        value={formData.status}
        onChange={(value) => setFormData({ ...formData, status: value })}
        placeholder="e.g., Available for work, Open to opportunities"
        required
        error={errors.status}
      />

      <FormField
        label="Bio"
        type="textarea"
        value={formData.bio}
        onChange={(value) => setFormData({ ...formData, bio: value })}
        placeholder="Write a brief description about yourself and your expertise..."
        rows={4}
        required
        error={errors.bio}
      />

      <FormField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
        placeholder="your.email@example.com"
        error={errors.email}
      />

      <FormField
        label="Phone"
        type="tel"
        value={formData.phone}
        onChange={(value) => setFormData({ ...formData, phone: value })}
        placeholder="+1 (555) 123-4567"
      />

      <FormField
        label="Location"
        value={formData.location}
        onChange={(value) => setFormData({ ...formData, location: value })}
        placeholder="e.g., San Francisco, CA"
      />

      <FormField
        label="Profile Photo URL"
        type="url"
        value={formData.avatar}
        onChange={(value) => setFormData({ ...formData, avatar: value })}
        placeholder="https://example.com/your-photo.jpg"
        error={errors.avatar}
      />

      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 py-3" disabled={isLoading}>
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1 py-3 disabled:opacity-50" disabled={isLoading}>
          {isLoading ? "Saving..." : "Update Profile"}
        </button>
      </div>
    </form>
  )
}
