/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AddItemFormData {
  id: string;
  name: string;
  barcode: string;
  price: string;
  unit: string;
  category: string;
  quantity: string;
}

interface FormErrors {
  [key: string]: {
    name?: string;
    barcode?: string;
    price?: string;
    unit?: string;
    category?: string;
    quantity?: string;
  };
}

export default function AddItemPage() {
  const router = useRouter();
  const [items, setItems] = useState<AddItemFormData[]>([
    {
      id: '1',
      name: '',
      barcode: '',
      price: '',
      unit: '',
      category: '',
      quantity: ''
    }
  ]);
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = ['Electronics', 'Clothing', 'Tools', 'Furniture', 'Books', 'Sports', 'Home & Garden'];
  const units = ['pcs', 'kg', 'liters', 'boxes', 'pairs', 'sets', 'meters'];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    items.forEach((item) => {
      const itemErrors: any = {};

      // Name validation
      if (!item.name.trim()) {
        itemErrors.name = 'Item name is required';
        isValid = false;
      } else if (item.name.trim().length < 2) {
        itemErrors.name = 'Item name must be at least 2 characters long';
        isValid = false;
      }

      // Barcode validation
      if (!item.barcode.trim()) {
        itemErrors.barcode = 'Barcode is required';
        isValid = false;
      } else if (item.barcode.trim().length < 8) {
        itemErrors.barcode = 'Barcode must be at least 8 characters long';
        isValid = false;
      }

      // Price validation
      if (!item.price.trim()) {
        itemErrors.price = 'Price is required';
        isValid = false;
      } else if (isNaN(Number(item.price)) || Number(item.price) <= 0) {
        itemErrors.price = 'Please enter a valid positive number for price';
        isValid = false;
      }

      // Unit validation
      if (!item.unit.trim()) {
        itemErrors.unit = 'Unit is required';
        isValid = false;
      }

      // Category validation
      if (!item.category.trim()) {
        itemErrors.category = 'Category is required';
        isValid = false;
      }

      // Quantity validation
      if (!item.quantity.trim()) {
        itemErrors.quantity = 'Quantity is required';
        isValid = false;
      } else if (isNaN(Number(item.quantity)) || Number(item.quantity) < 0) {
        itemErrors.quantity = 'Please enter a valid non-negative number for quantity';
        isValid = false;
      }

      if (Object.keys(itemErrors).length > 0) {
        newErrors[item.id] = itemErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (itemId: string, field: string, value: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, [field]: value } : item
    ));

    // Clear error when user starts typing
    if (errors[itemId]?.[field as keyof typeof errors[typeof itemId]]) {
      setErrors(prev => ({
        ...prev,
        [itemId]: {
          ...prev[itemId],
          [field]: undefined
        }
      }));
    }
  };

  const addNewItem = () => {
    const newId = (items.length + 1).toString();
    setItems(prev => [...prev, {
      id: newId,
      name: '',
      barcode: '',
      price: '',
      unit: '',
      category: '',
      quantity: ''
    }]);
  };

  const removeItem = (itemId: string) => {
    if (items.length > 1) {
      setItems(prev => prev.filter(item => item.id !== itemId));
      // Remove errors for this item
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[itemId];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Console log the submitted data
      console.log('Multiple items form submitted:', items.map(item => ({
        ...item,
        price: Number(item.price),
        quantity: Number(item.quantity)
      })));
      
      // Show success state
      setIsSuccess(true);
      
      // Redirect to items list after success
      setTimeout(() => {
        router.push('/inventory/items');
      }, 2000);
      
    } catch {
      setErrors({
        '1': { name: 'Failed to add items. Please try again.' }
      });
    } finally {
      setIsLoading(false);
    }
  };

          return (
      <div className="p-6  bg-white min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-black mb-1">Add New Items</h1>
            <p className="text-black/50 text-sm">Add multiple items to your inventory</p>
          </div>
          <Link
            href="/inventory/items"
            className="px-4 py-2 border border-black/20 text-black/70 hover:bg-black/5 transition-colors text-sm"
          >
            Back to Items
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-black/10">
          <div className="p-6">
            {isSuccess && (
              <div className="mb-6 bg-black/5 border border-black/20 p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-4 w-4 text-black/70" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-black/80">
                      Items added successfully! Redirecting to items list...
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full border border-black/20">
                  <thead className="bg-black/5">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black/70 border-r border-black/10">Item Name *</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black/70 border-r border-black/10">Barcode *</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black/70 border-r border-black/10">Price *</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black/70 border-r border-black/10">Unit *</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black/70 border-r border-black/10">Category *</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black/70 border-r border-black/10">Quantity *</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-black/70 w-16">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-black/2">
                        {/* Item Name */}
                        <td className="px-4 py-3 border-r border-black/10">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleInputChange(item.id, 'name', e.target.value)}
                            className={`w-full px-3 py-2 border border-black/20 focus:outline-none focus:border-black/40 text-sm ${
                              errors[item.id]?.name ? 'border-black/60' : ''
                            }`}
                            placeholder="Enter item name"
                          />
                          {errors[item.id]?.name && (
                            <p className="mt-1 text-xs text-black/60">{errors[item.id].name}</p>
                          )}
                        </td>

                        {/* Barcode */}
                        <td className="px-4 py-3 border-r border-black/10">
                          <input
                            type="text"
                            value={item.barcode}
                            onChange={(e) => handleInputChange(item.id, 'barcode', e.target.value)}
                            className={`w-full px-3 py-2 border border-black/20 focus:outline-none focus:border-black/40 text-sm ${
                              errors[item.id]?.barcode ? 'border-black/60' : ''
                            }`}
                            placeholder="Enter barcode"
                          />
                          {errors[item.id]?.barcode && (
                            <p className="mt-1 text-xs text-black/60">{errors[item.id].barcode}</p>
                          )}
                        </td>

                        {/* Price */}
                        <td className="px-4 py-3 border-r border-black/10">
                          <div className="relative">
                            <span className="absolute left-3 top-2 text-black/40 text-sm">$</span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={item.price}
                              onChange={(e) => handleInputChange(item.id, 'price', e.target.value)}
                              className={`w-full pl-6 pr-3 py-2 border border-black/20 focus:outline-none focus:border-black/40 text-sm ${
                                errors[item.id]?.price ? 'border-black/60' : ''
                              }`}
                              placeholder="0.00"
                            />
                          </div>
                          {errors[item.id]?.price && (
                            <p className="mt-1 text-xs text-black/60">{errors[item.id].price}</p>
                          )}
                        </td>

                        {/* Unit */}
                        <td className="px-4 py-3 border-r border-black/10">
                          <select
                            value={item.unit}
                            onChange={(e) => handleInputChange(item.id, 'unit', e.target.value)}
                            className={`w-full px-3 py-2 border border-black/20 focus:outline-none focus:border-black/40 text-sm ${
                              errors[item.id]?.unit ? 'border-black/60' : ''
                            }`}
                          >
                            <option value="">Select unit</option>
                            {units.map(unit => (
                              <option key={unit} value={unit}>{unit}</option>
                            ))}
                          </select>
                          {errors[item.id]?.unit && (
                            <p className="mt-1 text-xs text-black/60">{errors[item.id].unit}</p>
                          )}
                        </td>

                        {/* Category */}
                        <td className="px-4 py-3 border-r border-black/10">
                          <select
                            value={item.category}
                            onChange={(e) => handleInputChange(item.id, 'category', e.target.value)}
                            className={`w-full px-3 py-2 border border-black/20 focus:outline-none focus:border-black/40 text-sm ${
                              errors[item.id]?.category ? 'border-black/60' : ''
                            }`}
                          >
                            <option value="">Select category</option>
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                          {errors[item.id]?.category && (
                            <p className="mt-1 text-xs text-black/60">{errors[item.id].category}</p>
                          )}
                        </td>

                        {/* Quantity */}
                        <td className="px-4 py-3 border-r border-black/10">
                          <input
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(e) => handleInputChange(item.id, 'quantity', e.target.value)}
                            className={`w-full px-3 py-2 border border-black/20 focus:outline-none focus:border-black/40 text-sm ${
                              errors[item.id]?.quantity ? 'border-black/60' : ''
                            }`}
                            placeholder="0"
                          />
                          {errors[item.id]?.quantity && (
                            <p className="mt-1 text-xs text-black/60">{errors[item.id].quantity}</p>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          {items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="w-6 h-6 border border-black/20 text-black/50 hover:bg-black/5 hover:border-black/40 transition-colors flex items-center justify-center"
                              title="Remove item"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add More Item Button */}
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={addNewItem}
                  className="flex items-center space-x-2 px-4 py-2 border border-black/20 text-black/70 hover:bg-black/5 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add More Item</span>
                </button>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-black/10">
                <Link
                  href="/inventory/items"
                  className="px-4 py-2 border border-black/20 text-black/70 hover:bg-black/5 transition-colors text-sm"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 border border-black/20 text-white transition-colors text-sm ${
                    isLoading 
                      ? 'bg-black/30 cursor-not-allowed' 
                      : 'bg-black/80 hover:bg-black'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </div>
                  ) : (
                    'Add Items'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
   );
}
