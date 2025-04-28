import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaPhone,
  FaSave,
  FaArrowRight,
  FaShoppingBag,
} from "react-icons/fa";

export default function Profile() {
  const { user, updateProfile, isAuthenticated } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        postalCode: user.address?.postalCode || "",
        country: user.address?.country || "",
      });
    }
  }, [user, isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
    };

    const result = await updateProfile(userData);
    setLoading(false);

    if (result.success) {
      toast.success("Profile updated successfully");
    } else {
      toast.error(result.message || "Failed to update profile");
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar">
            <div className="profile-avatar-circle">
              <FaUser />
            </div>
          </div>
          <div className="profile-title">
            <h1>My Profile</h1>
            <p>Update your personal information and shipping address</p>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-section">
            <h2 className="profile-section-title">
              <FaUser className="profile-section-icon" /> Personal Information
            </h2>

            <div className="profile-form-row">
              <div className="profile-form-group">
                <label htmlFor="name">Full Name</label>
                <div className="profile-input-with-icon">
                  <div className="profile-input-icon-wrapper">
                    <FaUser className="profile-input-icon" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="profile-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="profile-form-row">
              <div className="profile-form-group">
                <label htmlFor="email">Email Address</label>
                <div className="profile-input-with-icon">
                  <div className="profile-input-icon-wrapper">
                    <FaEnvelope className="profile-input-icon" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="profile-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="profile-form-row">
              <div className="profile-form-group">
                <label htmlFor="phone">Phone Number</label>
                <div className="profile-input-with-icon">
                  <div className="profile-input-icon-wrapper">
                    <FaPhone className="profile-input-icon" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="profile-input"
                    placeholder="(Optional)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2 className="profile-section-title">
              <FaMapMarkerAlt className="profile-section-icon" /> Shipping
              Address
            </h2>

            <div className="profile-form-row">
              <div className="profile-form-group">
                <label htmlFor="street">Street Address</label>
                <div className="profile-input-with-icon">
                  <div className="profile-input-icon-wrapper">
                    <FaMapMarkerAlt className="profile-input-icon" />
                  </div>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="profile-input"
                    placeholder="123 Main St"
                  />
                </div>
              </div>
            </div>

            <div className="profile-form-row profile-form-row-2-col">
              <div className="profile-form-group">
                <label htmlFor="city">City</label>
                <div className="profile-input-with-icon">
                  <div className="profile-input-icon-wrapper">
                    <FaCity className="profile-input-icon" />
                  </div>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="profile-input"
                  />
                </div>
              </div>

              <div className="profile-form-group">
                <label htmlFor="state">State/Province</label>
                <div className="profile-input-with-icon">
                  <div className="profile-input-icon-wrapper">
                    <FaMapMarkerAlt className="profile-input-icon" />
                  </div>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="profile-input"
                  />
                </div>
              </div>
            </div>

            <div className="profile-form-row profile-form-row-2-col">
              <div className="profile-form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <div className="profile-input-with-icon">
                  <div className="profile-input-icon-wrapper">
                    <FaMapMarkerAlt className="profile-input-icon" />
                  </div>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="profile-input"
                  />
                </div>
              </div>

              <div className="profile-form-group">
                <label htmlFor="country">Country</label>
                <div className="profile-input-with-icon">
                  <div className="profile-input-icon-wrapper">
                    <FaGlobe className="profile-input-icon" />
                  </div>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="profile-input"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button
              type="submit"
              className="profile-save-btn"
              disabled={loading}
            >
              {loading ? (
                <div className="profile-btn-content">
                  <span className="profile-btn-loader"></span>
                  <span>Updating...</span>
                </div>
              ) : (
                <div className="profile-btn-content">
                  <FaSave className="profile-btn-icon-left" />
                  <span>Save Changes</span>
                  <FaArrowRight className="profile-btn-icon-right" />
                </div>
              )}
            </button>

            <button
              type="button"
              className="profile-orders-btn"
              onClick={() => navigate("/orders")}
            >
              <FaShoppingBag className="profile-btn-icon-left" />
              <span>View My Orders</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
