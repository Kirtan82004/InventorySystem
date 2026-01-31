import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetails,stockIn, stockOut } from "../services/productService";

export default function UpdateStock() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductDetails(id);
        setProduct(res.data);
      } catch (err) {
        setError("Failed to load product");
      }
    };
    fetchProduct();
  }, [id]);

  const handleStockIn = async () => {
    if (!quantity || quantity <= 0) return;
    setLoading(true);
    setError("");
    try {
      await stockIn(id, Number(quantity));
      navigate("/admin/stock");
    } catch (err) {
      setError(err.message || "Stock In failed");
    } finally {
      setLoading(false);
    }
  };

  const handleStockOut = async () => {
    if (!quantity || quantity <= 0) return;
    setLoading(true);
    setError("");
    try {
      await stockOut(id, Number(quantity));
      navigate("/admin/stock");
    } catch (err) {
      setError(err.message || "Not enough stock");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-1">
          Update Stock
        </h2>
        <p className="text-gray-500 mb-4">
          {product.name} ({product.category?.name})
        </p>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Current Quantity</p>
          <p className="text-xl font-semibold">
            {product.quantity}
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-3">
            {error}
          </p>
        )}

        <input
          type="number"
          placeholder="Enter quantity"
          className="w-full border rounded px-3 py-2 mb-4"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            disabled={loading}
            onClick={handleStockIn}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Stock In
          </button>

          <button
            disabled={loading}
            onClick={handleStockOut}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Stock Out
          </button>
        </div>

        <button
          onClick={() => navigate("/admin/stock")}
          className="w-full mt-4 text-gray-600 hover:underline text-sm"
        >
          ← Back to Stock List
        </button>
      </div>
    </div>
  );
}
