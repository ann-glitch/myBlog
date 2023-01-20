import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";

import { UserContext } from "./contexts/UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  const getProfile = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/v1/auth/profile",
      { withCredentials: true }
    );
    console.log(response.data);
    setUserInfo(response.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const logout = async () => {
    await axios.get("http://localhost:5000/api/v1/auth/logout", {
      withCredentials: true,
    });

    setUserInfo(null);
  };

  const username = userInfo?.username;

  return (
    <main>
      <header>
        <Link to="/" className="logo">
          MyBlog
        </Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <a href="/login" onClick={logout}>
                Logout
              </a>
            </>
          )}
          {!username && (
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
