import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoutes";
import Signup from "../pages/Signup";
import CategoryListingPage from "../pages/CategoryListingPage";
import AddCategoryPage from "../pages/AddCategoryPage";
import EditCategoryPage from "../pages/EditCategoryPage";
import ProductListingPage from "../pages/ProductListingPage";
import AddProductPage from "../pages/AddProductPage";
import EditProductPage from "../pages/EditProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import Stock from "../pages/Stock";
import UpdateStock from "../pages/UpdateStock";
import LowStock from "../pages/LowStock";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: (<App />),
        children: [
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "admin/categories",
                element: <CategoryListingPage />,
            },
            {
                path: "admin/category/add",
                element: <AddCategoryPage />,
            },
            {
                path: "admin/category/edit/:id",
                element: <EditCategoryPage />,
            },
            {
                path: "admin/inventory",
                element: <ProductListingPage />,
            },
            {
                path: "admin/product/add",
                element: <AddProductPage />,
            },
            {
                path: "admin/product/edit/:id",
                element: <EditProductPage />,
            },
            {
                path: "admin/product/:productId",
                element: <ProductDetailPage />,
            },
            {
                path: "admin/stock",
                element: <Stock />,
            },
            {
                path: "admin/stock/low",
                element: <LowStock />,
            },
            {
                path: "admin/stock/update/:id",
                element: <UpdateStock />,
            }
        ]

    },

]);

export default router;