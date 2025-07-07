"use client"

import type React from "react"
import { useState } from "react"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { DraggableSection } from "@/components/draggable-section"
import { EducationCard } from "@/components/education-card"
import { TechnologiesCard } from "@/components/technologies-card"
import { ExperienceCard } from "@/components/experience-card"
import { CertificationsCard } from "@/components/certifications-card"
import { ProjectsCard } from "@/components/projects-card"
import { TopBar } from "@/components/top-bar"
import { mockData } from "@/lib/mock-data"
import { usePortfolioOrder } from "@/hooks/use-portfolio-order"

export default function DashboardPage() {
  const { sections, reorderSections } = usePortfolioOrder()
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      reorderSections(draggedIndex, dropIndex)
    }
    setDraggedIndex(null)
  }

  const renderSection = (sectionType: string) => {
    switch (sectionType) {
      case "education":
        return <EducationCard education={mockData.education} />
      case "technologies":
        return <TechnologiesCard />
      case "experience":
        return <ExperienceCard experience={mockData.experience} />
      case "certifications":
        return <CertificationsCard />
      case "projects":
        return <ProjectsCard projects={mockData.projects} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar isAuthenticated={true} />

      <div className="main-layout" style={{ paddingTop: "80px" }}>
        {/* Fixed Sidebar */}
        <ProfileSidebar />

        {/* Main Content Area - Single Scroll */}
        <div className="content-layout">
          <div className="content-container section-spacing">
            {sections
              .sort((a, b) => a.order - b.order)
              .map((section, index) => (
                <DraggableSection
                  key={section.id}
                  id={section.id}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  {renderSection(section.type)}
                </DraggableSection>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
