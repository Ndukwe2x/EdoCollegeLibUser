import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

// Fetch all study plans
export const fetchStudyPlan = createAsyncThunk(
  'studyPlan/fetchStudyPlan', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/studyplan/");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get a single study plan
export const getStudyPlan = createAsyncThunk(
  'studyPlan/getStudyPlan', 
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/studyplan/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add a new study plan
export const addStudyPlan = createAsyncThunk(
  'studyPlan/addStudyPlan', 
  async (plan, { rejectWithValue }) => {
    try {
      const response = await api.post('/studyplan/', plan);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a specific study plan
export const deleteStudyPlan = createAsyncThunk(
  'studyPlan/deleteStudyPlan', 
  async (planId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/studyplan/${planId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete all study plans for a student
export const deleteAllStudyPlans = createAsyncThunk(
  'studyPlan/deleteAllStudyPlans', 
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/studyplan/deleteAll/${studentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  studyPlans: [],
  loading: false,
  selectedPlan: null,
  error: null,
};

const studyPlanSlice = createSlice({
  name: 'studyPlan',
  initialState,
  reducers: {
    // addToStudyPlan: (state, action) => {
    //     state.studyPlans.push(action.payload);  // Update the search query state
    //   },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchStudyPlan
      .addCase(fetchStudyPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudyPlan.fulfilled, (state, action) => {
        state.studyPlans = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudyPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getStudyPlan
      .addCase(getStudyPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudyPlan.fulfilled, (state, action) => {
        state.selectedPlan = action.payload;
        state.loading = false;
      })
      .addCase(getStudyPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle addStudyPlan
      .addCase(addStudyPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStudyPlan.fulfilled, (state, action) => {
        state.studyPlans.push(action.payload);
        state.loading = false;
      })
      .addCase(addStudyPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleteStudyPlan
      .addCase(deleteStudyPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudyPlan.fulfilled, (state, action) => {
        state.studyPlans = state.studyPlans.filter(plan => plan.id !== action.meta.arg);
        state.loading = false;
      })
      .addCase(deleteStudyPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleteAllStudyPlans
      .addCase(deleteAllStudyPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllStudyPlans.fulfilled, (state) => {
        state.studyPlans = [];
        state.loading = false;
      })
      .addCase(deleteAllStudyPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
// export const {addToStudyPlans} = studyPlanSlice.actions
export default studyPlanSlice.reducer;
