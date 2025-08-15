import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { clearCart } from './cartSlice';

// ASYNC THUNKS
export const fetchUserDetails = createAsyncThunk('user/fetchDetails',
    async (_, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 200));
            // In a real app, a token would be sent to the backend.
            // Here, we simulate that no user is logged in on initial load.
            return null; 
        } catch (error) {
            return rejectWithValue({ message: 'Session check failed' });
        }
    }
);

export const loginUser = createAsyncThunk('user/login', async (credentials, { dispatch, rejectWithValue }) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success("Login successful!");
        const mockUser = {
            _id: '',
            name: '',
            email: credentials.email,
            // --- CHANGE TO 'ADMIN' TO TEST ADMIN FEATURES ---
            role: 'USER', 
            avatar: 'https://i.pravatar.cc/150?u=user123'
        };
        dispatch(setUserDetails(mockUser));
        return { success: true, data: mockUser };
    } catch (error) {
        toast.error('Login failed');
        return rejectWithValue({ message: 'Invalid credentials' });
    }
});

export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success("Registration successful! Please log in.");
        return { success: true };
    } catch (error) {
        toast.error('Registration failed.');
        return rejectWithValue({ message: 'Simulation Error' });
    }
});

export const logoutUser = createAsyncThunk('user/logout', async (_, { dispatch, rejectWithValue }) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 200));
        dispatch(clearCart()); // Clear cart on logout
        toast.success("Logged out successfully");
        return true;
    } catch (error) {
        toast.error('Logout failed.');
        return rejectWithValue({ message: 'Simulation Error' });
    }
});

export const uploadAvatar = createAsyncThunk('user/uploadAvatar', async (formData, { dispatch, getState, rejectWithValue }) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Avatar updated successfully (simulated)!");
        
        // In a real app, the server returns the new URL. We simulate one here.
        const newAvatarUrl = `https://i.pravatar.cc/150?u=${Date.now()}`;
        const currentUser = getState().user.userDetails;

        dispatch(setUserDetails({ ...currentUser, avatar: newAvatarUrl }));
        return { avatar: newAvatarUrl };
    } catch (error) {
        toast.error('Upload failed.');
        return rejectWithValue({ message: 'Simulation Error' });
    }
});

// SLICE DEFINITION
const initialState = {
    userDetails: null,
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
            .addCase(fetchUserDetails.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userDetails = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.status = 'idle';
                state.userDetails = null;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => { state.status = 'loading'; state.error = null; })
            .addCase(loginUser.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(loginUser.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
            .addCase(registerUser.pending, (state) => { state.status = 'loading'; state.error = null; })
            .addCase(registerUser.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(registerUser.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
            .addCase(logoutUser.fulfilled, (state) => {
                state.userDetails = null;
                state.status = 'idle';
                state.error = null;
            })
            .addCase(uploadAvatar.pending, (state) => { state.status = 'loading'; })
            .addCase(uploadAvatar.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(uploadAvatar.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; });
    },
});

export const { setUserDetails } = userSlice.actions;

export const selectUser = (state) => state.user.userDetails;
export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;