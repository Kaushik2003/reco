"use client"

import { useState } from "react"
import Image from "next/image"
import { Mail, Phone, Edit2 } from "lucide-react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { usePortfolioData } from "@/hooks/use-portfolio-data"
import { Modal } from "@/components/ui/modal"
import { ProfileForm } from "@/components/forms/profile-form"
import { EditableSkills } from "@/components/editable-skills"
import { EditableSocials } from "@/components/editable-socials"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function ProfileSidebar() {
  const { isEditMode } = useEditMode()
  const { profile, updateProfile } = usePortfolioData()
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  const handleProfileSave = (profileData: Partial<typeof profile>) => {
    updateProfile(profileData)
    setIsProfileModalOpen(false)
  }

  return (
    <>
      <div className="sidebar-layout">
        <div className="sidebar-content flex flex-col gap-6">
          <div className="sidebar-scrollable hide-scrollbar flex flex-col gap-6">
            {/* Profile Section */}
            <Card className="card-base card-hover transition-transform hover:scale-[1.01]">
              <CardHeader className="items-start pb-2">
                {/* Edit Button */}
                {isEditMode && (
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="absolute top-4 right-4 p-2 bg-white hover:bg-gray-50 rounded-lg shadow-sm border opacity-80 hover:opacity-100 transition-opacity z-10"
                    aria-label="Edit profile"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                )}
                {/* Profile Photo */}
                <div className="flex justify-start mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 p-1">
                    <Image
                      src={profile.avatar || "/images/profile-photo.png"}
                      alt={profile.name}
                      width={76}
                      height={76}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                {/* Status */}
                <div className="flex items-center justify-start mb-2">
                  <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-700">{profile.status}</span>
                  </div>
                </div>
                {/* Name */}
                <CardTitle className="text-left text-slate-900 mb-2">{profile.name}</CardTitle>
                {/* Bio */}
                <p className="text-sm text-slate-600 text-left leading-relaxed px-2 mb-0">{profile.bio}</p>
              </CardHeader>
              <CardContent className="pt-2 pb-4">
                <EditableSkills />
              </CardContent>
            </Card>

            {/* Get In Touch Section */}
            <Card className="card-base card-hover transition-transform hover:scale-[1.01]">
              <CardHeader className="items-center pb-2">
                <CardTitle className="text-lg font-semibold text-slate-900 mb-1 text-center">Get In Touch</CardTitle>
                <p className="text-sm text-slate-600 mb-4 text-center leading-relaxed">
                  Whether you have a project in mind, an opportunity, or just want to say hello — I'd love to hear from you.
                </p>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="w-full bg-slate-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2 focus-visible-ring card-interactive"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Connect via Email</span>
                  </a>
                )}
                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="w-full border border-slate-300 text-slate-700 py-3 px-4 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2 focus-visible-ring card-interactive"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Connect via Phone</span>
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Social Links Section */}
            <Card className="card-base card-hover transition-transform hover:scale-[1.01]">
              <CardHeader className="items-center pb-2">
                <CardTitle className="text-lg font-semibold text-slate-900 mb-1 text-center">Social Links</CardTitle>
              </CardHeader>
              <CardContent>
                <EditableSocials />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} title="Edit Profile" size="lg">
        <ProfileForm profile={profile} onSave={handleProfileSave} onCancel={() => setIsProfileModalOpen(false)} />
      </Modal>
    </>
  )
}
