import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import {
  FaLock,
  FaEnvelope,
  FaUserPlus,
  FaGoogle,
  FaFacebook,
  FaShoppingBag,
  FaCreditCard,
  FaTags,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);

    setLoading(false);

    if (result.success) {
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error(result.message || "Login failed");
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">
              Sign in to continue your shopping experience
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="password-label-row">
                  <label htmlFor="password_field" className="form-label">
                    Password
                  </label>
                  <Link to="/password/forgot" className="forgot-password-link">
                    Forgot Password?
                  </Link>
                </div>
                <div className="input-with-icon">
                  <div className="input-icon-wrapper">
                    <FaLock className="input-icon" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password_field"
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
              </div>

              <div className="form-group form-footer">
                <div className="custom-checkbox">
                  <input type="checkbox" id="remember_me" />
                  <label htmlFor="remember_me">Remember me</label>
                </div>
              </div>

              <button
                id="login_button"
                type="submit"
                className="btn auth-btn"
                disabled={loading}
              >
                {loading ? (
                  <div className="auth-btn-content">
                    <span className="auth-btn-loader"></span>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="auth-btn-content">
                    <span>SIGN IN</span>
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
                  New to FusionBuy?{" "}
                  <Link to="/register" className="register-link">
                    <FaUserPlus className="register-icon" /> Create Account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div
          className="auth-side auth-image-side"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(${process.env.PUBLIC_URL}/images/login-bg.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="auth-benefits">
            <div className="benefit-item">
              <div className="benefit-icon">
                <FaShoppingBag />
              </div>
              <div className="benefit-text">
                <h3>Exclusive Deals</h3>
                <p>
                  Access member-only offers and personalized recommendations
                </p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <FaCreditCard />
              </div>
              <div className="benefit-text">
                <h3>Faster Checkout</h3>
                <p>Save your details for quick and secure purchases</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <FaTags />
              </div>
              <div className="benefit-text">
                <h3>Special Discounts</h3>
                <p>Enjoy up to 70% off on premium brands</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
