import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios'; 
import SummaryApi from '../common/SummaryApi';
import { pricewithDiscount } from '../utils/PriceWithDiscount';

export const fetchCartItems = createAsyncThunk(
    'cart/fetchItems', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(SummaryApi.getCartItem.url);
            return response.data.data;
        } catch (error) {
         
            return rejectWithValue(error.response?.data);
        }
    }
);


export const addItemToCart = createAsyncThunk(
    'cart/addItem', 
    async (productId, { rejectWithValue }) => {
        try {
            const response = await Axios.post(SummaryApi.addToCart.url, { productId, quantity: 1 });
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to add item.";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);


export const updateItemQuantity = createAsyncThunk(
    'cart/updateQuantity', 
    async ({ cartItemId, quantity }, { rejectWithValue }) => {
        try {
            const response = await Axios.patch(SummaryApi.updateCartItemQty.url, { cartItemId, quantity });
            return response.data.data; 
        } catch (error) {
            const message = error.response?.data?.message || "Failed to update quantity.";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);


export const deleteCartItem = createAsyncThunk(
    'cart/deleteItem', 
    async (cartItemId, { rejectWithValue }) => {
        try {
            const response = await Axios.delete(`${SummaryApi.deleteCartItem.url}/${cartItemId}`);
            toast.success(response.data.message);
            return cartItemId; 
        } catch (error) {
            const message = error.response?.data?.message || "Failed to remove item.";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);


const initialState = {
  items: [],
  status: 'idle', 
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Cases for fetchCartItems
      .addCase(fetchCartItems.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items = action.payload || []; 
      })
      .addCase(fetchCartItems.rejected, (state) => {
          state.status = 'failed';
          state.items = []; 
      })
      // Cases for addItemToCart
      .addCase(addItemToCart.fulfilled, (state, action) => {
          state.items.push(action.payload);
      })
      // Cases for updateItemQuantity
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
          const updatedItem = action.payload;
          const index = state.items.findIndex(item => item._id === updatedItem._id);
          if (index !== -1) {
              state.items[index] = updatedItem;
          }
      })
      // Cases for deleteCartItem
      .addCase(deleteCartItem.fulfilled, (state, action) => {
          const deletedItemId = action.payload;
          state.items = state.items.filter(item => item._id !== deletedItemId);
      });
  },
});

export const { clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectTotalQty = (state) => 
    state.cart.items.reduce((total, item) => {
        if (item && typeof item.quantity === 'number') {
            return total + item.quantity;
        }
        return total;
    }, 0);

export const selectTotalPrice = (state) => {
  return state.cart.items.reduce((total, item) => {
    if (item && item.productId && typeof item.productId.price === 'number') {
      const itemPrice = pricewithDiscount(item.productId.price, item.productId.discount);
      return total + (item.quantity * itemPrice);
    }
    return total;
  }, 0);
};

export const selectTotalOriginalPrice = (state) => {
    return state.cart.items.reduce((total, item) => {
      if (item && item.productId && typeof item.productId.price === 'number') {
        return total + (item.quantity * item.productId.price);
      }
      return total;
    }, 0);
};

export default cartSlice.reducer;
