'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  createdAt: string;
}

interface CategoryStats {
  totalCategories: number;
  activeCategories: number;
  itemsInCategories: number;
}

// Mock data
const categories: Category[] = [
  { id: '1', name: 'Electronics', description: 'Electronic devices and accessories', itemCount: 45, createdAt: '2024-01-15' },
  { id: '2', name: 'Clothing', description: 'Apparel and fashion items', itemCount: 32, createdAt: '2024-01-10' },
  { id: '3', name: 'Tools', description: 'Hand tools and equipment', itemCount: 28, createdAt: '2024-01-08' },
  { id: '4', name: 'Furniture', description: 'Home and office furniture', itemCount: 15, createdAt: '2024-01-05' },
  { id: '5', name: 'Books', description: 'Books and publications', itemCount: 67, createdAt: '2024-01-03' },
  { id: '6', name: 'Sports', description: 'Sports equipment and gear', itemCount: 23, createdAt: '2024-01-01' },
  { id: '7', name: 'Home & Garden', description: 'Home improvement and garden items', itemCount: 19, createdAt: '2023-12-28' },
];

const categoryStats: CategoryStats = {
  totalCategories: 7,
  activeCategories: 7,
  itemsInCategories: 229,
};

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  // Removed unused state variables
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategory.name.trim()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('New category submitted:', newCategory);
      
      // Show success state
      setIsSuccess(true);
      setNewCategory({ name: '', description: '' });
      
      // Hide success message after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black mb-1">Categories</h1>
          <p className="text-black/50 text-sm">Manage your inventory categories</p>
        </div>
        <Link
          href="/inventory/items"
          className="px-4 py-2 border border-black/20 text-black/70 hover:bg-black/5 transition-colors text-sm"
        >
          Back to Items
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-black/10 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-black/5 rounded-lg">
              <svg className="w-6 h-6 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-black/50">Total Categories</p>
              <p className="text-2xl font-bold text-black">{categoryStats.totalCategories}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-black/10 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-black/5 rounded-lg">
              <svg className="w-6 h-6 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-black/50">Active Categories</p>
              <p className="text-2xl font-bold text-black">{categoryStats.activeCategories}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-black/10 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-black/5 rounded-lg">
              <svg className="w-6 h-6 text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-black/50">Total Items</p>
              <p className="text-2xl font-bold text-black">{categoryStats.itemsInCategories}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Categories Table - 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-black/10">
            {/* Table Header */}
            <div className="p-6 border-b border-black/10">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-black">All Categories</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-black/20 focus:outline-none focus:border-black/40 text-sm w-64"
                  />
                  <svg className="absolute left-3 top-2.5 w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/5">
                  <tr>
                                         <th className="px-6 py-4 text-left text-xs font-medium text-black/70">SL</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Category Name</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Description</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-black/70">Created</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-black/70 w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {filteredCategories.map((category, index) => (
                    <tr key={category.id} className="hover:bg-black/2">
                      <td className="px-6 py-4 text-sm text-black/70">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-black">{category.name}</div>
                      </td>
                                             <td className="px-6 py-4">
                         <div className="text-sm text-black/70">{category.description}</div>
                       </td>
                       <td className="px-6 py-4 text-sm text-black/50">
                         {new Date(category.createdAt).toLocaleDateString()}
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex space-x-2">
                           <button className="text-black/50 hover:text-black/70 transition-colors" title="Edit category">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                             </svg>
                           </button>
                           <button className="text-black/50 hover:text-red-600 transition-colors" title="Delete category">
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

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-black/10">
              <p className="text-sm text-black/50">
                Showing {filteredCategories.length} of {categories.length} categories
              </p>
            </div>
          </div>
        </div>

        {/* Add Category Form - 1 column */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-black/10">
            <div className="p-6 border-b border-black/10">
              <h3 className="text-lg font-semibold text-black">Add New Category</h3>
              <p className="text-sm text-black/50 mt-1">Create a new category for your inventory</p>
            </div>

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
                        Category added successfully!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="categoryName" className="block text-sm font-medium text-black/70 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-black/20 focus:outline-none focus:border-black/40 text-sm"
                    placeholder="Enter category name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="categoryDescription" className="block text-sm font-medium text-black/70 mb-2">
                    Description
                  </label>
                  <textarea
                    id="categoryDescription"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-black/20 focus:outline-none focus:border-black/40 text-sm resize-none"
                    placeholder="Enter category description"
                    rows={3}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !newCategory.name.trim()}
                  className={`w-full px-4 py-2 border border-black/20 text-white transition-colors text-sm ${
                    isLoading || !newCategory.name.trim()
                      ? 'bg-black/30 cursor-not-allowed' 
                      : 'bg-black/80 hover:bg-black'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </div>
                  ) : (
                    'Add Category'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
