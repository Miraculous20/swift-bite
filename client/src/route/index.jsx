import { createBrowserRouter } from "react-router-dom";

// --- CORE & LAYOUTS ---
import App from "/src/App.jsx";
import Dashboard from "/src/layouts/Dashboard.jsx";
import AdminPermission from "/src/layouts/AdminPermission.jsx";
import AgentPermission from "/src/layouts/AgentPermission.jsx";
import EateryAdminPermission from "/src/layouts/EateryAdminPermission.jsx";

// --- GENERAL PAGES ---
import Home from "/src/pages/Home.jsx";
import AboutPage from "/src/pages/About.jsx";
import SearchPage from "/src/pages/SearchPage.jsx";
import CategoryProductListPage from "/src/pages/CategoryProductListPage.jsx";
import ProductDisplayPage from "/src/pages/ProductDisplayPage.jsx";
import CartPage from "/src/pages/CartPage.jsx";
import CheckoutPage from "/src/pages/CheckoutPage.jsx";
import Success from "/src/pages/Success.jsx";
import Cancel from "/src/pages/Cancel.jsx";
import OrderTrackingPage from "/src/pages/OrderTrackingPage.jsx";

// --- AUTH PAGES ---
import Login from "/src/pages/Login.jsx";
import Register from "/src/pages/Register.jsx";
import ForgotPassword from "/src/pages/ForgotPassword.jsx";
import OtpVerification from "/src/pages/OtpVerification.jsx";
import ResetPassword from "/src/pages/ResetPassword.jsx";

// --- USER DASHBOARD PAGES ---
import UserMenuMobile from "/src/pages/UserMenuMobile.jsx";
import Profile from "/src/pages/Profile.jsx";
import MyOrders from "/src/pages/MyOrders.jsx";
import Address from "/src/pages/Address.jsx";
import CategoryPage from "/src/pages/CategoryPage.jsx";
import SubCategoryPage from "/src/pages/SubCategoryPage.jsx";
import UploadProduct from "/src/pages/UploadProduct.jsx";
import ProductAdmin from "/src/pages/ProductAdmin.jsx";

// --- AGENT PAGES ---
import AgentRegister from "/src/pages/agent/AgentRegister.jsx";
import AgentDashboard from "/src/pages/agent/AgentDashboard.jsx";

// --- EATERY PAGES ---
import EateryLogin from "/src/pages/eatery/EateryLogin.jsx";
import EateryRegister from "/src/pages/eatery/EateryRegister.jsx";
import EateryDashboard from "/src/pages/eatery/EateryDashboard.jsx";
import EateryMenuPage from "/src/pages/EateryMenuPage.jsx";
import ManageProducts from "/src/pages/eatery/ManageProducts.jsx";
import ViewOrders from "/src/pages/eatery/ViewOrders.jsx";
import EateryProfile from "/src/pages/eatery/EateryProfile.jsx";


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            // --- PUBLIC ROUTES ---
            { path: "", element: <Home/> },
            { path: "about", element: <AboutPage /> },
            { path: "search", element: <SearchPage/> },
            { path: "product/:product", element: <ProductDisplayPage/> },
            { path: "category/:categoryName", element: <CategoryProductListPage/> },
            { path: "eatery/:eateryId", element: <EateryMenuPage /> },
            { path: "track/:orderId", element: <OrderTrackingPage /> },

            // --- AUTHENTICATION ROUTES ---
            { path: 'login', element: <Login/> },
            { path: "register", element: <Register/> },
            { path: "eatery/login", element: <EateryLogin /> },
            { path: "eatery/register", element: <EateryRegister /> },
            { path: "agent/register", element: <AgentRegister /> },
            { path: "forgot-password", element: <ForgotPassword/> },
            { path: "verification-otp", element: <OtpVerification/> },
            { path: "reset-password", element: <ResetPassword/> },

            // --- PROTECTED USER ROUTES ---
            { path: "cart", element: <CartPage/> },
            { path: "checkout", element: <CheckoutPage /> },
            { path: "success", element: <Success/> },
            { path: 'cancel', element: <Cancel/> },
            { path: "user", element: <UserMenuMobile/> },
            {
                path: "dashboard",
                element: <Dashboard/>,
                children: [
                    { path: "profile", element: <Profile/> },
                    { path: "myorders", element: <MyOrders/> },
                    { path: "address", element: <Address/> },
                    // Admin-specific routes
                    { path: 'category', element: <AdminPermission><CategoryPage/></AdminPermission> },
                    { path: "subcategory", element: <AdminPermission><SubCategoryPage/></AdminPermission> },
                    { path: 'upload-product', element: <AdminPermission><UploadProduct/></AdminPermission> },
                    { path: 'product', element: <AdminPermission><ProductAdmin/></AdminPermission> }
                ]
            },

            // --- PROTECTED AGENT ROUTES ---
            {
                path: "agent/dashboard", 
                element: <AgentPermission><AgentDashboard/></AgentPermission>,
            },

            // --- PROTECTED EATERY ROUTES ---
            {
                path: "eatery/dashboard",
                element: <EateryAdminPermission><Dashboard /></EateryAdminPermission>,
                children: [
                    { path: "", element: <EateryDashboard /> },
                    { path: "products", element: <ManageProducts /> },
                    { path: "orders", element: <ViewOrders /> },
                    { path: "profile", element: <EateryProfile /> }
                ]
            },
        ]
    }
]);

export default router;