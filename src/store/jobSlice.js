import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as jobService from '../services/jobService';

// src/store/jobSlice.js
export const fetchJobs = createAsyncThunk('jobs/fetch', async (email) => {
  const res = await jobService.getJobs(email);
  return res.data;
});


export const addJob = createAsyncThunk('jobs/add', async (jobData) => {
  const res = await jobService.createJob(jobData);
  return res.data;
});

export const deleteJob = createAsyncThunk('jobs/delete', async (id) => {
  await jobService.deleteJobById(id);
  return id;
});

export const updateJobStatus = createAsyncThunk(
  'jobs/updateStatus',
  async ({ id, status }) => {
    const res = await jobService.updateJobStatus(id, status);
    return res.data;
  }
);

export const updateJob = createAsyncThunk(
  'jobs/update',
  async ({ id, data }) => {
    const res = await jobService.updateJob(id, data);
    return res.data;
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    message: null,
  },
  reducers: {
    clearJobMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
        state.message = 'Job added successfully';
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((j) => j.id !== action.payload);
        state.message = 'Job deleted successfully';
      })
      .addCase(updateJobStatus.fulfilled, (state, action) => {
        const index = state.jobs.findIndex((j) => j.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index].status = action.payload.status;
          state.message = 'Status updated';
        }
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex((j) => j.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
          state.message = 'Job updated';
        }
      });
  },
});

export const { clearJobMessage } = jobSlice.actions;
export default jobSlice.reducer;

