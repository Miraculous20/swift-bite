import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice'; 
import addressReducer from './addressSlice';
import orderReducer from './orderSlice';
import categoryReducer from './categorySlice';
import eateryReducer from './eaterySlice';
import agentReducer from './agentSlice';
import eateryAdminReducer from './eateryAdminSlice'; 

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer, 
    address: addressReducer,
    order: orderReducer,
    category: categoryReducer, 
    eatery: eateryReducer,     
    agent: agentReducer,
    eateryAdmin: eateryAdminReducer, 
  },
});