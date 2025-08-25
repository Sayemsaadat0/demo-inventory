'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'

export function Navbar() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-300 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <Link href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-black">
              Inventory System
            </span>
          </Link>
        </div>

        <div className="flex items-center lg:order-2">
          {/* Notifications */}
          <button
            type="button"
            className="p-2 text-black hover:bg-black hover:text-white"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          >
            <span className="sr-only">View notifications</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
            </svg>
          </button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex mx-3 text-sm bg-black text-white focus:ring-4 focus:ring-black"
              >
                <span className="sr-only">Open user menu</span>
                <Image 
                  className="w-8 h-8 rounded-full" 
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
                  alt="user photo"
                  width={32}
                  height={32}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-black">john@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/preferences" className="w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild variant="destructive">
                <Link href="/auth/login" className="w-full">
                  Sign out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
