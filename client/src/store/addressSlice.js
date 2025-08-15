import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';

// --- Async Thunks ---

// Thunk to create a new user address
export const createAddress = createAsyncThunk(
  'address/create',
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await Axios.post(SummaryApi.createAddress.url, addressData);
      toast.success("Address added successfully!");

      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add address.");
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to update an existing user address
export const updateAddress = createAsyncThunk(
  'address/update',
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`${SummaryApi.updateAddress.url}/${addressData._id}`, addressData);
      toast.success("Address updated successfully!");
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update address.");
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to fetch all user addresses
export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(SummaryApi.getAddress.url);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to delete a user address
export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(`${SummaryApi.deleteAddress.url}/${addressId}`);
      toast.success(response.data.message);
      return addressId; // Return the ID of the deleted address
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete address.");
      return rejectWithValue(error.response.data);
    }
  }
);


// --- Slice Definition ---

const initialState = {
  addresses: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  // ==========================================================
  // >>>>> THIS IS THE FULLY CORRECTED extraReducers BLOCK <<<<<
  // ==========================================================
  extraReducers: (builder) => {
    builder
      // Cases for fetching addresses
      .addCase(fetchAddresses.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })

      // Cases for creating an address
      .addCase(createAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addresses.push(action.payload); // Add the new address to the list
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Cases for updating an address
      .addCase(updateAddress.pending, (state) => {
        state.status = 'loading';

      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.addresses.findIndex(addr => addr._id === action.payload._id);
        if (index !== -1) {
          state.addresses[index] = action.payload; // Update the address in the list
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Case for deleting an address
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (address) => address._id !== action.payload
        );
      });
  },
});

// Selector to get all addresses from the state
export const selectAllAddresses = (state) => state.address.addresses;

export default addressSlice.reducer;