'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <p className="mt-2 text-black">Welcome to your inventory management system</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Inventory Module */}
        <div className="bg-white p-6 shadow-sm border border-black hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-black">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="ml-3 text-xl font-semibold text-black">Inventory</h2>
          </div>
          <p className="text-black mb-4">Manage your inventory, items, categories, and suppliers</p>
          <div className="space-y-2">
            <a href="/inventory" className="block text-black hover:underline">Dashboard</a>
            <a href="/inventory/items" className="block text-black hover:underline">Items</a>
            <a href="/inventory/categories" className="block text-black hover:underline">Categories</a>
            <a href="/inventory/suppliers" className="block text-black hover:underline">Suppliers</a>
          </div>
        </div>

        {/* Sales Module */}
        <div className="bg-white p-6 shadow-sm border border-black hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-500">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="ml-3 text-xl font-semibold text-black">Sales</h2>
          </div>
          <p className="text-black mb-4">Handle sales orders and customer management</p>
          <div className="space-y-2">
            <a href="/sales" className="block text-black hover:underline">Dashboard</a>
            <a href="/sales/orders" className="block text-black hover:underline">Orders</a>
            <a href="/sales/customers" className="block text-black hover:underline">Customers</a>
          </div>
        </div>

        {/* Repairs Module */}
        <div className="bg-white p-6 shadow-sm border border-black hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-yellow-500">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="ml-3 text-xl font-semibold text-black">Repairs</h2>
          </div>
          <p className="text-black mb-4">Manage repair tickets and technicians</p>
          <div className="space-y-2">
            <a href="/repairs" className="block text-black hover:underline">Dashboard</a>
            <a href="/repairs/tickets" className="block text-black hover:underline">Tickets</a>
            <a href="/repairs/technicians" className="block text-black hover:underline">Technicians</a>
          </div>
        </div>

        {/* Purchases Module */}
        <div className="bg-white p-6 shadow-sm border border-black hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-red-500">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="ml-3 text-xl font-semibold text-black">Purchases</h2>
          </div>
          <p className="text-black mb-4">Handle purchase orders and vendor management</p>
          <div className="space-y-2">
            <a href="/purchases" className="block text-black hover:underline">Dashboard</a>
            <a href="/purchases/orders" className="block text-black hover:underline">Orders</a>
            <a href="/purchases/vendors" className="block text-black hover:underline">Vendors</a>
          </div>
        </div>

        {/* Reports Module */}
        <div className="bg-white p-6 shadow-sm border border-black hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-black">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="ml-3 text-xl font-semibold text-black">Reports</h2>
          </div>
          <p className="text-black mb-4">View analytics and generate reports</p>
          <div className="space-y-2">
            <a href="/reports" className="block text-black hover:underline">Dashboard</a>
            <a href="/reports/sales" className="block text-black hover:underline">Sales Reports</a>
            <a href="/reports/inventory" className="block text-black hover:underline">Inventory Reports</a>
          </div>
        </div>

        {/* Settings Module */}
        <div className="bg-white p-6 shadow-sm border border-black hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-black">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="ml-3 text-xl font-semibold text-black">Settings</h2>
          </div>
          <p className="text-black mb-4">Manage users, roles, and preferences</p>
          <div className="space-y-2">
            <a href="/settings/profile" className="block text-black hover:underline">Profile</a>
            <a href="/settings/users" className="block text-black hover:underline">Users</a>
            <a href="/settings/roles" className="block text-black hover:underline">Roles</a>
          </div>
        </div>
      </div>
    </div>
  );
}
