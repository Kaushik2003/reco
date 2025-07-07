export interface Profile {
  id: string
  name: string
  avatar: string
  status: string
  bio: string
  email?: string
  phone?: string
  location?: string
}

export interface Social {
  id: string
  platform: string
  handle: string
  icon: string
  url: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  period: string
  startDate: string
  endDate: string
  description?: string
  gpa?: string
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  startDate: string
  endDate: string
  description?: string
  location?: string
  isCurrentRole?: boolean
}

export interface Certification {
  id: string
  title: string
  issuer: string
  status: string
  earned: boolean
  dateEarned?: string
  expiryDate?: string
  credentialId?: string
  url?: string
}

export interface Project {
  id: string
  title: string
  image: string
  description?: string
  technologies?: string[]
  url?: string
  githubUrl?: string
  startDate?: string
  endDate?: string
  status?: "completed" | "in-progress" | "planned"
}

export interface MockData {
  profile: Profile
  skills: string[]
  education: Education[]
  technologies: string[]
  experience: Experience[]
  certifications: Certification[]
  projects: Project[]
  socials: Social[]
}

export interface DraggableSection {
  id: string
  type: string
  title: string
  order: number
}

export interface FormState {
  isLoading: boolean
  error: string | null
  success: boolean
}
