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
  useEffect(() => {
    dispatch(fetchUserDetails());
    dispatch(fetchAgentDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
    dispatch(fetchEateries()); 
  }, [dispatch]);

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
      {location.pathname !== '/checkout' && <CartMobileLink />}
    </>
  );
}

export default App;