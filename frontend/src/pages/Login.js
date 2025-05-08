import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import {
  FaLock,
  FaEnvelope,
  FaGoogle,
  FaFacebook,
  FaShoppingBag,
  FaTags,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaRegCheckCircle,
  FaShieldAlt,
  FaApple,
} from "react-icons/fa";
import "../styles/pages/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      navigate("/");
    }

    // Check for saved email
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Handle remember me
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

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
    <div className="auth-page login-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-content">
            <div className="auth-header">
              <Link to="/" className="auth-logo">
                <FaShoppingBag className="logo-icon" />
                <span className="logo-text">FusionBuy</span>
              </Link>
              <h1>Welcome Back</h1>
              <p>Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-group">
                  <span className="input-icon">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="label-row">
                  <label htmlFor="password">Password</label>
                  <Link to="/password/forgot" className="forgot-link">
                    Forgot Password?
                  </Link>
                </div>
                <div className="input-group">
                  <span className="input-icon">
                    <FaLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span className="checkbox-custom"></span>
                  <span>Remember me</span>
                </label>
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    Sign In <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="auth-separator">
              <span>Or continue with</span>
            </div>

            <div className="social-logins">
              <button className="social-btn google-btn">
                <FaGoogle /> Google
              </button>
              <button className="social-btn facebook-btn">
                <FaFacebook /> Facebook
              </button>
              <button className="social-btn apple-btn">
                <FaApple /> Apple
              </button>
            </div>

            <div className="register-prompt">
              <p>
                Don't have an account?{" "}
                <Link to="/register">Create an account</Link>
              </p>
            </div>
          </div>

          <div className="auth-sidebar">
            <div className="sidebar-content">
              <div className="sidebar-header">
                <h2>Benefits of joining</h2>
                <p>Unlock premium features with your account</p>
              </div>

              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <FaShoppingBag />
                  </div>
                  <div className="benefit-text">
                    <h3>Faster Checkout</h3>
                    <p>
                      Save your shipping and payment details for quick checkout
                    </p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <FaRegCheckCircle />
                  </div>
                  <div className="benefit-text">
                    <h3>Order Tracking</h3>
                    <p>Monitor your orders and delivery status in real-time</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <FaTags />
                  </div>
                  <div className="benefit-text">
                    <h3>Exclusive Deals</h3>
                    <p>
                      Access special offers and personalized recommendations
                    </p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <FaShieldAlt />
                  </div>
                  <div className="benefit-text">
                    <h3>Secure Shopping</h3>
                    <p>
                      Your personal and payment information is always protected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
