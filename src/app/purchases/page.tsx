export default function PurchasesDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Purchases Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Purchases</h3>
          <p className="text-3xl font-bold text-blue-600">$23,456</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Orders</h3>
          <p className="text-3xl font-bold text-green-600">67</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Vendors</h3>
          <p className="text-3xl font-bold text-purple-600">15</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Pending</h3>
          <p className="text-3xl font-bold text-orange-600">8</p>
        </div>
      </div>
    </div>
  );
}
