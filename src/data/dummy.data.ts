// Mock data for inventory management system

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  unit: string;
  supplier: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  location: string;
  qrCode?: string;
}

export interface InventoryStats {
  totalItems: number;
  lowStock: number;
  outOfStock: number;
  categories: number;
  suppliers: number;
}

export interface SalesData {
  month: string;
  quantity: number;
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
  totalSales: number;
  totalPurchases: number;
  totalRepairs: number;
  totalStores: number;
  totalCustomers: number;
  totalSuppliers: number;
  totalTechnicians: number;
}

// Dashboard data
export const dashboardStats: DashboardStats = {
  totalItems: 1247,
  totalSales: 342,
  totalPurchases: 156,
  totalRepairs: 89,
  totalStores: 3,
  totalCustomers: 342,
  totalSuppliers: 28,
  totalTechnicians: 12
};

export const salesData: SalesData[] = [
  { month: 'Jan', quantity: 45 },
  { month: 'Feb', quantity: 52 },
  { month: 'Mar', quantity: 67 },
  { month: 'Apr', quantity: 38 },
  { month: 'May', quantity: 78 },
  { month: 'Jun', quantity: 89 }
];

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
    sku: 'IPH15P-001', 
    quantity: 45, 
    unit: 'units',
    supplier: 'Apple Inc.', 
    status: 'In Stock', 
    location: 'Main Store',
    qrCode: 'IPH15P-001'
  },
  { 
    id: 2, 
    name: 'MacBook Air M2', 
    category: 'Electronics', 
    sku: 'MBA-M2-001', 
    quantity: 23, 
    unit: 'units',
    supplier: 'Apple Inc.', 
    status: 'Low Stock', 
    location: 'Main Store',
    qrCode: 'MBA-M2-001'
  },
  { 
    id: 3, 
    name: 'Wireless Headphones', 
    category: 'Electronics', 
    sku: 'WH-001', 
    quantity: 67, 
    unit: 'units',
    supplier: 'Sony Corp.', 
    status: 'In Stock', 
    location: 'North Branch',
    qrCode: 'WH-001'
  },
  { 
    id: 4, 
    name: 'Gaming Mouse', 
    category: 'Electronics', 
    sku: 'GM-001', 
    quantity: 89, 
    unit: 'units',
    supplier: 'Logitech', 
    status: 'In Stock', 
    location: 'South Branch',
    qrCode: 'GM-001'
  },
  { 
    id: 5, 
    name: 'Mechanical Keyboard', 
    category: 'Electronics', 
    sku: 'MK-001', 
    quantity: 12, 
    unit: 'units',
    supplier: 'Corsair', 
    status: 'Low Stock', 
    location: 'Main Store',
    qrCode: 'MK-001'
  },
  { 
    id: 6, 
    name: 'USB-C Cable', 
    category: 'Electronics', 
    sku: 'UCC-001', 
    quantity: 234, 
    unit: 'pieces',
    supplier: 'Anker', 
    status: 'In Stock', 
    location: 'Main Store',
    qrCode: 'UCC-001'
  },
  { 
    id: 7, 
    name: 'Bluetooth Speaker', 
    category: 'Electronics', 
    sku: 'BS-001', 
    quantity: 34, 
    unit: 'units',
    supplier: 'JBL', 
    status: 'In Stock', 
    location: 'North Branch',
    qrCode: 'BS-001'
  },
  { 
    id: 8, 
    name: 'Webcam HD', 
    category: 'Electronics', 
    sku: 'WC-001', 
    quantity: 56, 
    unit: 'units',
    supplier: 'Logitech', 
    status: 'In Stock', 
    location: 'South Branch',
    qrCode: 'WC-001'
  },
  { 
    id: 9, 
    name: 'Power Bank 10000mAh', 
    category: 'Electronics', 
    sku: 'PB-001', 
    quantity: 78, 
    unit: 'units',
    supplier: 'Anker', 
    status: 'In Stock', 
    location: 'Main Store',
    qrCode: 'PB-001'
  },
  { 
    id: 10, 
    name: 'Wireless Charger', 
    category: 'Electronics', 
    sku: 'WC-002', 
    quantity: 29, 
    unit: 'units',
    supplier: 'Samsung', 
    status: 'Low Stock', 
    location: 'North Branch',
    qrCode: 'WC-002'
  },
  { 
    id: 11, 
    name: 'Laptop Stand', 
    category: 'Accessories', 
    sku: 'LS-001', 
    quantity: 45, 
    unit: 'units',
    supplier: 'Amazon Basics', 
    status: 'In Stock', 
    location: 'Main Store',
    qrCode: 'LS-001'
  },
  { 
    id: 12, 
    name: 'Monitor 27"', 
    category: 'Electronics', 
    sku: 'MON-001', 
    quantity: 15, 
    unit: 'units',
    supplier: 'Dell', 
    status: 'Low Stock', 
    location: 'South Branch',
    qrCode: 'MON-001'
  },
  { 
    id: 13, 
    name: 'Printer Ink Cartridge', 
    category: 'Office', 
    sku: 'PIC-001', 
    quantity: 123, 
    unit: 'cartridges',
    supplier: 'HP', 
    status: 'In Stock', 
    location: 'Main Store',
    qrCode: 'PIC-001'
  },
  { 
    id: 14, 
    name: 'Desk Lamp LED', 
    category: 'Office', 
    sku: 'DL-001', 
    quantity: 67, 
    unit: 'units',
    supplier: 'IKEA', 
    status: 'In Stock', 
    location: 'North Branch',
    qrCode: 'DL-001'
  },
  { 
    id: 15, 
    name: 'Office Chair', 
    category: 'Furniture', 
    sku: 'OC-001', 
    quantity: 8, 
    unit: 'units',
    supplier: 'Herman Miller', 
    status: 'Low Stock', 
    location: 'Main Store',
    qrCode: 'OC-001'
  }
];

export const inventoryStats: InventoryStats = {
  totalItems: 1247,
  lowStock: 23,
  outOfStock: 5,
  categories: 8,
  suppliers: 28
};

// Helper function to get items by QR code
export const getItemByQRCode = (qrCode: string): InventoryItem | undefined => {
  return inventoryItems.find(item => item.qrCode === qrCode);
};

// Helper function to get items by search term
export const searchItems = (searchTerm: string, category?: string, status?: string): InventoryItem[] => {
  return inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !category || category === 'all' || item.category === category;
    const matchesStatus = !status || status === 'all' || item.status === status;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
};
