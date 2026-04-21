import { Link } from "react-router-dom";
import { useState } from "react";
import logo from '../assets/marvel-logo.svg';
import { useNavigate } from "react-router-dom";

function Navbar({ search, setSearch }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        return JSON.parse(storedUser);
      }
    } catch (error) {
      console.error("Invalid user in localStorage", error);
    }
    return null;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-4 d-flex align-items-center sticky-top"
      style={{ backgroundColor: "#F0131E" }}
    >

      {/* LOGO */}
      <Link to="/">
        <img src={logo} alt="Marvel Logo" style={{ height: "50px" }} />
      </Link>

      {/* SEARCH */}
      <div className="flex-grow-1 d-flex justify-content-center">
        <input
          type="text"
          placeholder="Search products..."
          className="nav-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="d-flex align-items-center">

        <Link className="btn btn-outline-light mx-2" to="/">
          Home
        </Link>

        {/* HIDE CART FOR ADMIN */}
        {user?.role !== "ROLE_ADMIN" && (
          <Link className="btn btn-outline-light mx-2" to="/cart">
            Cart 🛒
          </Link>
        )}

        {/* ADMIN CONTROLS */}
        {user?.role === "ROLE_ADMIN" && (
          <>
            <Link className="btn btn-warning mx-2" to="/admin-dashboard">
              Orders 📦
            </Link>

            <Link className="btn btn-info mx-2" to="/admin-products">
              Products 🛠️
            </Link>
          </>
        )}

        {/* USER INFO */}
        {user ? (
          <>
            <span className="text-white fw-bold mx-2">
              Welcome {user.name} 👋
            </span>

            <button className="btn btn-dark mx-2" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          
          <>
            {/* LOGIN BUTTON */}
            <button
              className="btn btn-light mx-2 fw-bold"
              onClick={() => navigate("/login")}
              style={{ color: "#F0131E" }}
            >
              Login
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;