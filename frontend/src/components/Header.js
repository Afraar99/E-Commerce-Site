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
  FaRegBell,
  FaMapMarkerAlt,
  FaRegHeart,
  FaExchangeAlt,
  FaUserCog,
  FaHeadset,
  FaGift,
  FaTags,
  FaPercent,
  FaShippingFast,
  FaPhoneAlt,
} from "react-icons/fa";
import Search from "./Search";
import "../styles/components/Header.css";

export default function Header({ cartItemCount = 0 }) {
  const { user, isAuthenticated, logout } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const dropdownRef = useRef(null);
  const dropdownMenuRef = useRef(null);
  const dropdownButtonRef = useRef(null);
  const navigate = useNavigate();

  const announcements = [
    { icon: <FaGift />, text: "Summer Sale! Up to 70% OFF" },
    { icon: <FaShippingFast />, text: "Free shipping on all orders over $50" },
    { icon: <FaPhoneAlt />, text: "Customer service: +1-202-555-0188" },
    {
      icon: <FaTags />,
      text: "Use code WELCOME15 for 15% off your first order",
    },
    { icon: <FaPercent />, text: "Flash Sale! 24 hours only" },
  ];

  // Cycle through announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;

      // Handle announcement bar visibility
      if (currentScrollTop > 100) {
        setAnnouncementVisible(false);
        document.body.classList.remove("has-announcement");
      } else {
        setAnnouncementVisible(true);
        document.body.classList.add("has-announcement");
      }

      // Determine if scrolled past initial threshold
      if (currentScrollTop > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollTop <= 10) {
        // Always visible at the very top
        setIsHeaderVisible(true);
      } else if (currentScrollTop > lastScrollTop && currentScrollTop > 80) {
        // Scrolling down - hide header
        setIsHeaderVisible(false);
      } else if (currentScrollTop < lastScrollTop) {
        // Scrolling up - show header
        setIsHeaderVisible(true);
      }

      setLastScrollTop(currentScrollTop);
    };

    // Initialize body class
    document.body.classList.add("has-announcement");

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("has-announcement");
    };
  }, [lastScrollTop]);

  // Ensure dropdown is positioned correctly
  useEffect(() => {
    if (isDropdownOpen && dropdownMenuRef.current) {
      const rect = dropdownMenuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Check if dropdown is out of viewport on the right
      if (rect.right > viewportWidth) {
        dropdownMenuRef.current.style.right = "0";
        dropdownMenuRef.current.style.left = "auto";
      }
    }
  }, [isDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        dropdownButtonRef.current !== event.target &&
        !dropdownButtonRef.current?.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    // Close dropdown when pressing Escape key
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success("Logged out successfully");
      // Redirect to logout success page instead of home
      navigate("/logout-success");
    } else {
      toast.error(result.message || "Error logging out");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className={`site-header ${isHeaderVisible ? "visible" : "hidden"}`}>
      {/* Announcement bar that's only visible at the top */}
      <div
        className={`announcement-bar ${
          announcementVisible ? "visible" : "hidden"
        }`}
      >
        <div className="announcement-slider">
          <div className="announcement-content">
            <span className="announcement-icon">
              {announcements[announcementIndex].icon}
            </span>
            <span className="announcement-text">
              {announcements[announcementIndex].text}
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className={`main-header-wrapper ${isScrolled ? "scrolled" : ""}`}>
        <nav className="main-header">
          <div className="container-fluid px-4">
            <div className="header-inner">
              {/* Logo Section */}
              <div className="header-logo">
                <Link to="/" className="logo-link">
                  <FaShoppingBasket className="brand-icon" />
                  <div className="brand-text">
                    <span className="brand-text-main">Fusion</span>
                    <span className="brand-text-secondary">Buy</span>
                  </div>
                </Link>
              </div>

              {/* Search Section */}
              <div className="header-search">
                <Search />
              </div>

              {/* User Actions */}
              <div className="header-actions">
                <Link to="/cart" className="action-button cart-button">
                  <div className="action-icon-wrapper">
                    <FaShoppingCart className="action-icon" />
                    <span className="action-count">{cartItemCount}</span>
                  </div>
                  <span className="action-text">Cart</span>
                </Link>

                {isAuthenticated ? (
                  <div className="dropdown-wrapper" ref={dropdownRef}>
                    <button
                      ref={dropdownButtonRef}
                      className="action-button user-button"
                      onClick={toggleDropdown}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                    >
                      <div className="action-icon-wrapper">
                        <FaUser className="action-icon" />
                      </div>
                      <div className="action-content">
                        <span className="action-text">My Account</span>
                        <span className="user-name">{user?.name}</span>
                      </div>
                      <FaCaretDown
                        className={`dropdown-arrow ${
                          isDropdownOpen ? "rotated" : ""
                        }`}
                      />
                    </button>

                    <div
                      ref={dropdownMenuRef}
                      className={`dropdown-menu ${
                        isDropdownOpen ? "show" : ""
                      }`}
                    >
                      <div className="dropdown-header">
                        <span className="welcome-text">
                          Hello, {user?.name?.split(" ")[0]}
                        </span>
                      </div>
                      <div className="dropdown-body">
                        <Link
                          className="dropdown-item"
                          to="/profile"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FaUser className="dropdown-icon" /> My Profile
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="/orders"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FaShoppingBag className="dropdown-icon" /> My Orders
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="/wishlist"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FaRegHeart className="dropdown-icon" /> Wishlist
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="/notifications"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FaRegBell className="dropdown-icon" /> Notifications
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="/settings"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FaUserCog className="dropdown-icon" /> Account
                          Settings
                        </Link>
                      </div>
                      <div className="dropdown-footer">
                        <button
                          className="logout-button"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            handleLogout();
                          }}
                        >
                          <FaSignOutAlt className="dropdown-icon" /> Logout
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to="/login" className="action-button login-button">
                    <div className="action-icon-wrapper">
                      <FaUser className="action-icon" />
                    </div>
                    <span className="action-text">Login / Register</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
