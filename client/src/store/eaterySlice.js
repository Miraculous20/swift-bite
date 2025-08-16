import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { mockEateries, mockMenu } from '../data/mockData'; // CORRECTED PATH

export const fetchEateries = createAsyncThunk(
  'eatery/fetchEateries',
  async (_, { rejectWithValue }) => {
    try {

      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      return mockEateries;

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch eateries.");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchEateryMenu = createAsyncThunk(
  'eatery/fetchEateryMenu',
  async (eateryId, { rejectWithValue }) => {
    try {

      await new Promise(resolve => setTimeout(resolve, 500)); 
      return mockMenu;

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch menu.");
      return rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  eateries: [],            
  currentEateryMenu: [],    
  status: 'idle',          
  error: null,
};

const eaterySlice = createSlice({
  name: 'eatery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEateries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEateries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.eateries = action.payload;
      })
      .addCase(fetchEateries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchEateryMenu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEateryMenu.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentEateryMenu = action.payload;
      })
      .addCase(fetchEateryMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectAllEateries = (state) => state.eatery.eateries;
export const selectEateryMenu = (state) => state.eatery.currentEateryMenu;
export const selectEateryStatus = (state) => state.eatery.status;

export default eaterySlice.reducer;
