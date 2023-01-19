import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);

  //handle input
  const handleInput = (e) => {
    e.preventDefault();
    const { id, value } = e.target;

    setFormData({ ...formData, [id]: value });
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5000/api/v1/blogs/login",
      formData,
      { withCredentials: true }
    );

    if (res.status === 200) {
      setRedirect(true);
    } else {
      alert("Couldn't login");
    }
    resetForm();
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  //reset form func.
  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
    });
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Login</h1>
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
      <button>Login</button>
    </form>
  );
};

export default LoginPage;
