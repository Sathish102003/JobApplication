// src/pages/Register.js
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearMessage } from '../store/authSlice';
import ModalMessage from '../components/ModalMessage';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  useEffect(() => {
    if (message) setShowModal(true);
  }, [message]);

  const handleClose = () => {
    setShowModal(false);
    dispatch(clearMessage());
    if (message === 'Registration successful.') navigate('/');
  };

  const handleSubmit = (values) => {
    dispatch(register(values));
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Register</h3>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div className="row mb-3">
            <div className="col-md-4">
              <label>First Name <span className="text-danger">*</span></label>
              <Field name="firstName" className="form-control form-control-sm" />
              <ErrorMessage name="firstName" component="div" className="text-danger" />
            </div>
            <div className="col-md-4">
              <label>Last Name <span className="text-danger">*</span></label>
              <Field name="lastName" className="form-control form-control-sm" />
              <ErrorMessage name="lastName" component="div" className="text-danger" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label>Email <span className="text-danger">*</span></label>
              <Field name="email" type="email" className="form-control form-control-sm" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="col-md-4">
              <label>Password <span className="text-danger">*</span></label>
              <Field name="password" type="password" className="form-control form-control-sm" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <div className="col-md-4">
              <label>Confirm Password <span className="text-danger">*</span></label>
              <Field name="confirmPassword" type="password" className="form-control form-control-sm" />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-sm px-4">Register</button>
          </div>
        </Form>
      </Formik>

      <ModalMessage show={showModal} message={message} handleClose={handleClose} />
    </div>
  );
};

export default Register;
