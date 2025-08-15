import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { clearCart } from './cartSlice';
import { mockOrders, activeOrderDetails } from '../data/mockData';

// ASYNC THUNKS (SIMULATED)
export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOrders;
});

export const fetchOrderDetails = createAsyncThunk('order/fetchOrderDetails', async (orderId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (orderId === activeOrderDetails.orderId) {
        return activeOrderDetails;
    }
    toast.error("Could not find details for this order.");
    return null;
});

export const createCodOrder = createAsyncThunk('order/createCodOrder', async (orderData, { dispatch }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Order placed successfully!");
    dispatch(clearCart());
    return { ...orderData, _id: `newOrder_${Date.now()}` };
});

// FIX: Removed the unused parameter completely from the function signature.
export const createCheckoutSession = createAsyncThunk('order/createCheckoutSession', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Redirecting to payment gateway...");
    return { id: 'cs_test_12345' };
});

// SLICE DEFINITION
const initialState = {
    orders: [],
    currentOrderDetails: null,
    status: 'idle',
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add all your builder cases here...
            .addCase(fetchOrders.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
            .addCase(fetchOrderDetails.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentOrderDetails = action.payload;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
            .addCase(createCodOrder.pending, (state) => { state.status = 'loading'; })
            .addCase(createCodOrder.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(createCodOrder.rejected, (state) => { state.status = 'failed'; })
            .addCase(createCheckoutSession.pending, (state) => { state.status = 'loading'; })
            .addCase(createCheckoutSession.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(createCheckoutSession.rejected, (state) => { state.status = 'failed'; });
    },
});

export const selectAllOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrderDetails;

export default orderSlice.reducer;