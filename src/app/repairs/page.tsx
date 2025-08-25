export default function RepairsDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Repairs Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Open Tickets</h3>
          <p className="text-3xl font-bold text-red-600">34</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600">89</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Technicians</h3>
          <p className="text-3xl font-bold text-blue-600">8</p>
        </div>
      </div>
    </div>
  );
}
