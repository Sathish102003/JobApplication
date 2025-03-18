// jobService.js
import axios from 'axios';

const API_URL = 'http://localhost:5156/api/JobApplications';

export const getJobs = (email) => axios.get(API_URL +"?email=" + email, { withCredentials: true });

export const createJob = (jobData) => axios.post(API_URL, jobData , { withCredentials: true });

export const deleteJobById = (id) => axios.delete(`${API_URL}/${id}`, { withCredentials: true });

export const updateJobStatus = (id, status) =>
  axios.patch(`${API_URL}/${id}`, { status }, { withCredentials: true });

export const updateJob = (id, data) =>
  axios.put(API_URL, data, { withCredentials: true });
