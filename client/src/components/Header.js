import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);

  const getProfile = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/v1/blogs/profile",
      { withCredentials: true }
    );
    console.log(response.data);
    setUserInfo(response.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const logout = async () => {
    await axios.get("http://localhost:5000/api/v1/blogs/logout", {
      withCredentials: true,
    });

    setUserInfo(null);
  };

  return (
    <main>
      <header>
        <Link to="/" className="logo">
          MyBlog
        </Link>
        <nav>
          {userInfo && (
            <>
              <Link to="/create">Create new post</Link>
              <a href="/login" onClick={logout}>
                Logout
              </a>
            </>
          )}
          {!userInfo && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </main>
  );
};

export default Header;
