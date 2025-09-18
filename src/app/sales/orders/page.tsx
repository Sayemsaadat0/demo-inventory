'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SalesOrder {
  id: string;
  salesId: string;
  customerName: string;
  products: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    unit: string;
  }>;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

// Mock sales orders data
const salesOrders: SalesOrder[] = [
  {
    id: '1',
    salesId: 'SALE-001',
    customerName: 'John Smith',
    products: [
      { id: 1, name: 'Laptop', price: 999.99, quantity: 1, unit: 'pcs' },
      { id: 2, name: 'Mouse', price: 25.99, quantity: 2, unit: 'pcs' }
    ],
    totalAmount: 1051.97,
    status: 'completed',
    createdAt: '2024-01-15 10:30:00'
  },
  {
    id: '2',
    salesId: 'SALE-002',
    customerName: 'Sarah Johnson',
    products: [
      { id: 3, name: 'Keyboard', price: 89.99, quantity: 1, unit: 'pcs' },
      { id: 4, name: 'Monitor', price: 299.99, quantity: 1, unit: 'pcs' },
      { id: 5, name: 'Headphones', price: 79.99, quantity: 1, unit: 'pcs' }
    ],
    totalAmount: 469.97,
    status: 'completed',
    createdAt: '2024-01-16 14:20:00'
  },
  {
    id: '3',
    salesId: 'SALE-003',
    customerName: 'Michael Brown',
    products: [
      { id: 6, name: 'Tablet', price: 399.99, quantity: 1, unit: 'pcs' }
    ],
    totalAmount: 399.99,
    status: 'pending',
    createdAt: '2024-01-17 09:15:00'
  },
  {
    id: '4',
    salesId: 'SALE-004',
    customerName: 'Emily Davis',
    products: [
      { id: 7, name: 'Printer', price: 199.99, quantity: 1, unit: 'pcs' },
      { id: 8, name: 'Paper', price: 15.99, quantity: 5, unit: 'packs' }
    ],
    totalAmount: 279.94,
    status: 'completed',
    createdAt: '2024-01-18 16:45:00'
  },
  {
    id: '5',
    salesId: 'SALE-005',
    customerName: 'David Wilson',
    products: [
      { id: 9, name: 'Webcam', price: 59.99, quantity: 1, unit: 'pcs' },
      { id: 10, name: 'Microphone', price: 45.99, quantity: 1, unit: 'pcs' },
      { id: 11, name: 'USB Cable', price: 12.99, quantity: 3, unit: 'pcs' }
    ],
    totalAmount: 133.96,
    status: 'cancelled',
    createdAt: '2024-01-19 11:30:00'
  },
  {
    id: '6',
    salesId: 'SALE-006',
    customerName: 'Lisa Anderson',
    products: [
      { id: 12, name: 'Smartphone', price: 699.99, quantity: 1, unit: 'pcs' }
    ],
    totalAmount: 699.99,
    status: 'pending',
    createdAt: '2024-01-20 13:45:00'
  },
  {
    id: '7',
    salesId: 'SALE-007',
    customerName: 'Robert Taylor',
    products: [
      { id: 13, name: 'Gaming Console', price: 499.99, quantity: 1, unit: 'pcs' },
      { id: 14, name: 'Controller', price: 59.99, quantity: 2, unit: 'pcs' }
    ],
    totalAmount: 619.97,
    status: 'completed',
    createdAt: '2024-01-21 15:30:00'
  },
  {
    id: '8',
    salesId: 'SALE-008',
    customerName: 'Jennifer Martinez',
    products: [
      { id: 15, name: 'Bluetooth Speaker', price: 89.99, quantity: 1, unit: 'pcs' }
    ],
    totalAmount: 89.99,
    status: 'cancelled',
    createdAt: '2024-01-22 10:20:00'
  },
  {
    id: '9',
    salesId: 'SALE-009',
    customerName: 'Alex Thompson',
    products: [
      { id: 16, name: 'Wireless Earbuds', price: 129.99, quantity: 1, unit: 'pcs' },
      { id: 17, name: 'Charging Case', price: 29.99, quantity: 1, unit: 'pcs' }
    ],
    totalAmount: 159.98,
    status: 'pending',
    createdAt: '2024-01-23 16:15:00'
  },
  {
    id: '10',
    salesId: 'SALE-010',
    customerName: 'Maria Garcia',
    products: [
      { id: 18, name: 'Digital Camera', price: 349.99, quantity: 1, unit: 'pcs' },
      { id: 19, name: 'Memory Card', price: 24.99, quantity: 2, unit: 'pcs' }
    ],
    totalAmount: 399.97,
    status: 'completed',
    createdAt: '2024-01-24 12:00:00'
  }
];

