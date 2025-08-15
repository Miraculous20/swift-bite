import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { mockEateries, mockMenu } from '../data/mockData'; // CORRECTED PATH

/**
 * --- ASYNC THUNKS for Eatery API Calls ---
 * NOTE: Axios and SummaryApi imports are removed as they are not used in the current mock data setup.
 * When connecting to a real backend, you will need to re-import them.
 */

// Thunk to fetch all eateries for the homepage
export const fetchEateries = createAsyncThunk(
  'eatery/fetchEateries',
  async (_, { rejectWithValue }) => {
    try {
      // --- REAL API CALL (for when backend is ready) ---
      // import Axios from '../utils/Axios';
      // import SummaryApi from '../common/SummaryApi';
      // const response = await Axios.get(SummaryApi.getAllEateries.url);
      // return response.data.data;

      // --- SIMULATION using mock data ---
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      return mockEateries;

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch eateries.");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Thunk to fetch the menu for a single eatery
export const fetchEateryMenu = createAsyncThunk(
  'eatery/fetchEateryMenu',
  async (eateryId, { rejectWithValue }) => {
    try {
      // --- REAL API CALL (for when backend is ready) ---
      // import Axios from '../utils/Axios';
      // import SummaryApi from '../common/SummaryApi';
      // const response = await Axios.get(`${SummaryApi.getEateryMenu.url}/${eateryId}`);
      // return response.data.data;

      // --- SIMULATION using mock data ---
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      // In a real app, the backend would filter by eateryId. Here, we just return the full mock menu.
      return mockMenu;

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch menu.");
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * --- Eatery Slice Definition ---
 */

const initialState = {
  eateries: [],             // List of all eateries
  currentEateryMenu: [],    // The menu of the currently viewed eatery
  status: 'idle',           // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const eaterySlice = createSlice({
  name: 'eatery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducer cases for fetching all eateries
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

      // Reducer cases for fetching a single eatery's menu
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

/**
 * --- EXPORTS ---
 */

// Export selectors for accessing state in components
export const selectAllEateries = (state) => state.eatery.eateries;
export const selectEateryMenu = (state) => state.eatery.currentEateryMenu;
export const selectEateryStatus = (state) => state.eatery.status;

// Export the reducer as the default export
export default eaterySlice.reducer;
