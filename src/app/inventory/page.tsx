export default function InventoryDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Items</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Low Stock</h3>
          <p className="text-3xl font-bold text-red-600">23</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <p className="text-3xl font-bold text-green-600">45</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Suppliers</h3>
          <p className="text-3xl font-bold text-purple-600">12</p>
        </div>
      </div>
    </div>
  );
}
