import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, selectUser } from './store/userSlice';
import { fetchAgentDetails } from './store/agentSlice';
import { fetchCategories, fetchSubCategories } from './store/productSlice';
import { fetchCartItems } from './store/cartSlice';
import { fetchAddresses } from './store/addressSlice';
import { fetchOrders } from './store/orderSlice';
import CartMobileLink from './components/CartMobile';
import { fetchEateries } from './store/eaterySlice';


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const userDetails = useSelector(selectUser);

  // This effect runs once on app load to check for existing user/agent sessions
  useEffect(() => {
    dispatch(fetchUserDetails());
    dispatch(fetchAgentDetails());
  }, [dispatch]);

  // Fetch initial non-user-specific data
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
    dispatch(fetchEateries()); // Fetch eateries for the homepage
  }, [dispatch]);

  // Fetch all user-specific data ONLY when the user is logged in
  useEffect(() => {
    if (userDetails?._id) {
      dispatch(fetchCartItems());
      dispatch(fetchAddresses());
      dispatch(fetchOrders());
    }
  }, [userDetails, dispatch]);

  return (
    <>
      <Toaster />
      <Header />
      <main className='min-h-[calc(100vh-160px)]'>
        <Outlet />
      </main>
      <Footer />
      {/* Hide mobile cart link on checkout page */}
      {location.pathname !== '/checkout' && <CartMobileLink />}
    </>
  );
}

export default App;