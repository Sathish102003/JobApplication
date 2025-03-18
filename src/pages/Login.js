// src/pages/Login.js
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearMessage } from '../store/authSlice';
import ModalMessage from '../components/ModalMessage';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, message } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  useEffect(() => {
    if (message) setShowModal(true);
  }, [message]);

  const handleClose = () => {
    setShowModal(false);
    dispatch(clearMessage());
    if (user) navigate('/dashboard');
  };

  const handleSubmit = (values) => {
    dispatch(login(values));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h3 className="text-center mb-4">Login</h3>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
              <div className="mb-3">
                <label>Email <span className="text-danger">*</span></label>
                <Field name="email" type="email" className="form-control form-control-sm" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label>Password <span className="text-danger">*</span></label>
                <Field name="password" type="password" className="form-control form-control-sm" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-sm px-4">Login</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>

      <ModalMessage show={showModal} message={message} handleClose={handleClose} />
    </div>
  );
};

export default Login;
