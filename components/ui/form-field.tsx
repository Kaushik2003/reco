"use client"

import { useState } from "react"

interface FormFieldProps {
  label: string
  type?: "text" | "email" | "tel" | "url" | "date" | "textarea"
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: string
  rows?: number
  disabled?: boolean
}

export function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  rows = 3,
  disabled = false,
}: FormFieldProps) {
  const [focused, setFocused] = useState(false)

  const inputClasses = `form-input ${error ? "form-input-error" : ""} ${
    focused ? "ring-2 ring-blue-500 border-blue-500" : ""
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`

  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, "-")}`

  return (
    <div className="space-y-2">
      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={rows}
          className={inputClasses}
          required={required}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        />
      ) : (
        <input
          id={fieldId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={inputClasses}
          required={required}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        />
      )}
      {error && (
        <p id={`${fieldId}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
