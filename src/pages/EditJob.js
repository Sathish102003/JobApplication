import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateJob, fetchJobs, clearJobMessage } from '../store/jobSlice';
import Message from '../components/Message';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs, message } = useSelector((state) => state.jobs);

  const [formData, setFormData] = useState({
    companyName: '',
    applicationStatus: '',
    jobTitle: '',
    appliedDate: '',
    interviewDate: '',
  });

  useEffect(() => {
    if (jobs.length === 0) dispatch(fetchJobs());
  }, [dispatch, jobs]);

  useEffect(() => {
    const job = jobs.find((j) => j.id === parseInt(id));
    if (job) setFormData(job);
  }, [jobs, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateJob({ id, data: formData }));
    setTimeout(() => {
      dispatch(clearJobMessage());
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="container mt-4">
      <h2>Edit Job</h2>
      {message && <Message message={message} />}

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Company</label>
          <input
            type="text"
            className="form-control"
            name="company"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>JobTitle</label>
          <input
            type="text"
            className="form-control"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Application Status</label>
          <select
            className="form-select"
            name="applicationStatus"
            value={formData.applicationStatus}
            onChange={handleChange}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="mb-3">
          <label>AppliedDate</label>
          <input
            type="text"
            className="form-control"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label>InterviewDate</label>
          <input
            type="text"
            className="form-control"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default EditJob;
