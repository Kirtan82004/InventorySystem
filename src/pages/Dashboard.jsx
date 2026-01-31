import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";
import { FiBox, FiTag, FiAlertCircle } from "react-icons/fi";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardStats();
      console.log("dashboard",res)
      setStats(res);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );

  return (
    <div className="p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card
          title="Total Products"
          value={stats.total_products}
          icon={<FiBox className="text-3xl text-white" />}
          color="from-blue-400 to-blue-600"
        />
        <Card
          title="Total Categories"
          value={stats.total_categories}
          icon={<FiTag className="text-3xl text-white" />}
          color="from-green-400 to-green-600"
        />
        <Card
          title="Low Stock Items"
          value={stats.low_stock.length}
          icon={<FiAlertCircle className="text-3xl text-white" />}
          color="from-red-400 to-red-600"
        />
      </div>

      {/* Low Stock Table */}
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-red-600">
          Low Stock Products
        </h2>

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
              <th className="py-3 px-4 font-medium text-gray-700">Category</th>
              <th className="py-3 px-4 font-medium text-gray-700">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {stats.low_stock.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-red-50 transition text-center"
              >
                <td className="text-left py-2 px-4">{item.name}</td>
                <td className="px-4">{item.category_name || item.category_name}</td>
                <td className="px-4 text-red-600 font-semibold">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

/* Card Component */
const Card = ({ title, value, icon, color }) => (
  <div
    className={`rounded-2xl p-6 shadow flex items-center gap-4 bg-gradient-to-r ${color}`}
  >
    <div className="p-4 bg-white rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="text-gray-100 text-sm font-medium">{title}</h3>
      <p className="text-white text-3xl font-bold mt-1">{value}</p>
    </div>
  </div>
);
