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
} from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        {/* Left side - Login Form */}
        <div className="login-form-side">
          <div className="login-form-wrapper">
            <div className="login-logo">
              <FaShoppingBag className="login-logo-icon" />
              <span>FusionBuy</span>
            </div>

            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">
              Sign in to continue your shopping experience
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                  </div>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                  </div>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group form-footer">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="remember_me"
                  />
                  <label className="custom-control-label" htmlFor="remember_me">
                    Remember me
                  </label>
                </div>
                <Link to="/password/forgot" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>

              <button
                id="login_button"
                type="submit"
                className="btn login-btn"
                disabled={loading}
              >
                {loading ? "Signing In..." : "SIGN IN"}
              </button>

              <div className="login-separator">
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

        {/* Right side - Promotional Image */}
        <div
          className="login-image-side"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/login-bg.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="login-benefits">
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

          {/* <div className="login-promo-badge">
            <div className="promo-content">
              <h2>SUMMER SALE</h2>
              <div className="discount-circle">
                <span>UP TO</span>
                <span className="discount-amount">70%</span>
                <span>OFF</span>
              </div>
              <p>Login now to unlock exclusive summer deals</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
