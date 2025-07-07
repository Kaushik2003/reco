"use client"

import { create } from "zustand"
import type { MockData, Education, Experience, Certification, Project, Social } from "@/lib/types"
import { mockData } from "@/lib/mock-data"

interface PortfolioDataStore extends MockData {
  // Education CRUD
  addEducation: (education: Omit<Education, "id">) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  deleteEducation: (id: string) => void

  // Experience CRUD
  addExperience: (experience: Omit<Experience, "id">) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  deleteExperience: (id: string) => void

  // Certification CRUD
  addCertification: (certification: Omit<Certification, "id">) => void
  updateCertification: (id: string, certification: Partial<Certification>) => void
  deleteCertification: (id: string) => void

  // Project CRUD
  addProject: (project: Omit<Project, "id">) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void

  // Social CRUD
  addSocial: (social: Omit<Social, "id">) => void
  updateSocial: (id: string, social: Partial<Social>) => void
  deleteSocial: (id: string) => void

  // Skills CRUD
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void

  // Technologies CRUD
  addTechnology: (technology: string) => void
  removeTechnology: (technology: string) => void

  // Profile Update
  updateProfile: (profile: Partial<typeof mockData.profile>) => void
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export const usePortfolioData = create<PortfolioDataStore>((set) => ({
  ...mockData,

  // Education CRUD
  addEducation: (education) =>
    set((state) => ({
      education: [...state.education, { ...education, id: generateId() }],
    })),

  updateEducation: (id, updatedEducation) =>
    set((state) => ({
      education: state.education.map((edu) => (edu.id === id ? { ...edu, ...updatedEducation } : edu)),
    })),

  deleteEducation: (id) =>
    set((state) => ({
      education: state.education.filter((edu) => edu.id !== id),
    })),

  // Experience CRUD
  addExperience: (experience) =>
    set((state) => ({
      experience: [...state.experience, { ...experience, id: generateId() }],
    })),

  updateExperience: (id, updatedExperience) =>
    set((state) => ({
      experience: state.experience.map((exp) => (exp.id === id ? { ...exp, ...updatedExperience } : exp)),
    })),

  deleteExperience: (id) =>
    set((state) => ({
      experience: state.experience.filter((exp) => exp.id !== id),
    })),

  // Certification CRUD
  addCertification: (certification) =>
    set((state) => ({
      certifications: [...state.certifications, { ...certification, id: generateId() }],
    })),

  updateCertification: (id, updatedCertification) =>
    set((state) => ({
      certifications: state.certifications.map((cert) =>
        cert.id === id ? { ...cert, ...updatedCertification } : cert,
      ),
    })),

  deleteCertification: (id) =>
    set((state) => ({
      certifications: state.certifications.filter((cert) => cert.id !== id),
    })),

  // Project CRUD
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, { ...project, id: generateId() }],
    })),

  updateProject: (id, updatedProject) =>
    set((state) => ({
      projects: state.projects.map((proj) => (proj.id === id ? { ...proj, ...updatedProject } : proj)),
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((proj) => proj.id !== id),
    })),

  // Social CRUD
  addSocial: (social) =>
    set((state) => ({
      socials: [...state.socials, { ...social, id: generateId() }],
    })),

  updateSocial: (id, updatedSocial) =>
    set((state) => ({
      socials: state.socials.map((social) => (social.id === id ? { ...social, ...updatedSocial } : social)),
    })),

  deleteSocial: (id) =>
    set((state) => ({
      socials: state.socials.filter((social) => social.id !== id),
    })),

  // Skills CRUD
  addSkill: (skill) =>
    set((state) => ({
      skills: [...state.skills, skill],
    })),

  removeSkill: (skill) =>
    set((state) => ({
      skills: state.skills.filter((s) => s !== skill),
    })),

  // Technologies CRUD
  addTechnology: (technology) =>
    set((state) => ({
      technologies: [...state.technologies, technology],
    })),

  removeTechnology: (technology) =>
    set((state) => ({
      technologies: state.technologies.filter((t) => t !== technology),
    })),

  // Profile Update
  updateProfile: (updatedProfile) =>
    set((state) => ({
      profile: { ...state.profile, ...updatedProfile },
    })),
}))
