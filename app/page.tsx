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
import { usePortfolioOrder } from "@/hooks/use-portfolio-order"
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"

export default function PortfolioPage() {
  const { sections, reorderSections } = usePortfolioOrder()

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    if (result.source.index !== result.destination.index) {
      reorderSections(result.source.index, result.destination.index)
    }
  }

  const renderSection = (sectionType: string) => {
    switch (sectionType) {
      case "education":
        return <EducationCard />
      case "technologies":
        return <TechnologiesCard />
      case "experience":
        return <ExperienceCard />
      case "certifications":
        return <CertificationsCard />
      case "projects":
        return <ProjectsCard />
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
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections-droppable">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {sections
                      .sort((a, b) => a.order - b.order)
                      .map((section, index) => (
                        <DraggableSection
                          key={section.id}
                          id={section.id}
                          index={index}
                        >
                          {renderSection(section.type)}
                        </DraggableSection>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  )
}
