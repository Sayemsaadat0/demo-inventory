'use client';

import { useState, useRef, useEffect } from 'react';
import { inventoryItems } from '@/data/dummy.data';
import QRScanner1 from '@/components/QRScanner1';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CustomerForm from '@/components/CustomerForm';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface SalesStats {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
}

// Mock sales stats
const salesStats: SalesStats = {
  totalProducts: inventoryItems.length,
  totalValue: inventoryItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
  lowStockItems: inventoryItems.filter(item => item.status === 'Low Stock').length,
};

// Mock customer data
const customers: Customer[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@email.com', phone: '+1-555-0123', address: '123 Main St, City, State 12345' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1-555-0124', address: '456 Oak Ave, City, State 12345' },
  { id: '3', name: 'Michael Brown', email: 'michael.b@email.com', phone: '+1-555-0125', address: '789 Pine Rd, City, State 12345' },
  { id: '4', name: 'Emily Davis', email: 'emily.d@email.com', phone: '+1-555-0126', address: '321 Elm St, City, State 12345' },
  { id: '5', name: 'David Wilson', email: 'david.w@email.com', phone: '+1-555-0127', address: '654 Maple Dr, City, State 12345' },
  { id: '6', name: 'Lisa Anderson', email: 'lisa.a@email.com', phone: '+1-555-0128', address: '987 Cedar Ln, City, State 12345' },
  { id: '7', name: 'Robert Taylor', email: 'robert.t@email.com', phone: '+1-555-0129', address: '147 Birch Way, City, State 12345' },
  { id: '8', name: 'Jennifer Martinez', email: 'jennifer.m@email.com', phone: '+1-555-0130', address: '258 Spruce Ct, City, State 12345' },
];

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customersList, setCustomersList] = useState<Customer[]>(customers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(customers[0]); // Default to first customer
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [qrValue, setQrValue] = useState('');
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false);
  const customerSearchRef = useRef<HTMLDivElement>(null);

  const filteredProducts = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.barcode.includes(searchTerm) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = customersList.filter(customer =>
    customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerSearchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (customerSearchRef.current && !customerSearchRef.current.contains(event.target as Node)) {
        setIsCustomerDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const addToCart = (product: typeof inventoryItems[0]) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add new item
        return [...prevCart, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          unit: product.unit
        }];
      }
    });
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQRScan = (value: string) => {
    console.log('QR Code scanned:', value);
    setQrValue(value);
    setIsQRScannerOpen(false);
    
    // Set the scanned value as search term
    setSearchTerm(value);
    
    // Find the product by barcode or QR code
    const foundProduct = inventoryItems.find(item => 
      item.barcode === value || item.qrCode === value
    );
    
    if (foundProduct) {
      console.log('✅ Product found:', foundProduct.name);
      addToCart(foundProduct);
    } else {
      console.log('❌ No product found for barcode/QR:', value);
      alert(`No product found for: ${value}`);
    }
  };

  const handleDemoScan = () => {
    const demoBarcode = '123456789012';
    console.log('Demo scan triggered with barcode:', demoBarcode);
    
    // Set the demo value as search term
    setSearchTerm(demoBarcode);
    
    // Find the product by barcode
    const foundProduct = inventoryItems.find(item => 
      item.barcode === demoBarcode || item.qrCode === demoBarcode
    );
    
    if (foundProduct) {
      console.log('✅ Demo: Product found:', foundProduct.name);
      addToCart(foundProduct);
    } else {
      console.log('❌ Demo: No product found for barcode:', demoBarcode);
      alert(`Demo: No product found for: ${demoBarcode}`);
    }
  };

  const handleAddCustomer = (customerData: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: (customersList.length + 1).toString()
    };
    
    setCustomersList([...customersList, newCustomer]);
    setSelectedCustomer(newCustomer);
    setIsAddCustomerDialogOpen(false);
    
    console.log('New customer added:', newCustomer);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert('Please add items to cart before submitting');
      return;
    }

    if (!selectedCustomer) {
      alert('Please select a customer');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const saleData = {
        customer: selectedCustomer,
        items: cart,
        totalAmount: getTotalAmount(),
        timestamp: new Date().toISOString()
      };
      
      console.log('Sale submitted:', saleData);
      
      // Show success state
      setIsSuccess(true);
      setCart([]);
      setSelectedCustomer(null);
      setCustomerSearchTerm('');
      
      // Hide success message after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting sale:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black mb-1">Point of Sale</h1>
          <p className="text-black/50 text-sm">Create sales transactions</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-black/10 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-black/5 rounded-lg">
              <svg className="w-6 h-6 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-black/50">Total Products</p>
              <p className="text-2xl font-bold text-black">{salesStats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-black/10 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-black/5 rounded-lg">
              <svg className="w-6 h-6 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-black/50">Total Value</p>
              <p className="text-2xl font-bold text-black">${salesStats.totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-black/10 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-black/5 rounded-lg">
              <svg className="w-6 h-6 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-black/50">Low Stock Items</p>
              <p className="text-2xl font-bold text-black">{salesStats.lowStockItems}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Section - 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-black/10">
            {/* Products Header */}
            <div className="p-6 border-b border-black/10">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-black">Products</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products, barcode, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 px-4 py-2 border border-black/20 text-sm focus:outline-none focus:border-black/40"
                  />
                  <svg className="absolute right-3 top-2.5 w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Barcode</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Stock</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-black/70 w-20">Action</th>
                  </tr>
                </thead>
                                 <tbody className="divide-y divide-black/10">
                   {filteredProducts.map((product) => (
                     <tr 
                       key={product.id} 
                       className="hover:bg-black/5 cursor-pointer transition-colors"
                       onClick={() => product.quantity > 0 && addToCart(product)}
                       title={product.quantity > 0 ? "Click to add to cart" : "Out of stock"}
                     >
                       <td className="px-6 py-4">
                         <div>
                           <div className="text-sm font-medium text-black">{product.name}</div>
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="text-sm text-black/70 font-mono">{product.barcode}</div>
                       </td>
                       <td className="px-6 py-4">
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/5 text-black/70">
                           {product.category}
                         </span>
                       </td>
                       <td className="px-6 py-4">
                         <div className="text-sm font-medium text-black">${product.price.toFixed(2)}</div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex items-center">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                             product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                             product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                             'bg-red-100 text-red-800'
                           }`}>
                             {product.quantity} {product.unit}
                           </span>
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="text-black/50">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                           </svg>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
              </table>
            </div>
          </div>
        </div>

                 {/* Sales Form - 1 column */}
         <div className="lg:col-span-1">
           <div className="bg-white border border-black/10 sticky top-20  max-h-[calc(100vh-2rem)] overflow-y-auto">
            {/* Form Header */}
            <div className="p-6 border-b border-black/10">
              <h2 className="text-lg font-semibold text-black">Sales Form</h2>
            </div>

            {/* Success Message */}
            {isSuccess && (
              <div className="p-6 bg-green-50 border border-green-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-sm font-medium text-green-800">Sale completed successfully!</span>
                </div>
              </div>
            )}

            {/* Form Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                                 {/* Customer Information */}
                 <div className="space-y-4">
                   <h3 className="text-sm font-medium text-black">Customer Information</h3>
                   <div className="flex space-x-2">
                     <button
                       type="button"
                       onClick={() => setIsQRScannerOpen(true)}
                       className="flex-1 px-3 py-2 border border-black/20 text-sm hover:bg-black/5 transition-colors flex items-center justify-center space-x-2"
                     >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                       </svg>
                       <span>Scan QR</span>
                     </button>
                     <button
                       type="button"
                       onClick={handleDemoScan}
                       className="px-3 py-2 border border-black/20 text-sm hover:bg-black/5 transition-colors flex items-center justify-center space-x-2"
                       title="Demo scan with barcode: 123456789012"
                     >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                       </svg>
                       <span>Demo</span>
                     </button>
                   </div>
                   
                   {/* Customer Search and Select */}
                   <div className="relative" ref={customerSearchRef}>
                     <label className="block text-xs font-medium text-black/70 mb-1">Select Customer *</label>
                     <div className="flex space-x-2">
                       <div className="flex-1 relative">
                         <input
                           type="text"
                           value={selectedCustomer ? selectedCustomer.name : customerSearchTerm}
                           onChange={(e) => {
                             setCustomerSearchTerm(e.target.value);
                             setSelectedCustomer(null);
                             setIsCustomerDropdownOpen(true);
                           }}
                           onFocus={() => setIsCustomerDropdownOpen(true)}
                           className="w-full px-3 py-2 border border-black/20 text-sm focus:outline-none focus:border-black/40"
                           placeholder="Search customers..."
                         />
                         {selectedCustomer && (
                           <button
                             type="button"
                             onClick={() => {
                               setSelectedCustomer(null);
                               setCustomerSearchTerm('');
                             }}
                             className="absolute right-2 top-2 text-black/40 hover:text-black/60"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                             </svg>
                           </button>
                         )}
                       </div>
                       <button
                         type="button"
                         onClick={() => setIsAddCustomerDialogOpen(true)}
                         className="px-3 py-2 border border-black/20 text-sm hover:bg-black/5 transition-colors flex items-center justify-center"
                         title="Add new customer"
                       >
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                         </svg>
                       </button>
                     </div>
                     
                                           {/* Customer Dropdown */}
                      {isCustomerDropdownOpen && customerSearchTerm && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-black/20 shadow-lg max-h-48 overflow-y-auto">
                         {filteredCustomers.length > 0 ? (
                           filteredCustomers.map((customer) => (
                             <button
                               key={customer.id}
                               type="button"
                               onClick={() => {
                                 setSelectedCustomer(customer);
                                 setCustomerSearchTerm('');
                                 setIsCustomerDropdownOpen(false);
                               }}
                               className="w-full px-3 py-2 text-left hover:bg-black/5 text-sm"
                             >
                               <div className="font-medium text-black">{customer.name}</div>
                               <div className="text-xs text-black/50">{customer.email}</div>
                             </button>
                           ))
                         ) : (
                           <div className="px-3 py-2 text-sm text-black/50">No customers found</div>
                         )}
                       </div>
                     )}
                   </div>
                 </div>

                {/* Cart Items */}
                <div className="space-y-4 min-h-[150px]">
                  <h3 className="text-sm font-medium text-black">Cart Items</h3>
                  {cart.length === 0 ? (
                    <p className="text-sm text-black/50">No items in cart</p>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border border-black/10">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-black">{item.name}</div>
                            <div className="text-xs text-black/50">${item.price.toFixed(2)} per {item.unit}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center border border-black/20 hover:bg-black/5"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="text-sm font-medium text-black min-w-[2rem] text-center">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center border border-black/20 hover:bg-black/5"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="ml-2 text-black/50 hover:text-red-600 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Total */}
                {cart.length > 0 && (
                  <div className="border-t border-black/10 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-black">Total Amount:</span>
                      <span className="text-lg font-bold text-black">${getTotalAmount().toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || cart.length === 0}
                  className="w-full py-3 bg-black text-white font-medium text-sm hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Create Order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      <QRScanner1
        open={isQRScannerOpen}
        setOpen={setIsQRScannerOpen}
        value={qrValue}
        setValue={handleQRScan}
      />

      {/* Add Customer Dialog */}
      <Dialog open={isAddCustomerDialogOpen} onOpenChange={setIsAddCustomerDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <CustomerForm
              onSubmit={handleAddCustomer}
              onCancel={() => setIsAddCustomerDialogOpen(false)}
              isDialog={true}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}