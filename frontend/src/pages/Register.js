import { useState, useContext, useEffect } from "react";
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
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaApple,
  FaCheckCircle,
  FaPercent,
  FaTruckMoving,
} from "react-icons/fa";
import "../styles/pages/Register.css";

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
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();
  const { register, isAuthenticated } = useContext(UserContext);

  const { name, email, password, confirmPassword } = formData;

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Calculate password strength
    if (name === "password") {
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      toast.error("Please accept the Terms and Conditions");
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

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return "Very Weak";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Medium";
    if (passwordStrength === 3) return "Strong";
    if (passwordStrength === 4) return "Very Strong";
  };

  const getPasswordStrengthClass = () => {
    if (passwordStrength <= 1) return "weak";
    if (passwordStrength === 2) return "medium";
    if (passwordStrength >= 3) return "strong";
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-content">
            <div className="auth-header">
              <Link to="/" className="auth-logo">
                <FaShoppingBag className="logo-icon" />
                <span className="logo-text">FusionBuy</span>
              </Link>
              <h1>Create an Account</h1>
              <p>Join FusionBuy to start your shopping journey</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-group">
                  <span className="input-icon">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-group">
                  <span className="input-icon">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-group">
                  <span className="input-icon">
                    <FaLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={handleChange}
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div
                        className={`strength-progress ${getPasswordStrengthClass()}`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      ></div>
                    </div>
                    <div className="strength-text">
                      <span
                        className={`strength-label ${getPasswordStrengthClass()}`}
                      >
                        {getPasswordStrengthLabel()}
                      </span>
                      <span className="strength-info">
                        {passwordStrength < 3 &&
                          "Use 8+ characters with letters, numbers & symbols"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-group">
                  <span className="input-icon">
                    <FaLock />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <div className="password-mismatch">
                    Passwords do not match
                  </div>
                )}
              </div>

              <div className="form-checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)}
                  />
                  <span className="checkbox-custom"></span>
                  <span>
                    I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
                    <Link to="/privacy">Privacy Policy</Link>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading || !acceptTerms}
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    Create Account <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="auth-separator">
              <span>Or sign up with</span>
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
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </div>
          </div>

          <div className="auth-sidebar">
            <div className="sidebar-content">
              <div className="sidebar-header">
                <h2>Why choose FusionBuy?</h2>
                <p>Join thousands of satisfied customers</p>
              </div>

              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <FaCheckCircle />
                  </div>
                  <div className="benefit-text">
                    <h3>Premium Quality</h3>
                    <p>
                      We offer only the highest quality products, carefully
                      selected for you
                    </p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <FaTruckMoving />
                  </div>
                  <div className="benefit-text">
                    <h3>Fast Delivery</h3>
                    <p>Get your orders delivered quickly to your doorstep</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <FaPercent />
                  </div>
                  <div className="benefit-text">
                    <h3>Exclusive Discounts</h3>
                    <p>
                      Members get access to special offers and personalized
                      deals
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
                      Your data is protected with advanced encryption technology
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
