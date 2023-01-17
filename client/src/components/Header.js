import { Link } from "react-router-dom";

const Header = () => {
  return (
    <main>
      <header>
        <Link to="/" className="logo">
          MyBlog
        </Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
    </main>
  );
};

export default Header;
