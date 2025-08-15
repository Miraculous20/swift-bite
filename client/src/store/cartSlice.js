import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import { mockMenu } from '../data/mockData';

// ASYNC THUNKS (SIMULATED)
export const fetchCartItems = createAsyncThunk('cart/fetchItems', async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return []; // Start with an empty cart
});

export const addItemToCart = createAsyncThunk('cart/addItem', async (productId, { getState, rejectWithValue }) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const { items } = getState().cart;
    const productToAdd = mockMenu.find(p => p._id === productId);

    if (!productToAdd) return rejectWithValue("Product not found");

    const existingItem = items.find(item => item.productId._id === productId);
    if (existingItem) {
        toast.error("Item is already in the cart.");
        return rejectWithValue("Item already in cart");
    }

    toast.success("Item added to cart!");
    return { _id: `cart_${Date.now()}`, productId: productToAdd, quantity: 1 };
});

export const updateItemQuantity = createAsyncThunk('cart/updateQuantity', async ({ cartItemId, quantity }) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    if (quantity < 1) throw new Error("Quantity cannot be less than 1");
    return { cartItemId, quantity };
});

export const deleteCartItem = createAsyncThunk('cart/deleteItem', async (cartItemId) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    toast.success("Item removed from cart.");
    return cartItemId;
});

// SLICE DEFINITION
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addItemToCart.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
          const { cartItemId, quantity } = action.payload;
          const item = state.items.find(item => item._id === cartItemId);
          if (item) item.quantity = quantity;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
          state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export const { clearCart } = cartSlice.actions;

// SELECTORS
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQty = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state) => {
  return state.cart.items.reduce((total, item) => {
    if (item.productId && typeof item.productId.price === 'number') {
      const itemPrice = pricewithDiscount(item.productId.price, item.productId.discount);
      return total + (item.quantity * itemPrice);
    }
    return total;
  }, 0);
};

export const selectTotalOriginalPrice = (state) => {
    return state.cart.items.reduce((total, item) => {
      if (item.productId && typeof item.productId.price === 'number') {
        return total + (item.quantity * item.productId.price);
      }
      return total;
    }, 0);
};

export default cartSlice.reducer;