"use client"

import { User, Edit3, Sun, Moon, Settings, Bell, Search } from "lucide-react"
import { useEditMode } from "@/hooks/use-edit-mode"
import { useState } from "react"

interface TopBarProps {
  isAuthenticated?: boolean
}

export function TopBar({ isAuthenticated = false }: TopBarProps) {
  const { isEditMode, toggleEditMode } = useEditMode()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  if (!isAuthenticated) return null

  return (
    <div className="top-bar">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo/Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Reco</h2>
              <p className="text-xs text-gray-500 -mt-1">Portfolio Platform</p>
            </div>
          </div>
        </div>

        {/* Center Section - Search (Optional) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search portfolio sections..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Edit Mode Toggle */}
          <button
            onClick={toggleEditMode}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isEditMode
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-sm border border-blue-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Edit3 className={`w-4 h-4 ${isEditMode ? "animate-pulse" : ""}`} />
            <span className="hidden sm:inline">{isEditMode ? "Exit Edit" : "Edit Mode"}</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">2</span>
              </span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="p-2">
                  <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <p className="text-sm font-medium text-gray-900">Portfolio Updated</p>
                    <p className="text-xs text-gray-500">Your changes have been saved successfully</p>
                  </div>
                  <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <p className="text-sm font-medium text-gray-900">New Feature Available</p>
                    <p className="text-xs text-gray-500">Check out the new project templates</p>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User Account */}
          <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">Aaditya Kumar</p>
              <p className="text-xs text-gray-500">aaditya@example.com</p>
            </div>
            <button className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
