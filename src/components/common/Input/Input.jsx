import React, { useState, useEffect } from 'react';
import { Form, FormControl, Alert } from 'react-bootstrap';
import s from "./Input.module.scss";

const Input = ({ label, placeholder, required, onChange, value }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [allInputValues, setAllInputValues] = useState([]);

  console.log(inputValue);
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (/^[A-Za-z0-9]*$/.test(value) || value === '') {
      onChange(value);
      setErrorMessage('');
      setAllInputValues(prevValues => [...prevValues, value]);
    } else {
      setErrorMessage('Please enter alphanumeric characters only.');
      onChange('');
    }
  };

  return (
    <Form className={s.input}>
      <Form.Group controlId={`form${label}`}>
        <Form.Label>{label}</Form.Label>
        {required && <span className={s.required}>*</span>}
        <FormControl
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          required={required}
        />
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </Form.Group>
    </Form>
  );
};

export default Input;