import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import {
  FaUser,
  FaEdit,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaMailBulk,
  FaSave,
} from "react-icons/fa";

export default function Profile() {
  const { user, updateProfile, isAuthenticated } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      if (user.address) {
        setStreet(user.address.street || "");
        setCity(user.address.city || "");
        setState(user.address.state || "");
        setPostalCode(user.address.postalCode || "");
        setCountry(user.address.country || "");
      }
    }
  }, [user, isAuthenticated, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const userData = {
      name,
      email,
      street,
      city,
      state,
      postalCode,
      country,
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
    <div className="container container-fluid my-5">
      <div className="row wrapper">
        <div className="col-12 col-lg-8 mx-auto">
          <form
            className="shadow-lg p-4 rounded"
            onSubmit={handleSubmit}
            style={{ backgroundColor: "#fff" }}
          >
            <h1 className="mb-4 text-center">My Profile</h1>
            <div className="text-center mb-4">
              {/* Using FaUser icon instead of avatar image */}
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundColor: "#e9ecef",
                  border: "5px solid #f0f0f0",
                }}
              >
                <FaUser size={60} color="#6c757d" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name_field" style={{ fontWeight: "600" }}>
                <FaUser className="mr-2" /> Name
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field" style={{ fontWeight: "600" }}>
                <FaMailBulk className="mr-2" /> Email
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <h4
              className="mt-5 mb-3"
              style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}
            >
              <FaMapMarkerAlt className="mr-2" /> Shipping Address
            </h4>

            <div className="form-group">
              <label htmlFor="street_field">Street Address</label>
              <input
                type="text"
                id="street_field"
                className="form-control"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="city_field">
                    <FaCity className="mr-1" /> City
                  </label>
                  <input
                    type="text"
                    id="city_field"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="state_field">State/Province</label>
                  <input
                    type="text"
                    id="state_field"
                    className="form-control"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="postal_code_field">Postal Code</label>
                  <input
                    type="text"
                    id="postal_code_field"
                    className="form-control"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="country_field">
                    <FaGlobe className="mr-1" /> Country
                  </label>
                  <input
                    type="text"
                    id="country_field"
                    className="form-control"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block py-2 mt-4 d-flex align-items-center justify-content-center"
              disabled={loading}
              style={{
                backgroundColor: "#f0c14b",
                borderColor: "#a88734 #9c7e31 #846a29",
                color: "#111",
                fontWeight: "bold",
              }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Updating...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" /> Update Profile
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
