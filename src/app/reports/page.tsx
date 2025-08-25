export default function ReportsDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports & Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Sales Reports</h3>
          <p className="text-gray-600">View sales analytics</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Inventory Reports</h3>
          <p className="text-gray-600">Stock analysis</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Repair Reports</h3>
          <p className="text-gray-600">Service metrics</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Purchase Reports</h3>
          <p className="text-gray-600">Procurement data</p>
        </div>
      </div>
    </div>
  );
}
