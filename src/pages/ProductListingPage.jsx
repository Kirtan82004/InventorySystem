import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import { getAllCategories } from "../services/categoryService";
import { Link } from "react-router-dom";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProducts();
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((p) => {
    return (
      (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
      (!categoryId || p.category_id == categoryId)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">Products</h1>
          <Link
            to="/admin/product/add"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg shadow transition"
          >
            + Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search product..."
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* No Products */}
        {!loading && filteredProducts.length === 0 && (
          <p className="text-gray-500 text-center mt-10 text-lg">
            No products found.
          </p>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-5 flex flex-col"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {product.name}
              </h2>
              <p className="text-gray-500 mb-2">{product.category?.name}</p>
              <p className="text-gray-700 font-bold mb-2">₹ {product.price}</p>
              <p
                className={`mb-4 font-semibold ${
                  product.quantity > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.quantity} in stock
              </p>

              <div className="mt-auto flex gap-2">
                <Link
                  to={`/admin/product/${product.id}`}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-center transition"
                >
                  View
                </Link>
                <Link
                  to={`/admin/product/edit/${product.id}`}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-lg text-center transition"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
