import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import { getAllCategories } from "../services/categoryService";
import { Link } from "react-router-dom";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProducts({
        page,
        search,
        category_id: categoryId,
      });

      setProducts(res.data.data);
      setLastPage(res.data.last_page);
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
  }, [page, search, categoryId]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // reset page when filter/search changes
  useEffect(() => {
    setPage(1);
  }, [search, categoryId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">Products</h1>
          <Link
            to="/admin/product/add"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg shadow"
          >
            + Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search product..."
            className="flex-1 p-3 rounded-lg border focus:ring-2 focus:ring-purple-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-3 rounded-lg border focus:ring-2 focus:ring-purple-400"
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

        {/* Loader */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Empty */}
        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500">No products found</p>
        )}

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow p-5"
            >
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-gray-500">{product.category?.name}</p>
              <p className="font-bold mt-1">₹ {product.price}</p>
              <p
                className={`mt-2 font-semibold ${product.quantity <= 10
                    ? "text-red-600"
                    : "text-green-600"
                  }`}
              >
                {product.quantity} in stock
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {lastPage > 1 && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(lastPage)].map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded ${p === page
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200"
                    }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              disabled={page === lastPage}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;
