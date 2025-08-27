'use client';

import { useState, useEffect } from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt?: string;
}

interface CustomerFormProps {
  onSubmit: (customerData: Omit<Customer, 'id' | 'createdAt'>) => void;
  onCancel?: () => void;
  initialData?: Customer | null;
  isEditing?: boolean;
  isDialog?: boolean;
}

export default function CustomerForm({ 
  onSubmit, 
  onCancel, 
  initialData, 
  isEditing = false,
  isDialog = false 
}: CustomerFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        address: initialData.address
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      
      // Reset form if not editing
      if (!isEditing) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: ''
        });
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div>
        <label className="block text-xs font-medium text-black/70 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full px-3 py-2 border text-sm focus:outline-none focus:border-black/40 ${
            errors.name ? 'border-red-500' : 'border-black/20'
          }`}
          placeholder="Enter full name"
        />
        {errors.name && (
          <p className="text-xs text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-xs font-medium text-black/70 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full px-3 py-2 border text-sm focus:outline-none focus:border-black/40 ${
            errors.email ? 'border-red-500' : 'border-black/20'
          }`}
          placeholder="Enter email address"
        />
        {errors.email && (
          <p className="text-xs text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-xs font-medium text-black/70 mb-1">
          Phone Number *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={`w-full px-3 py-2 border text-sm focus:outline-none focus:border-black/40 ${
            errors.phone ? 'border-red-500' : 'border-black/20'
          }`}
          placeholder="Enter phone number"
        />
        {errors.phone && (
          <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Address Field */}
      <div>
        <label className="block text-xs font-medium text-black/70 mb-1">
          Address *
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          rows={3}
          className={`w-full px-3 py-2 border text-sm focus:outline-none focus:border-black/40 resize-none ${
            errors.address ? 'border-red-500' : 'border-black/20'
          }`}
          placeholder="Enter full address"
        />
        {errors.address && (
          <p className="text-xs text-red-600 mt-1">{errors.address}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className={`flex space-x-2 ${isDialog ? 'justify-end' : ''}`}>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-black/20 text-sm hover:bg-black/5 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white font-medium text-sm hover:bg-black/80 transition-colors"
        >
          {isEditing ? 'Update Customer' : 'Add Customer'}
        </button>
      </div>
    </form>
  );
}
