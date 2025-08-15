import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// NEW: Thunk for handling eatery registration
export const registerEatery = createAsyncThunk(
    'eateryAdmin/register',
    async (eateryData, { rejectWithValue }) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Registration submitted successfully!");
            // In a real backend, you would get back the new eatery/admin data
            return { success: true, data: eateryData };
        } catch (error) {
            toast.error("Registration failed. Please try again.");
            return rejectWithValue(error.toString());
        }
    }
);

export const loginEateryAdmin = createAsyncThunk(
    'eateryAdmin/login',
    async (credentials, { dispatch }) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success("Eatery Admin login successful!");
        const mockAdmin = {
            _id: 'eateryAdmin123',
            name: 'Mr. Okon',
            email: credentials.email,
            eateryName: 'The Bukka Hut',
            eateryId: 'eatery001',
            role: 'EATERY_ADMIN',
        };
        dispatch(setEateryAdminDetails(mockAdmin));
        return { success: true, data: mockAdmin };
    }
);

export const logoutEateryAdmin = createAsyncThunk(
    'eateryAdmin/logout',
    async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
        toast.success("Logged out successfully");
        return true;
    }
);

const initialState = {
    eateryAdminDetails: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const eateryAdminSlice = createSlice({
    name: 'eateryAdmin',
    initialState,
    reducers: {
        setEateryAdminDetails(state, action) {
            state.eateryAdminDetails = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Add cases for new register thunk
            .addCase(registerEatery.pending, (state) => { state.status = 'loading'; })
            .addCase(registerEatery.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(registerEatery.rejected, (state) => { state.status = 'failed'; })

            .addCase(loginEateryAdmin.pending, (state) => { state.status = 'loading'; })
            .addCase(loginEateryAdmin.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(loginEateryAdmin.rejected, (state) => { state.status = 'failed'; })
            .addCase(logoutEateryAdmin.fulfilled, (state) => {
                state.eateryAdminDetails = null;
                state.status = 'idle';
            });
    },
});

export const { setEateryAdminDetails } = eateryAdminSlice.actions;

export const selectEateryAdmin = (state) => state.eateryAdmin.eateryAdminDetails;
export const selectEateryAdminStatus = (state) => state.eateryAdmin.status;

export default eateryAdminSlice.reducer;