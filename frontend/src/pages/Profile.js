import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  FaCameraRetro,
  FaCheckCircle,
} from "react-icons/fa";
import "../styles/pages/Profile.css";

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
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);
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

      // If user has a profile image, set the preview
      if (user.avatar) {
        setImagePreview(user.avatar);
      }
    }
  }, [user, isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    setProfileImage(file);

    // Create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Show success message
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Create FormData to send both profile data and image
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("street", formData.street);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("postalCode", formData.postalCode);
    formDataToSend.append("country", formData.country);

    if (profileImage) {
      formDataToSend.append("avatar", profileImage);
    }

    const result = await updateProfile(formDataToSend);
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
            <div className="profile-avatar-circle" onClick={triggerFileInput}>
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" />
              ) : (
                <FaUser />
              )}
            </div>
            <div className="profile-avatar-upload" onClick={triggerFileInput}>
              <FaCameraRetro />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
              />
            </div>
          </div>
          <div className="profile-title">
            <h1>My Profile</h1>
            <p>Update your personal information and shipping address</p>
          </div>
        </div>
      </div>

      {uploadSuccess && (
        <div className="profile-success">
          <FaCheckCircle className="profile-success-icon" />
          <span className="profile-success-message">
            Profile picture updated successfully!
          </span>
        </div>
      )}

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
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="profile-btn-content">
                  <FaSave className="profile-btn-icon-left" />
                  <span>Save Changes</span>
                  <FaArrowRight className="profile-btn-icon-right" />
                </div>
              )}
            </button>
            <Link to="/orders" className="profile-orders-btn">
              <div className="profile-btn-content">
                <FaShoppingBag className="profile-btn-icon-left" />
                <span>My Orders</span>
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
