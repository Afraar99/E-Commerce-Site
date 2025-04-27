import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import {
  FaLock,
  FaEnvelope,
  FaUser,
  FaGoogle,
  FaFacebook,
  FaShoppingBag,
  FaShieldAlt,
  FaUserFriends,
  FaSignInAlt,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useContext(UserContext);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    const result = await register({
      name,
      email,
      password,
    });

    setLoading(false);

    if (result.success) {
      toast.success("Registration successful!");
      navigate("/");
    } else {
      toast.error(result.message || "Registration failed");
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-side auth-form-side">
          <div className="auth-form-wrapper">
            <div className="auth-logo">
              <FaShoppingBag className="auth-logo-icon" />
              <span>FusionBuy</span>
            </div>

            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">
              Join FusionBuy to start your shopping journey
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name_field" className="form-label">
                  Full Name
                </label>
                <div className="input-with-icon">
                  <div className="input-icon-wrapper">
                    <FaUser className="input-icon" />
                  </div>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    placeholder="Mohamed Afraar"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email_field" className="form-label">
                  Email Address
                </label>
                <div className="input-with-icon">
                  <div className="input-icon-wrapper">
                    <FaEnvelope className="input-icon" />
                  </div>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    placeholder="your@email.com"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password_field" className="form-label">
                  Password
                </label>
                <div className="input-with-icon">
                  <div className="input-icon-wrapper">
                    <FaLock className="input-icon" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password_field"
                    className="form-control"
                    placeholder="••••••••"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    tabIndex="-1"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash className="password-toggle-icon" />
                    ) : (
                      <FaEye className="password-toggle-icon" />
                    )}
                  </button>
                </div>
                <small className="password-hint">
                  Must be at least 6 characters long
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="confirm_password_field" className="form-label">
                  Confirm Password
                </label>
                <div className="input-with-icon">
                  <div className="input-icon-wrapper">
                    <FaLock className="input-icon" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm_password_field"
                    className="form-control"
                    placeholder="••••••••"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={toggleConfirmPasswordVisibility}
                    tabIndex="-1"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="password-toggle-icon" />
                    ) : (
                      <FaEye className="password-toggle-icon" />
                    )}
                  </button>
                </div>
              </div>

              <button
                id="register_button"
                type="submit"
                className="btn auth-btn"
                disabled={loading}
              >
                {loading ? (
                  <div className="auth-btn-content">
                    <span className="auth-btn-loader"></span>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="auth-btn-content">
                    <span>SIGN UP</span>
                    <FaArrowRight className="auth-btn-icon" />
                  </div>
                )}
              </button>

              <div className="auth-separator">
                <span>OR</span>
              </div>

              <div className="social-login">
                <button type="button" className="btn google-btn">
                  <FaGoogle className="social-icon" /> Continue with Google
                </button>
                <button type="button" className="btn facebook-btn">
                  <FaFacebook className="social-icon" /> Continue with Facebook
                </button>
              </div>

              <div className="register-prompt">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="register-link">
                    <FaSignInAlt className="register-icon" /> Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div
          className="auth-side auth-image-side"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(${process.env.PUBLIC_URL}/images/register-bg.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="auth-benefits register-benefits">
            <div className="benefit-item">
              <div className="benefit-icon">
                <FaShieldAlt />
              </div>
              <div className="benefit-text">
                <h3>Secure Shopping</h3>
                <p>
                  Your data is protected with advanced encryption technology
                </p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <FaUserFriends />
              </div>
              <div className="benefit-text">
                <h3>Join Our Community</h3>
                <p>Connect with millions of shoppers around the world</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <FaShoppingBag />
              </div>
              <div className="benefit-text">
                <h3>Exclusive Access</h3>
                <p>Be the first to know about new arrivals and flash sales</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
