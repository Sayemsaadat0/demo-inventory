// Mock data for inventory management system

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  barcode: string;
  price: number;
  quantity: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  qrCode?: string;
}

export interface InventoryStats {
  totalItems: number;
  lowStock: number;
  outOfStock: number;
  categories: number;
  totalValue: number;
}



export interface InventoryCategory {
  category: string;
  items: number;
  quantity: number;
}

export interface Store {
  id: number;
  name: string;
  location: string;
  items: number;
  orders: number;
}

export interface Activity {
  type: 'sale' | 'purchase' | 'repair';
  item: string;
  quantity: number;
  time: string;
}

export interface DashboardStats {
  totalItems: number;

  totalPurchases: number;
  totalRepairs: number;
  totalStores: number;
  totalCustomers: number;

  totalTechnicians: number;
}

// Dashboard data
export const dashboardStats: DashboardStats = {
  totalItems: 1247,

  totalPurchases: 156,
  totalRepairs: 89,
  totalStores: 3,
  totalCustomers: 342,

  totalTechnicians: 12
};



export const inventoryData: InventoryCategory[] = [
  { category: 'Electronics', items: 450, quantity: 1250 },
  { category: 'Clothing', items: 320, quantity: 890 },
  { category: 'Tools', items: 280, quantity: 650 },
  { category: 'Furniture', items: 197, quantity: 320 }
];

export const stores: Store[] = [
  { id: 1, name: 'Main Store', location: 'Downtown', items: 456, orders: 125 },
  { id: 2, name: 'North Branch', location: 'North District', items: 398, orders: 98 },
  { id: 3, name: 'South Branch', location: 'South District', items: 393, orders: 87 }
];

export const recentActivity: Activity[] = [
  { type: 'sale', item: 'iPhone 15 Pro', quantity: 2, time: '2 hours ago' },
  { type: 'purchase', item: 'Laptop Parts', quantity: 50, time: '4 hours ago' },
  { type: 'repair', item: 'MacBook Air', quantity: 1, time: '6 hours ago' },
  { type: 'sale', item: 'Wireless Headphones', quantity: 5, time: '8 hours ago' }
];

// Inventory items data
export const inventoryItems: InventoryItem[] = [
  { 
    id: 1, 
    name: 'iPhone 15 Pro', 
    category: 'Electronics', 
    barcode: '123456789012', 
    price: 999.99,
    quantity: 45, 
    unit: 'pcs',
    status: 'In Stock', 
    qrCode: 'IPH15P-001'
  },
  { 
    id: 2, 
    name: 'MacBook Air M2', 
    category: 'Electronics', 
    barcode: '123456789013', 
    price: 1299.99,
    quantity: 23, 
    unit: 'pcs',
    status: 'Low Stock', 
    qrCode: 'MBA-M2-001'
  },
  { 
    id: 3, 
    name: 'Wireless Headphones', 
    category: 'Electronics', 
    barcode: '123456789014', 
    price: 199.99,
    quantity: 67, 
    unit: 'pcs',
    status: 'In Stock', 
    qrCode: 'WH-001'
  },
  { 
    id: 4, 
    name: 'Gaming Mouse', 
    category: 'Electronics', 
    barcode: '123456789015', 
    price: 79.99,
    quantity: 89, 
    unit: 'pcs',
    status: 'In Stock', 
    qrCode: 'GM-001'
  },
  { 
    id: 5, 
    name: 'Mechanical Keyboard', 
    category: 'Electronics', 
    barcode: '123456789016', 
    price: 149.99,
    quantity: 12, 
    unit: 'pcs',
    status: 'Low Stock', 
    qrCode: 'MK-001'
  },
  { 
    id: 6, 
    name: 'USB-C Cable', 
    category: 'Electronics', 
    barcode: '123456789017', 
    price: 19.99,
    quantity: 234, 
    unit: 'pcs',
    status: 'In Stock', 
    qrCode: 'UCC-001'
  },
  { 
    id: 7, 
    name: 'Bluetooth Speaker', 
    category: 'Electronics', 
    barcode: '123456789018', 
    price: 89.99,
    quantity: 34, 
    unit: 'pcs',
    status: 'In Stock', 
    qrCode: 'BS-001'
  },
  { 
    id: 8, 
    name: 'Webcam HD', 
    category: 'Electronics', 
    barcode: '123456789019', 
    price: 129.99,
    quantity: 56, 
    unit: 'pcs',
    status: 'In Stock', 
    qrCode: 'WC-001'
  },
  { 
    id: 9, 
    name: 'Power Bank 10000mAh', 
    category: 'Electronics', 
    barcode: '123456789020', 
    price: 49.99,
    quantity: 78, 
    unit: 'pcs',
    status: 'In Stock', 
    qrCode: 'PB-001'
  },
  { 
    id: 10, 
    name: 'Wireless Charger', 
    category: 'Electronics', 
    barcode: '123456789021', 
    price: 39.99,
    quantity: 29, 
    unit: 'pcs',
    status: 'Low Stock', 
    qrCode: 'WC-002'
  },
  { 
    id: 11, 
    name: 'Laptop Stand', 
    category: 'Accessories', 
    barcode: '123456789022', 
    price: 29.99,
    quantity: 45, 
    unit: 'pcs',
    status: 'In Stock', 
    qrCode: 'LS-001'
  },
  { 
    id: 12, 
    name: 'Monitor 27"', 
    category: 'Electronics', 
    barcode: '123456789023', 
    price: 299.99,
    quantity: 15, 
    unit: 'pcs',
    status: 'Low Stock', 
    qrCode: 'MON-001'
  },
  { 
    id: 13, 
    name: 'Printer Ink Cartridge', 
    category: 'Office', 
    barcode: '123456789024', 
    price: 24.99,
    quantity: 123, 
    unit: 'pcs',
    status: 'In Stock', 
    qrCode: 'PIC-001'
  },
  { 
    id: 14, 
    name: 'Desk Lamp LED', 
    category: 'Office', 
    barcode: '123456789025', 
    price: 59.99,
    quantity: 67, 
    unit: 'pcs',
    status: 'In Stock', 
    qrCode: 'DL-001'
  },
  { 
    id: 15, 
    name: 'Office Chair', 
    category: 'Furniture', 
    barcode: '123456789026', 
    price: 299.99,
    quantity: 8, 
    unit: 'pcs',
    status: 'Low Stock', 
    qrCode: 'OC-001'
  }
];

export const inventoryStats: InventoryStats = {
  totalItems: 15,
  lowStock: 4,
  outOfStock: 0,
  categories: 4,
  totalValue: 4567.89
};

// Helper function to get items by QR code
export const getItemByQRCode = (qrCode: string): InventoryItem | undefined => {
  return inventoryItems.find(item => item.qrCode === qrCode);
};

// Helper function to get items by search term
export const searchItems = (searchTerm: string, category?: string, status?: string): InventoryItem[] => {
  return inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.qrCode && item.qrCode.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !category || category === 'all' || item.category === category;
    const matchesStatus = !status || status === 'all' || item.status === status;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
};
