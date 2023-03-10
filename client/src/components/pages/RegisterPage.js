import { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e) => {
    e.preventDefault();
    const { id, value } = e.target;

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5000/api/v1/auth/register",
      formData
    );

    if (res.request.status === 200) {
      alert("Registered successfully");
    } else {
      alert("Couldn't register");
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="First Name"
        id="firstName"
        value={formData.firstName}
        onChange={handleInput}
      />
      <input
        type="text"
        placeholder="Last Name"
        id="lastName"
        value={formData.lastName}
        onChange={handleInput}
      />
      <input
        type="text"
        placeholder="Username"
        id="username"
        value={formData.username}
        onChange={handleInput}
      />
      <input
        type="password"
        placeholder="Password"
        id="password"
        value={formData.password}
        onChange={handleInput}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInput}
      />
      <button>Register</button>
    </form>
  );
};

export default RegisterPage;
