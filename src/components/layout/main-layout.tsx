'use client'

import { useState } from 'react'
import { Navbar } from './navbar'
import { Sidebar } from './sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />
      
      {/* Main content */}
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <main className="pt-16 p-4">
          {children}
        </main>
      </div>
      
      {/* Overlay for mobile */}
      {!isSidebarCollapsed && (
        <div 
          className="fixed inset-0 z-30 bg-black/20 bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}
    </div>
  )
}
