
import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, message }) => {
  if (!message) return null;
  return <Alert variant={variant}>{message}</Alert>;
};

export default Message;




