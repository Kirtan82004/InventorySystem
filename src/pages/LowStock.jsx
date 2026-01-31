import { useEffect, useState } from "react";
import axios from "../services/axios";

export default function LowStock() {
  const [items, setItems] = useState([]);

  const fetchLowStock = async () => {
    const res = await axios.get("/dashboard");
    setItems(res.data.low_stock);
  };

  useEffect(() => {
    fetchLowStock();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-red-600">
        Low Stock Products
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded shadow border-l-4 border-red-500"
          >
            <h2 className="font-semibold text-lg">{p.name}</h2>
            <p className="text-sm text-gray-600">
              Category: {p.category_name}
            </p>
            <p className="mt-2 font-bold text-red-600">
              Quantity: {p.quantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
