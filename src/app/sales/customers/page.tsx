'use client';

import { useState } from 'react';
import CustomerForm from '@/components/CustomerForm';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

// Mock customer data
const customers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    address: '123 Main St, City, State 12345',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1-555-0124',
    address: '456 Oak Ave, City, State 12345',
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@email.com',
    phone: '+1-555-0125',
    address: '789 Pine Rd, City, State 12345',
    createdAt: '2024-02-01'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '+1-555-0126',
    address: '321 Elm St, City, State 12345',
    createdAt: '2024-02-10'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@email.com',
    phone: '+1-555-0127',
    address: '654 Maple Dr, City, State 12345',
    createdAt: '2024-02-15'
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    phone: '+1-555-0128',
    address: '987 Cedar Ln, City, State 12345',
    createdAt: '2024-03-01'
  },
  {
    id: '7',
    name: 'Robert Taylor',
    email: 'robert.t@email.com',
    phone: '+1-555-0129',
    address: '147 Birch Way, City, State 12345',
    createdAt: '2024-03-05'
  },
  {
    id: '8',
    name: 'Jennifer Martinez',
    email: 'jennifer.m@email.com',
    phone: '+1-555-0130',
    address: '258 Spruce Ct, City, State 12345',
    createdAt: '2024-03-10'
  },
];

export default function CustomersPage() {
  const [customersList, setCustomersList] = useState<Customer[]>(customers);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const handleAddCustomer = (customerData: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: (customersList.length + 1).toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCustomersList([...customersList, newCustomer]);
  };

  const handleEditCustomer = (customerData: Omit<Customer, 'id' | 'createdAt'>) => {
    if (editingCustomer) {
      const updatedCustomer: Customer = {
        ...customerData,
        id: editingCustomer.id,
        createdAt: editingCustomer.createdAt
      };
      setCustomersList(customersList.map(customer =>
        customer.id === editingCustomer.id ? updatedCustomer : customer
      ));
      setEditingCustomer(null);
    }
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomersList(customersList.filter(customer => customer.id !== customerId));
    }
  };

  const handleEditClick = (customer: Customer) => {
    setEditingCustomer(customer);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile App Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-black mb-1">Customers</h1>
            <p className="text-black/50 text-sm sm:text-base">Manage customer information</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 sm:px-6">

        {/* Main Content - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Customers Table - 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-black/10">
              {/* Table Header */}
              <div className="p-6 border-b border-black/10">
                <h2 className="text-lg font-semibold text-black">Customer List</h2>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Phone</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Address</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Created</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-black/70 w-20">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {customersList.map((customer) => (
                      <tr key={customer.id} className="hover:bg-black/5">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-black">{customer.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-black/70">{customer.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-black/70">{customer.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-black/70 max-w-xs truncate" title={customer.address}>
                            {customer.address}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-black/70">{customer.createdAt}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditClick(customer)}
                              className="text-black/50 hover:text-black transition-colors"
                              title="Edit customer"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteCustomer(customer.id)}
                              className="text-black/50 hover:text-red-600 transition-colors"
                              title="Delete customer"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Customer Form - 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-black/10">
              {/* Form Header */}
              <div className="p-6 border-b border-black/10">
                <h2 className="text-lg font-semibold text-black">
                  {editingCustomer ? 'Edit Customer' : 'Add Customer'}
                </h2>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <CustomerForm
                  onSubmit={editingCustomer ? handleEditCustomer : handleAddCustomer}
                  onCancel={() => setEditingCustomer(null)}
                  initialData={editingCustomer}
                  isEditing={!!editingCustomer}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
