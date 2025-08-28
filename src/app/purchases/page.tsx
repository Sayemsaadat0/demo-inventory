'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PurchasesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchases</h1>
          <p className="text-gray-600 mt-2">Manage your purchase orders and supplier relationships</p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/purchases/new">New Purchase Order</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/purchases/suppliers">Manage Suppliers</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Purchases</h3>
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-900">$24,567</div>
          <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Pending Orders</h3>
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-900">8</div>
          <p className="text-xs text-gray-500 mt-1">Awaiting delivery</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Active Suppliers</h3>
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-900">24</div>
          <p className="text-xs text-gray-500 mt-1">+2 new this month</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">This Month</h3>
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-900">$8,234</div>
          <p className="text-xs text-gray-500 mt-1">+8% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Purchase Orders</h2>
            <p className="text-sm text-gray-600">Latest purchase orders and their status</p>
          </div>
          <div className="space-y-4">
            {[
              { id: 'PO-001', supplier: 'Tech Supplies Co.', amount: '$2,450', status: 'Delivered', date: '2024-01-15' },
              { id: 'PO-002', supplier: 'Office Depot', amount: '$1,200', status: 'In Transit', date: '2024-01-14' },
              { id: 'PO-003', supplier: 'Global Electronics', amount: '$3,100', status: 'Pending', date: '2024-01-13' },
              { id: 'PO-004', supplier: 'Industrial Parts', amount: '$890', status: 'Delivered', date: '2024-01-12' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.supplier}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{order.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Top Suppliers</h2>
            <p className="text-sm text-gray-600">Suppliers with highest purchase volume</p>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Tech Supplies Co.', total: '$12,450', orders: 15 },
              { name: 'Global Electronics', total: '$8,900', orders: 12 },
              { name: 'Office Depot', total: '$6,200', orders: 8 },
              { name: 'Industrial Parts', total: '$4,800', orders: 6 },
            ].map((supplier, index) => (
              <div key={supplier.name} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{supplier.name}</p>
                    <p className="text-sm text-gray-600">{supplier.orders} orders</p>
                  </div>
                </div>
                <p className="font-medium text-gray-900">{supplier.total}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
