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
} from "react-icons/fa";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useContext(UserContext);

  const { name, email, password, confirmPassword } = user;

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    const result = await register({ name, email, password });

    setLoading(false);

    if (result.success) {
      toast.success("Registration successful!");
      navigate("/");
    } else {
      toast.error(result.message || "Registration failed");
    }
  }

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        {/* Left side - Registration Form */}
        <div className="login-form-side">
          <div className="login-form-wrapper">
            <div className="login-logo">
              <FaShoppingBag className="login-logo-icon" />
              <span>FusionBuy</span>
            </div>

            <h1 className="login-title">Create Account</h1>
            <p className="login-subtitle">
              Join FusionBuy to start your shopping journey
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    placeholder="Full Name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

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
                    name="email"
                    value={email}
                    onChange={handleChange}
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
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                    minLength="6"
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
                    id="confirm_password_field"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                id="register_button"
                type="submit"
                className="btn login-btn"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "SIGN UP"}
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
                  Already have an account?{" "}
                  <Link to="/login" className="register-link">
                    <FaSignInAlt className="register-icon" /> Sign In
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
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/register-bg.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="login-benefits">
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
