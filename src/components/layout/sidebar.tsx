'use client'


import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface SidebarItem {
  name: string
  href: string
  icon: React.ReactNode
  children?: { name: string; href: string }[]
}

const sidebarItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    href: '/',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
      </svg>
    )
  },
  {
    name: 'Inventory',
    href: '/inventory/items',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    children: [
      { name: 'Items', href: '/inventory/items' },
      { name: 'Categories', href: '/inventory/categories' },
      { name: 'Units', href: '/inventory/units' }
    ]
  },
  {
    name: 'Sales',
    href: '/sales',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    children: [
      { name: 'Pos', href: '/sales/sales' },
      { name: 'Orders', href: '/sales/orders' },
      { name: 'Customers', href: '/sales/customers' }
    ]
  },
  {
    name: 'Purchases',
    href: '/purchases',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
      </svg>
    ),
    children: [
      { name: 'Purchase', href: '/purchases' },
      { name: 'Suppliers', href: '/purchases/suppliers' }
    ]
  },
  {
    name: 'Repairs',
    href: '/repairs',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    children: [
      { name: 'Dashboard', href: '/repairs' },
      { name: 'Tickets', href: '/repairs/tickets' },
      { name: 'Technicians', href: '/repairs/technicians' }
    ]
  },

  {
    name: 'Reports',
    href: '/reports',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    children: [
      { name: 'Dashboard', href: '/reports' },
      { name: 'Sales', href: '/reports/sales' },
      { name: 'Inventory', href: '/reports/inventory' },
      { name: 'Repairs', href: '/reports/repairs' },
      { name: 'Purchases', href: '/reports/purchases' }
    ]
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    children: [
      { name: 'Profile', href: '/settings/profile' },
      { name: 'Users', href: '/settings/users' },
      { name: 'Roles', href: '/settings/roles' },
      { name: 'Preferences', href: '/settings/preferences' },
      { name: 'Security', href: '/settings/security' },
      { name: 'Notifications', href: '/settings/notifications' },
      { name: 'Backup', href: '/settings/backup' },
      { name: 'Integrations', href: '/settings/integrations' }
    ]
  },
  {
    name: 'Help & Support',
    href: '/help',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    children: [
      { name: 'Documentation', href: '/help/docs' },
      { name: 'FAQ', href: '/help/faq' },
      { name: 'Contact Support', href: '/help/contact' },
      { name: 'Tutorials', href: '/help/tutorials' }
    ]
  }
]

// Common icon for nested routes
const nestedIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

export function Sidebar({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean; setIsCollapsed: (collapsed: boolean) => void }) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <aside className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } bg-white border-r border-gray-300 flex flex-col`}>
      <div className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-black">Menu</h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-black hover:bg-black hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              {item.children ? (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={item.name} className="border-none">
                    <AccordionTrigger 
                      className={`flex items-center w-full p-2 text-base font-normal text-black transition duration-75 group hover:bg-black hover:text-white ${
                        isActive(item.href) ? 'bg-black text-white' : ''
                      } ${isCollapsed ? 'justify-center' : ''}`}
                    >
                      <span className="flex-shrink-0 w-6 h-6">
                        {item.icon}
                      </span>
                      {!isCollapsed && (
                        <span className="ml-3 w-full">{item.name}</span>
                      )}
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 mt-2">
                      {!isCollapsed && (
                        <ul className="space-y-2">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                className={`flex items-center p-2 pl-11 w-full text-sm font-normal text-black group hover:bg-black hover:text-white ${
                                  isActive(child.href) ? 'bg-black text-white' : ''
                                }`}
                              >
                                <span className="flex-shrink-0 w-4 h-4 mr-3">
                                  {nestedIcon}
                                </span>
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center w-full p-2 text-base font-normal text-black transition duration-75 group hover:bg-black hover:text-white ${
                    isActive(item.href) ? 'bg-black text-white' : ''
                  }`}
                >
                  <span className="flex-shrink-0 w-6 h-6">
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
