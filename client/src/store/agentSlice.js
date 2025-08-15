import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { availableJobsData } from '../data/mockData';

// --- ASYNC THUNKS (Full Implementation) ---

export const registerAgent = createAsyncThunk('agent/register', async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success("Agent registration successful! Please log in.");
        return { success: true };
    } catch (error) {
        toast.error('Agent registration failed.');
        throw error;
    }
});

export const loginAgent = createAsyncThunk('agent/login', async (credentials, { dispatch }) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockAgent = { _id: 'agent007', name: 'James Delivery', email: credentials.email };
        dispatch(setAgentDetails(mockAgent));
        toast.success("Agent login successful!");
        return { success: true, data: mockAgent };
    } catch (error) {
        toast.error('Login failed');
        throw error;
    }
});

export const fetchAgentDetails = createAsyncThunk('agent/fetchDetails', async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return null; // Simulate no agent logged in on initial load
});

export const logoutAgent = createAsyncThunk('agent/logout', async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    toast.success("Logged out successfully");
    return true;
});

export const fetchAvailableJobs = createAsyncThunk('agent/fetchAvailableJobs', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return availableJobsData;
});

export const fetchDeliveryHistory = createAsyncThunk('agent/fetchDeliveryHistory', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return []; // Simulate empty history
});

export const acceptJob = createAsyncThunk('agent/acceptJob', async (jobId, { getState, rejectWithValue }) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 300));
        const { availableJobs } = getState().agent;
        const jobToAccept = availableJobs.find(job => job._id === jobId);
        if (jobToAccept) {
            toast.success(`Job ${jobToAccept.orderId} accepted!`);
            return jobToAccept;
        }
        throw new Error("Job not found");
    } catch (error) {
        toast.error("Failed to accept job.");
        return rejectWithValue(error.toString());
    }
});

export const rejectJob = createAsyncThunk('agent/rejectJob', async (jobId, { rejectWithValue }) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 300));
        toast.error("Job rejected.");
        return jobId; // Return the ID of the job to be removed
    } catch (error) {
        toast.error("Failed to reject job.");
        return rejectWithValue(error.toString());
    }
});

const initialState = {
  agentDetails: null,
  availableJobs: [],
  acceptedJobs: [],
  deliveryHistory: [],
  status: 'idle',
  error: null,
};

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
      setAgentDetails(state, action) {
          state.agentDetails = action.payload;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAgent.pending, (state) => { state.status = 'loading'; })
      .addCase(registerAgent.fulfilled, (state) => { state.status = 'succeeded'; })
      .addCase(registerAgent.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(loginAgent.pending, (state) => { state.status = 'loading'; })
      .addCase(loginAgent.fulfilled, (state) => { state.status = 'succeeded'; })
      .addCase(loginAgent.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      .addCase(fetchAgentDetails.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchAgentDetails.fulfilled, (state, action) => { state.status = 'succeeded'; state.agentDetails = action.payload; })
      .addCase(fetchAgentDetails.rejected, (state) => { state.status = 'idle'; state.agentDetails = null; })
      .addCase(logoutAgent.fulfilled, (state) => {
          state.agentDetails = null;
          state.availableJobs = [];
          state.acceptedJobs = [];
          state.deliveryHistory = [];
          state.status = 'idle';
      })
      .addCase(fetchAvailableJobs.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchAvailableJobs.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.availableJobs = action.payload;
      })
      .addCase(fetchAvailableJobs.rejected, (state) => { state.status = 'failed'; })
      .addCase(fetchDeliveryHistory.fulfilled, (state, action) => {
          state.deliveryHistory = action.payload;
      })
      .addCase(acceptJob.fulfilled, (state, action) => {
          const acceptedJob = action.payload;
          state.availableJobs = state.availableJobs.filter(job => job._id !== acceptedJob._id);
          state.acceptedJobs.push({ ...acceptedJob, status: 'In Progress' });
      })
      .addCase(rejectJob.fulfilled, (state, action) => {
          const rejectedJobId = action.payload;
          state.availableJobs = state.availableJobs.filter(job => job._id !== rejectedJobId);
      });
  },
});

export const { setAgentDetails } = agentSlice.actions;
export const selectAgent = (state) => state.agent.agentDetails;
export const selectAgentStatus = (state) => state.agent.status;
export const selectAgentJobs = createSelector(
    [state => state.agent.availableJobs, state => state.agent.acceptedJobs, state => state.agent.deliveryHistory],
    (availableJobs, acceptedJobs, deliveryHistory) => ({
        availableJobs,
        acceptedJobs,
        deliveryHistory
    })
);

export default agentSlice.reducer;