import { createBrowserRouter } from "react-router-dom";

// --- CORE & LAYOUTS ---
import App from "/src/App";
import Dashboard from "/src/layouts/Dashboard"; // FIX: Import Dashboard
import AdminPermission from "/src/layouts/AdminPermission";
import AgentPermission from "/src/layouts/AgentPermission"; // FIX: Import AgentPermission
import EateryAdminPermission from "/src/layouts/EateryAdminPermission";

// --- GENERAL PAGES ---
import Home from "/src/pages/Home";
import AboutPage from "/src/pages/About";
import SearchPage from "/src/pages/SearchPage";
import CategoryProductListPage from "/src/pages/CategoryProductListPage";
import ProductDisplayPage from "/src/pages/ProductDisplayPage";
import CartPage from "/src/pages/CartPage";
import CheckoutPage from "/src/pages/CheckoutPage";
import Success from "/src/pages/Success";
import Cancel from "/src/pages/Cancel"; // FIX: Import Cancel
import OrderTrackingPage from "/src/pages/OrderTrackingPage";

// --- AUTH PAGES ---
import Login from "/src/pages/Login";
import Register from "/src/pages/Register";
import ForgotPassword from "/src/pages/ForgotPassword";
import OtpVerification from "/src/pages/OtpVerification";
import ResetPassword from "/src/pages/ResetPassword";

// --- USER DASHBOARD PAGES ---
import UserMenuMobile from "/src/pages/UserMenuMobile";
import Profile from "/src/pages/Profile";
import MyOrders from "/src/pages/MyOrders";
import Address from "/src/pages/Address";
import CategoryPage from "/src/pages/CategoryPage";
import SubCategoryPage from "/src/pages/SubCategoryPage";
import UploadProduct from "/src/pages/UploadProduct";
import ProductAdmin from "/src/pages/ProductAdmin";

// --- AGENT PAGES ---
import AgentRegister from "/src/pages/agent/AgentRegister";
import AgentDashboard from "/src/pages/agent/AgentDashboard";

// --- EATERY PAGES ---
import EateryLogin from "/src/pages/eatery/EateryLogin";
import EateryRegister from "/src/pages/eatery/EateryRegister";
import EateryDashboard from "/src/pages/eatery/EateryDashboard";
import EateryMenuPage from "/src/pages/EateryMenuPage";
import ManageProducts from "/src/pages/eatery/ManageProducts"; // FIX: Import ManageProducts
import ViewOrders from "/src/pages/eatery/ViewOrders"; // FIX: Import ViewOrders


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            // --- Keep all existing routes here ---
            { path : "", element : <Home/> },
            { path: "/about", element: <AboutPage /> },
            { path: "eatery/:eateryId", element: <EateryMenuPage /> },
            { path: "track/:orderId", element: <OrderTrackingPage /> },
            { path: "search", element : <SearchPage/> },
            { path: 'login', element : <Login/> },
            { path: "register", element : <Register/> },
            { path: "eatery/login", element: <EateryLogin /> },
            { path: "eatery/register", element: <EateryRegister /> },
            { path: "agent/register", element: <AgentRegister /> },
            { path: "forgot-password", element : <ForgotPassword/> },
            { path: "verification-otp", element : <OtpVerification/> },
            { path: "reset-password", element : <ResetPassword/> },
            { path: "user", element : <UserMenuMobile/> },
            
            // --- USER & ADMIN DASHBOARD ---
            {
                path : "dashboard",
                element : <Dashboard/>,
                children : [
                    { path : "profile", element : <Profile/> },
                    { path : "myorders", element : <MyOrders/> },
                    { path : "address", element : <Address/> },
                    { path : 'category', element : <AdminPermission><CategoryPage/></AdminPermission> },
                    { path : "subcategory", element : <AdminPermission><SubCategoryPage/></AdminPermission> },
                    { path : 'upload-product', element : <AdminPermission><UploadProduct/></AdminPermission> },
                    { path : 'product', element : <AdminPermission><ProductAdmin/></AdminPermission> }
                ]
            },

            {
                path: "eatery/dashboard",
                element: <EateryAdminPermission><Dashboard /></EateryAdminPermission>,
                children: [
                    { path: "", element: <EateryDashboard /> },
                    { path: "products", element: <ManageProducts /> },
                    { path: "orders", element: <ViewOrders /> }
                ]
            },

            // --- AGENT DASHBOARD ---
            {
                path: "agent/dashboard", 
                element: <AgentPermission><AgentDashboard/></AgentPermission>,
            },

            // --- EATERY DASHBOARD ---
            { path: "eatery/login", element: <EateryLogin /> },
            {
                path: "eatery/dashboard",
                element: <EateryAdminPermission><Dashboard /></EateryAdminPermission>,
                children: [
                    { path: "", element: <EateryDashboard /> },
                    { path: "products", element: <ManageProducts /> },
                    { path: "orders", element: <ViewOrders /> }
                ]
            },
             { 
              path: "checkout", 
              element: <CheckoutPage /> 
            },
            
            { path: "success", element : <Success/> },
            { path: 'cancel', element : <Cancel/> },


            { path: "category/:categoryName", element: <CategoryProductListPage/> },
            { path: "product/:product", element : <ProductDisplayPage/> },
            { path: 'cart', element : <CartPage/> },
            { path: "checkout", element : <CheckoutPage/> },
            { path: "success", element : <Success/> },
            { path: 'cancel', element : <Cancel/> }
        ]
    }
]);

export default router;