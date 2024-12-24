import React, { useState, useEffect } from "react";
import { Form, FormControl, Alert } from "react-bootstrap";
import s from "./input.module.scss";

const Input = ({ label, placeholder, required, onChange, value, enter }) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Update internal state when the value prop changes
    setInputValue(value || "");
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Validate and pass data via the onChange prop
    if (/^[A-Za-z0-9]*$/.test(newValue) || newValue === "") {
      setErrorMessage("");
      onChange(newValue); // Pass the updated value back to the parent
    } else {
      setErrorMessage("Please enter alphanumeric characters only.");
      onChange(""); // Send an empty string if validation fails
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      console.log("Enter key pressed with value:", inputValue);

      if (enter) {
        enter(inputValue); // Execute the enter prop method
      }
    }
  };

  return (
    <Form
      className={s.input}
      onSubmit={(e) => e.preventDefault()} // Prevent form submission
    >
      <Form.Group controlId={`form${label}`}>
        <Form.Label>
          {label}
          {required && <span className={s.required}>*</span>}
        </Form.Label>
        <FormControl
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Handle the "Enter" key
          required={required}
        />
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </Form.Group>
    </Form>
  );
};

export default Input;
