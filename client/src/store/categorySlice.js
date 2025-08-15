import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { foodCategories } from '../data/mockData';

// ASYNC THUNKS
export const fetchAllCategories = createAsyncThunk('category/fetchCategories', async (_, { rejectWithValue }) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 300));
        return foodCategories.map(cat => ({ _id: `cat_${cat.id}`, name: cat.name, image: cat.image }));
    } catch (error) {
        return rejectWithValue(error.toString());
    }
});

export const createCategory = createAsyncThunk('category/createCategory', async (categoryData, { dispatch, rejectWithValue }) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success("Category created successfully!");
        dispatch(fetchAllCategories()); // Refresh list
        return { ...categoryData, _id: `cat_${Date.now()}` };
    } catch (error) {
        toast.error('Failed to create category.');
        return rejectWithValue(error.toString());
    }
});

export const updateCategory = createAsyncThunk('category/updateCategory', async (categoryData, { dispatch, rejectWithValue }) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success("Category updated successfully!");
        dispatch(fetchAllCategories()); // Refresh list
        return categoryData;
    } catch (error) {
        toast.error('Failed to update category.');
        return rejectWithValue(error.toString());
    }
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (categoryId, { rejectWithValue }) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success("Category deleted successfully!");
        return categoryId; // Return ID for removal from state
    } catch (error) {
        toast.error('Failed to delete category.');
        return rejectWithValue(error.toString());
    }
});

// SLICE DEFINITION
const initialState = {
  list: [],
  status: 'idle',
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.sort((a, b) => a.name.localeCompare(b.name));
      })
      .addCase(fetchAllCategories.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      
      .addCase(createCategory.pending, (state) => { state.status = 'loading'; })
      .addCase(createCategory.fulfilled, (state) => { state.status = 'succeeded'; })
      .addCase(createCategory.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      
      .addCase(updateCategory.pending, (state) => { state.status = 'loading'; })
      .addCase(updateCategory.fulfilled, (state) => { state.status = 'succeeded'; })
      .addCase(updateCategory.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      
      .addCase(deleteCategory.pending, (state) => { state.status = 'loading'; })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = state.list.filter(cat => cat._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; });
  },
});

export const selectAllCategoriesList = (state) => state.categories.list;
export const selectCategoryStatus = (state) => state.categories.status;

export default categorySlice.reducer;