export default function SalesOrderDetail({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sales Order Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Sales Order Detail Page for ID: {params.id}</p>
      </div>
    </div>
  );
}
