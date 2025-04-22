import { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import {
  FaUser,
  FaShoppingCart,
  FaSignOutAlt,
  FaShoppingBag,
  FaCaretDown,
  FaShoppingBasket,
} from "react-icons/fa";
import Search from "./Search";

export default function Header({ cartItemCount = 0 }) {
  const { user, isAuthenticated, logout } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success("Logged out successfully");
      navigate("/");
    } else {
      toast.error(result.message || "Error logging out");
    }
  };

  return (
    <>
      <div className="announcement-bar">
        <div className="container-fluid px-4">
          <p className="mb-0 text-center">
            Free shipping on all orders over $50! Shop now and save!
          </p>
        </div>
      </div>
      <nav className="navbar">
        <div className="container-fluid px-4 px-lg-5">
          <div className="row align-items-center w-100 no-gutters">
            {/* Logo Section */}
            <div className="col-lg-3 col-md-3 col-6 pr-0">
              <div className="navbar-brand">
                <Link
                  to="/"
                  className="d-flex align-items-center logo-container"
                >
                  <FaShoppingBasket size={28} className="brand-icon" />
                  <div className="brand-text">
                    <span className="brand-text-main">Fusion</span>
                    <span className="brand-text-secondary">Buy</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Search Section */}
            <div className="col-lg-5 col-md-5 col-sm-12 mt-2 mt-md-0 search-column">
              <Search />
            </div>

            {/* User Actions Section */}
            <div className="col-lg-4 col-md-4 col-6 d-flex justify-content-end align-items-center user-actions pl-0">
              <Link to="/cart" className="cart-link ml-auto">
                <div className="d-flex align-items-center">
                  <FaShoppingCart size={20} />
                  <span id="cart" className="ml-2 d-none d-sm-inline">
                    Cart
                  </span>
                  <span className="ml-1" id="cart_count">
                    {cartItemCount}
                  </span>
                </div>
              </Link>

              {isAuthenticated ? (
                <div
                  className="dropdown ml-3 d-inline position-relative"
                  ref={dropdownRef}
                >
                  <button
                    className="btn text-white user-dropdown-btn"
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="d-flex align-items-center">
                      <FaUser size={16} className="mr-2" />
                      <span className="username-text d-none d-sm-inline">
                        {user?.name}
                      </span>
                      <FaCaretDown size={12} className="ml-1" />
                    </div>
                  </button>
                  {isDropdownOpen && (
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        <FaUser className="mr-2" /> Profile
                      </Link>
                      <Link className="dropdown-item" to="/orders">
                        <FaShoppingBag className="mr-2" /> My Orders
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt className="mr-2" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn ml-3 d-inline-flex align-items-center"
                  id="login_btn"
                >
                  <FaUser size={14} className="mr-1" />
                  <span className="d-none d-sm-inline">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
