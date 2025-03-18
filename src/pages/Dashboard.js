// src/pages/Dashboard.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchJobs,
  deleteJob,
  updateJobStatus,
  clearJobMessage,
} from '../store/jobSlice';
import Message from '../components/Message';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { jobs, message } = useSelector((state) => state.jobs);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      dispatch(fetchJobs());
    }
  }, [user, dispatch, navigate]);

  // Clear messages after few seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearJobMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateJobStatus({ id, status: newStatus }));
  };

  const handleDelete = (id) => {
    dispatch(deleteJob(id));
  };

  // Calculate summary stats
  const totalJobs = jobs.length;
  const jobsLast30Days = jobs.filter((job) => {
    const jobDate = new Date(job.date);
    const today = new Date();
    const diffDays = Math.floor((today - jobDate) / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  }).length;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Job Applications Dashboard</h2>

      {/* Display message if any */}
      {message && <Message message={message} />}

      {jobs.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Company Name</th>
              <th>JobTitle</th>
              <th>Application Status</th>
              <th>AppliedDate</th>
              <th>InterviewDate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.companyName}</td>
                <td>{job.jobTitle}</td>
                <td>
                  <select
                    className="form-select"
                    value={job.applicationStatus}
                    onChange={(e) =>
                      handleStatusChange(job.id, e.target.value)
                    }
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>
                </td>
                <td>{job.appliedDate}</td>
                <td>{job.interviewDate}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => navigate(`/edit/${job.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Summary Cards - Added Below Existing Code */}
{/*      <div className="mt-5">
        <div className="p-3 mb-3 bg-light border rounded" style={{ maxWidth: '300px' }}>
          <strong>Past Thirty Days</strong> &nbsp;&nbsp; {jobsLast30Days}
        </div>
        <div className="p-3 bg-light border rounded" style={{ maxWidth: '300px' }}>
          <strong>Total Jobs Created</strong> &nbsp;&nbsp; {totalJobs}
        </div>
      </div>*/}
    </div>
  );
};

export default Dashboard;
