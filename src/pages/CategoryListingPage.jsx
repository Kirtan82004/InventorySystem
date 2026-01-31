import { useEffect, useState } from "react";
import { getAllCategories, deleteCategory } from "../services/categoryService";
import { Link } from "react-router-dom";

const CategoryListingPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-800">Categories</h1>
        <Link
          to="/admin/category/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          + Add Category
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-10 text-gray-500 font-medium">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-10 text-gray-400 font-medium">No categories found</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-gray-600 font-medium">#</th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium">Name</th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium">Description</th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium">Status</th>
                <th className="py-3 px-4 text-center text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((cat, idx) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{idx + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-700">{cat.name}</td>
                  <td className="py-3 px-4 text-gray-600">{cat.description || "-"}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${
                        cat.status ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      {cat.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    <Link
                      to={`/admin/category/edit/${cat.id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg text-white transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-white transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoryListingPage;
