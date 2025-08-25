'use client';

import { useState } from 'react';
import {
  inventoryItems,
  inventoryStats,
  searchItems,
  getItemByQRCode,
  type InventoryItem
} from '@/data/dummy.data';
import QRScanner1 from '@/components/QRScanner1';

export default function ItemsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [scannedItem, setScannedItem] = useState<any | null>(null);
  const [scannedValue, setScannedValue] = useState('');
  const itemsPerPage = 10;

  // Auto-search when scanned value changes
  const handleScannedValueChange = (value: string) => {
    setScannedValue(value);
    console.log('Scanned QR Code Value:', value);
    
    if (value) {
      // Find item by QR code
      const item = getItemByQRCode(value);
      if (item) {
        setScannedItem(item);
        setSearchTerm(item.name);
        console.log('✅ Item found by QR code:', item.name);
      } else {
        // If not found by QR code, try searching by the scanned value
        const foundItem = inventoryItems.find(item => 
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.sku.toLowerCase().includes(value.toLowerCase()) ||
          (item.qrCode && item.qrCode.toLowerCase().includes(value.toLowerCase()))
        );
        
        if (foundItem) {
          setScannedItem(foundItem);
          setSearchTerm(foundItem.name);
          console.log('✅ Item found by search:', foundItem.name);
        } else {
          // Set search term to the scanned value for manual search
          setSearchTerm(value);
          setScannedItem(null);
          console.log('❌ No item found matching:', value);
          alert(`No item found matching: "${value}"`);
        }
      }
    }
  };

  // Filter items based on search and filters
  const filteredItems = searchItems(searchTerm, selectedCategory, selectedStatus);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Get unique categories and statuses for filters
  const categories = ['all', ...new Set(inventoryItems.map(item => item.category))];
  const statuses = ['all', ...new Set(inventoryItems.map(item => item.status))];

  // QR Code Scanner functionality
  const handleQRScanSuccess = (qrCode: string) => {
    // Find item by QR code
    const item = getItemByQRCode(qrCode);
    if (item) {
      setScannedItem(item);
      setSearchTerm(item.name);
    } else {
      alert(`QR Code "${qrCode}" not found in inventory`);
    }
  };



  const StatCard = ({ title, value, color, icon }: any) => (
    <div className="bg-white p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'text-green-600 bg-green-100';
      case 'Low Stock': return 'text-yellow-600 bg-yellow-100';
      case 'Out of Stock': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Items</h1>
          <p className="text-gray-600 mt-2">Manage your inventory items and track stock levels</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 border border-blue-700 hover:bg-blue-700 transition-colors font-medium">
          Add New Item
        </button>
      </div>

             {/* QR Scanner Component */}
       <QRScanner1
         open={isQRScannerOpen}
         setOpen={setIsQRScannerOpen}
         value={scannedValue}
         setValue={handleScannedValueChange}
       />

             {/* Scanned Item Result */}
       {scannedItem && (
         <div className="bg-green-50 border border-green-300 p-4">
           <div className="flex items-center justify-between">
             <div>
               <h4 className="text-green-800 font-semibold">Item Found!</h4>
               <p className="text-green-700">{scannedItem.name} - {scannedItem.sku}</p>
               <p className="text-green-600 text-sm">Quantity: {scannedItem.quantity} {scannedItem.unit} | Status: {scannedItem.status}</p>
             </div>
             <button
               onClick={() => {
                 setScannedItem(null);
                 setScannedValue('');
               }}
               className="text-green-600 hover:text-green-800"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
           </div>
         </div>
       )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Items"
          value={inventoryStats.totalItems}
          color="bg-blue-100"
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
        />
        <StatCard
          title="Low Stock"
          value={inventoryStats.lowStock}
          color="bg-yellow-100"
          icon={
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          }
        />
        <StatCard
          title="Out of Stock"
          value={inventoryStats.outOfStock}
          color="bg-red-100"
          icon={
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
        />
        <StatCard
          title="Categories"
          value={inventoryStats.categories}
          color="bg-green-100"
          icon={
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
        <StatCard
          title="Suppliers"
          value={inventoryStats.suppliers}
          color="bg-purple-100"
          icon={
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search items, SKU, or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pr-12 border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">

                <button
                  onClick={() => setIsQRScannerOpen(true)}
                  className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                  title="Scan QR Code"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">SL</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Item Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">SKU</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Barcode</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Supplier</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">ID: {item.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.sku}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                    {item.qrCode ? item.qrCode.replace(/[^A-Za-z0-9]/g, '').substring(0, 12).padEnd(12, '0') : '000000000000'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.category}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.quantity} {item.unit}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.supplier}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 p-1 border border-transparent hover:border-blue-200 hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 p-1 border border-transparent hover:border-red-200 hover:bg-red-50 transition-colors"
                        title="Delete"
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

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredItems.length)} of {filteredItems.length} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium ${currentPage === page
                    ? 'bg-blue-600 text-white border border-blue-700'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
