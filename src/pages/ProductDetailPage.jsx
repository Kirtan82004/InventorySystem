import { useEffect, useState } from "react";
import { getProductDetails } from "../services/productService";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await getProductDetails(productId);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Loading product details...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-purple-600 hover:text-purple-800 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Inventory
        </button>

        {/* Product Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <h2 className="text-3xl font-extrabold mb-4 text-gray-800">
            {product.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-lg">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-500 mb-1">Category</span>
              <span>{product.category?.name || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-500 mb-1">Price</span>
              <span className="text-green-600 font-bold">₹{product.price}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-500 mb-1">Quantity</span>
              <span className={product.quantity <= 5 ? "text-red-500 font-bold" : ""}>
                {product.quantity}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-500 mb-1">Status</span>
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  product.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {product.status ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Description / Extra Info */}
          {product.description && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-600 mb-1">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
