import { useEffect, useState } from "react";
import {updateCategory, } from "../services/categoryService";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/axios";

const EditCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await api.get(`/categories/${id}`);
      setForm(res.data.data);
    } catch (err) {
      console.error("Failed to fetch category:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await updateCategory(id, form);
      navigate("/admin/categories");
    } catch (err) {
      setError("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <form className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Edit Category
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}

        {/* Category Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter category name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter description"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition h-24 resize-none"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div className="mb-6 flex items-center gap-3">
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
            className="h-5 w-5 text-purple-500 focus:ring-purple-400 border-gray-300 rounded"
          />
          <label className="text-gray-700 font-medium">Active</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Category"}
        </button>
      </form>
    </div>
  );
};

export default EditCategoryPage;
