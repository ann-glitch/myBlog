import { useState } from "react";
import axios from "axios";
// import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  // const [redirect, setRedirect] = useState(false);

  const handleInput = (e) => {
    e.preventDefault();
    const { id, value } = e.target;

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5000/api/v1/blogs/login",
      formData
    );

    console.log(res);

    if (res.status === 200) {
      // setRedirect(true);
      window.location = "/";
    } else {
      alert("Couldn't login");
    }

    //for some weird reason, my navigation isn't working so for now i will use the default window.location
    //hence i commented them out.

    // if (redirect) {
    //   // return <Navigate to={"/"} />;
    //   window.location = "/";
    // }
    resetForm();
  };

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
