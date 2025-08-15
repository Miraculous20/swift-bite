import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
// FIX: Removed 'mockMenu' as it was not being used in this file.
import { foodCategories } from '../data/mockData';

// ASYNC THUNKS
export const fetchCategories = createAsyncThunk('product/fetchCategories', async (_, { rejectWithValue }) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 200));
        // Use the mock data for categories
        return foodCategories.map(cat => ({ _id: `cat_${cat.id}`, name: cat.name, image: cat.image }));
    } catch (error) { return rejectWithValue({ message: 'Failed to fetch categories' }); }
});

export const fetchSubCategories = createAsyncThunk('product/fetchSubCategories', async (_, { rejectWithValue }) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 200));
        // Returning an empty array as there's no mock data for sub-categories yet
        return [];
    } catch (error) { return rejectWithValue({ message: 'Failed to fetch sub-categories' }); }
});

export const createProduct = createAsyncThunk('product/createProduct', async (productData, { rejectWithValue }) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success("Product created successfully (simulated)!");
        // Return a new product object with a unique ID
        return { ...productData, _id: `prod_${Date.now()}` };
    } catch (error) {
        toast.error('Failed to create product.');
        return rejectWithValue({ message: 'Simulation Error' });
    }
});

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Product deleted successfully (simulated)!");
      // Return the deleted product's ID to allow for easy removal from the UI state
      return productId;
    } catch (error) {
      toast.error('Failed to delete product.');
      return rejectWithValue({ message: 'Simulation Error' });
    }
  }
);

// SLICE DEFINITION
const initialState = {
    allCategory: [],
    allSubCategory: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.allCategory = action.payload;
            })
            .addCase(fetchSubCategories.fulfilled, (state, action) => {
                state.allSubCategory = action.payload;
            })
            .addCase(createProduct.pending, (state) => { state.status = 'loading'; })
            .addCase(createProduct.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(createProduct.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
            
            .addCase(deleteProduct.pending, (state) => { state.status = 'loading'; })
            .addCase(deleteProduct.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(deleteProduct.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; });
    },
});

export const selectAllCategories = (state) => state.product.allCategory;
export const selectAllSubCategories = (state) => state.product.allSubCategory;

export default productSlice.reducer;