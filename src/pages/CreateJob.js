// src/pages/CreateJob.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJob, clearJobMessage } from '../store/jobSlice';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';

const CreateJob = () => {
  const [companyName, setCompanyName] = useState('');
  const [customCompany, setCustomCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [applicationStatus, setApplicationStatus] = useState('Applied');
  const [appliedDate, setAppliedDate] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [userId, setUserId] = useState('');
  const [notes, setNotes] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.jobs);

  const isOtherSelected = companyName === 'Other';

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => dispatch(clearJobMessage()), 3000);
    return () => clearTimeout(timer);
  }, [message, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCompany = companyName === 'Other' ? customCompany : companyName;
    dispatch(addJob({ companyName: finalCompany, jobTitle, applicationStatus, appliedDate, interviewDate, userId, notes }));
    navigate('/dashboard');
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Create Job Application</h3>
      <Message message={message} />
      <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-light">
        {/* Company field with inline select and input */}
        <div className="mb-3">
          <label className="form-label d-block">Company Name</label>
          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              style={{ maxWidth: '200px' }}
            >
              <option value="">Select Company</option>
              <option value="Wipro">Wipro</option>
              <option value="Cognizant">Cognizant</option>
              <option value="TCS">TCS</option>
              <option value="Infosys">Infosys</option>
              <option value="Other">Other</option>
            </select>
            {isOtherSelected && (
              <input
                type="text"
                className="form-control"
                placeholder="Enter company name"
                value={customCompany}
                onChange={(e) => setCustomCompany(e.target.value)}
                required
                style={{ flex: 1 }}
              />
            )}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            className="form-control"
            placeholder="Enter Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Application Status</label>
          <select
            className="form-select"
            value={applicationStatus}
            onChange={(e) => setApplicationStatus(e.target.value)}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">AppliedDate (dd/mm/yyyy)</label>
          <input
            type="date"
            className="form-control"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">InterviewDate (dd/mm/yyyy)</label>
          <input
              type="date"
              className="form-control"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
