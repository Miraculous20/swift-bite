import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios'; // Using our configured Axios instance
import SummaryApi from '../common/SummaryApi';
import { clearCart, fetchCartItems } from './cartSlice'; 

export const fetchUserDetails = createAsyncThunk(
    'user/fetchDetails',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await Axios.get(SummaryApi.userDetails.url);
           
            if (response.data.data) {
                dispatch(fetchCartItems());
            }
            return response.data.data; 
        } catch (error) {
            
            return rejectWithValue(null);
        }
    }
);


export const loginUser = createAsyncThunk(
    'user/login', 
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const response = await Axios.post(SummaryApi.login.url, credentials);
            toast.success(response.data.message);
            
           
            localStorage.setItem('user', JSON.stringify(response.data.data));

            dispatch(fetchCartItems());

            return response.data.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);


export const registerUser = createAsyncThunk(
    'user/register', 
    async (userData, { rejectWithValue }) => {
        try {
            const response = await Axios.post(SummaryApi.register.url, userData);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed.';
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);


export const logoutUser = createAsyncThunk(
    'user/logout', 
    async (_, { dispatch, rejectWithValue }) => {
        try {
            await Axios.get(SummaryApi.logout.url);
            

            localStorage.removeItem('user');

            dispatch(clearCart()); 
            toast.success("Logged out successfully");
            return true;
        } catch (error) {
            const message = error.response?.data?.message || 'Logout failed.';
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);


export const uploadAvatar = createAsyncThunk(
    'user/uploadAvatar', 
    async (formData, { rejectWithValue }) => {
        toast.error("Avatar upload not yet implemented with backend.");
        return rejectWithValue("Not implemented");
    }
);

const initialState = {
    userDetails: JSON.parse(localStorage.getItem('user')) || null, 
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails(state, action) {
            state.userDetails = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Cases for fetchUserDetails
            .addCase(fetchUserDetails.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userDetails = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state) => {
                state.status = 'idle';
                state.userDetails = null;
            })
            // Cases for loginUser
            .addCase(loginUser.pending, (state) => { state.status = 'loading'; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userDetails = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Cases for registerUser
            .addCase(registerUser.pending, (state) => { state.status = 'loading'; state.error = null; })
            .addCase(registerUser.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Cases for logoutUser
            .addCase(logoutUser.fulfilled, (state) => {
                state.userDetails = null;
                state.status = 'idle';
                state.error = null;
            });
    },
});

export const { setUserDetails } = userSlice.actions;

export const selectUser = (state) => state.user.userDetails;
export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;
