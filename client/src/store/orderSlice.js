import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axios from 'axios';
import { clearCart } from './cartSlice';

const getToken = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
        const user = JSON.parse(userString);
        return user?.token;
    }
    return null;
};


export const fetchOrders = createAsyncThunk(
    'order/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue('No token found, please log in.');
            
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get('/api/orders', config);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);


export const fetchOrderDetails = createAsyncThunk(
    'order/fetchOrderDetails',
    async (orderId, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue('No token found, please log in.');

            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get(`/api/orders/${orderId}`, config);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);


export const createCodOrder = createAsyncThunk(
    'order/createCodOrder',
    async (orderData, { dispatch, rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue('No token found, please log in.');

            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.post('/api/orders/cash-on-delivery', orderData, config);
            
            toast.success("Order placed successfully!");
            dispatch(clearCart());
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);


export const createCheckoutSession = createAsyncThunk(
    'order/createCheckoutSession',
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue('No token found, please log in.');

            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.post('/api/orders/checkout-session', {}, config);
            

            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);


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
            // Fetch All Orders
            .addCase(fetchOrders.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
          
            .addCase(fetchOrderDetails.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentOrderDetails = action.payload;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
          
            .addCase(createCodOrder.pending, (state) => { state.status = 'loading'; })
            .addCase(createCodOrder.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(createCodOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            
            .addCase(createCheckoutSession.pending, (state) => { state.status = 'loading'; })
            .addCase(createCheckoutSession.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(createCheckoutSession.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const selectAllOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrderDetails;

export default orderSlice.reducer;