export default function SalesOrdersPage() {
  const [ordersList] = useState<SalesOrder[]>(salesOrders);
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);
  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'completed' | 'cancelled' | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleViewProducts = (order: SalesOrder) => {
    setSelectedOrder(order);
    setIsProductsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter orders based on active tab
  const filteredOrders = ordersList.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to first page when tab changes
  const handleTabChange = (tab: 'pending' | 'completed' | 'cancelled' | 'all') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black mb-1">Sales Orders</h1>
          <p className="text-black/50 text-sm">View and manage sales transactions</p>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-black/10">
            <div className="flex items-center justify-between">
              <div className="text-sm text-black/70">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-black/20 hover:bg-black/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm border transition-colors ${
                        currentPage === page
                          ? 'bg-black text-white border-black'
                          : 'border-black/20 hover:bg-black/5'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-black/20 hover:bg-black/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white border border-black/10">
        {/* Table Header */}
        <div className="p-6 border-b border-black/10">
          <h2 className="text-lg font-semibold text-black">Sales Orders List</h2>
        </div>

        {/* Tabs */}
        <div className="px-6 py-4 border-b border-black/10">
          <div className="flex space-x-1">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-black text-white'
                  : 'text-black/70 hover:text-black hover:bg-black/5'
              }`}
            >
              All ({ordersList.length})
            </button>
            <button
              onClick={() => handleTabChange('pending')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'pending'
                  ? 'bg-black text-white'
                  : 'text-black/70 hover:text-black hover:bg-black/5'
              }`}
            >
              Pending ({ordersList.filter(order => order.status === 'pending').length})
            </button>
            <button
              onClick={() => handleTabChange('completed')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-black text-white'
                  : 'text-black/70 hover:text-black hover:bg-black/5'
              }`}
            >
              Completed ({ordersList.filter(order => order.status === 'completed').length})
            </button>
            <button
              onClick={() => handleTabChange('cancelled')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'cancelled'
                  ? 'bg-black text-white'
                  : 'text-black/70 hover:text-black hover:bg-black/5'
              }`}
            >
              Cancelled ({ordersList.filter(order => order.status === 'cancelled').length})
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-black/70">SL</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Sales ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Products</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {currentOrders.map((order, index) => (
                <tr key={order.id} className="hover:bg-black/5">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-black">{startIndex + index + 1}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-black">{order.salesId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-black/70">{order.customerName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-black/70">{order.products.length} items</span>
                      <button
                        onClick={() => handleViewProducts(order)}
                        className="text-black/50 hover:text-black transition-colors"
                        title="View products"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-black">${order.totalAmount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-black/70">{order.createdAt}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Products Modal */}
      <Dialog open={isProductsModalOpen} onOpenChange={setIsProductsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Products - {selectedOrder?.salesId} ({selectedOrder?.customerName})
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {selectedOrder.products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 border border-black/10">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-black">{product.name}</div>
                        <div className="text-xs text-black/50">${product.price.toFixed(2)} per {product.unit}</div>
                      </div>
                      <div className="text-sm font-medium text-black">
                        Qty: {product.quantity}
                      </div>
                      <div className="text-sm font-medium text-black">
                        ${(product.price * product.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-black/10 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-black">Total Amount:</span>
                    <span className="text-lg font-bold text-black">${selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
