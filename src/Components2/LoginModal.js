// LoginModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { login } from '../Components/actions';
import { useDispatch } from 'react-redux'; // Import useDispatch

const LoginModal = ({
  show,
  handleClose,
  setUsername,
  setShowLoginModal,
  setErrorMessage,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLogin = (e) => {
    e.preventDefault();

    if (name && email && password) {
      setUsername(name);
      dispatch(login({ name, email })); // Dispatch LOGIN action
      setShowLoginModal(false);
      setFormData({ name: "", email: "", password: "" });
      navigate("/todo");
    } else {
      setErrorMessage("Please enter all fields.");
    }
  };

  return (
    <Modal Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onLogin}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default LoginModal;