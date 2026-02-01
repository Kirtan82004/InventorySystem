import { useEffect, useState } from "react";
import { getAllProductsForStock } from "../services/productService";
import { Link } from "react-router-dom";

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStock = async () => {
    try {
      const res = await getAllProductsForStock();
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Stock Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Manage product stock levels and availability
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading stock data...
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-4 text-left">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => {
                const isLow = p.quantity <= 10;

                return (
                  <tr
                    key={p.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {p.name}
                    </td>

                    <td className="p-4 text-gray-600 text-center">
                      {p.category?.name || "-"}
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          isLow
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {p.quantity}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      {isLow ? (
                        <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs">
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs">
                          In Stock
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <Link
                        to={`/admin/stock/update/${p.id}`}
                        className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs transition"
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
