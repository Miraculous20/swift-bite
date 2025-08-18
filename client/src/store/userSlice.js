import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { clearCart, fetchCartItems } from './cartSlice';

const getInitialUser = () => {
    try {
        const userString = localStorage.getItem('user');
        if (userString) {
            return JSON.parse(userString);
        }
        return null;
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        return null;
    }
};

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
    async (formData, { rejectWithValue, getState }) => {
        try {
            const response = await Axios.put(SummaryApi.uploadAvatar.url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success(response.data.message);

            const updatedUser = response.data.data;
            const currentUser = getState().user.userDetails;
            const finalUser = { ...currentUser, ...updatedUser };
            localStorage.setItem('user', JSON.stringify(finalUser));

            return updatedUser;
        } catch (error) {
            const message = error.response?.data?.message || "Upload failed.";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

const initialState = {
    userDetails: getInitialUser(),
    status: 'idle', 
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
            .addCase(fetchUserDetails.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userDetails = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state) => {
                state.status = 'idle';
                state.userDetails = null;
            })
            .addCase(loginUser.pending, (state) => { state.status = 'loading'; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userDetails = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => { state.status = 'loading'; state.error = null; })
            .addCase(registerUser.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.userDetails = null;
                state.status = 'idle';
                state.error = null;
            })
            // Cases for uploadAvatar
            .addCase(uploadAvatar.pending, (state) => { state.status = 'loading'; })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.userDetails) {
                    state.userDetails.avatar = action.payload.avatar;
                }
            })
            .addCase(uploadAvatar.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setUserDetails } = userSlice.actions;

export const selectUser = (state) => state.user.userDetails;
export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;
