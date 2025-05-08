import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaTruck,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaUser,
  FaCreditCard,
  FaCalendarAlt,
} from "react-icons/fa";
import "../styles/pages/OrderDetails.css";

export default function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    async function fetchOrderDetails() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/order/${id}`,
          {
            headers: { token },
          }
        );

        const data = await response.json();

        if (data.success) {
          setOrder(data.order);
        } else {
          toast.error(data.message || "Failed to fetch order details");
        }

        setLoading(false);
      } catch (error) {
        toast.error("An error occurred while fetching order details");
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [isAuthenticated, navigate, id]);

  // Format date function
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "status-delivered";
      case "Processing":
        return "status-processing";
      case "Shipped":
        return "status-shipped";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

  return (
    <div className="order-details-container">
      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : order ? (
        <>
          <h1 className="order-details-title">Order Details</h1>
          <h2 className="order-id">Order ID: {order._id}</h2>

          <div className="order-details-card">
            <h3 className="order-section-title">
              <FaUser /> Customer Information
            </h3>
            <div className="order-info-item">
              <span className="order-info-label">Name:</span>
              <span className="order-info-value">{order.user.name}</span>
            </div>
            <div className="order-info-item">
              <span className="order-info-label">Email:</span>
              <span className="order-info-value">{order.user.email}</span>
            </div>
          </div>

          <div className="order-details-card">
            <h3 className="order-section-title">
              <FaMapMarkerAlt /> Shipping Information
            </h3>
            {order.shippingAddress ? (
              <>
                <div className="order-info-item">
                  <span className="order-info-label">Address:</span>
                  <span className="order-info-value">
                    {order.shippingAddress.street}
                  </span>
                </div>
                <div className="order-info-item">
                  <span className="order-info-label">City:</span>
                  <span className="order-info-value">
                    {order.shippingAddress.city}
                  </span>
                </div>
                <div className="order-info-item">
                  <span className="order-info-label">State:</span>
                  <span className="order-info-value">
                    {order.shippingAddress.state}
                  </span>
                </div>
                <div className="order-info-item">
                  <span className="order-info-label">Postal Code:</span>
                  <span className="order-info-value">
                    {order.shippingAddress.postalCode}
                  </span>
                </div>
                <div className="order-info-item">
                  <span className="order-info-label">Country:</span>
                  <span className="order-info-value">
                    {order.shippingAddress.country}
                  </span>
                </div>
              </>
            ) : (
              <div className="order-info-item">
                <span className="order-info-value">Not provided</span>
              </div>
            )}
          </div>

          <div className="order-details-card">
            <h3 className="order-section-title">
              <FaCreditCard /> Payment Information
            </h3>
            <div className="order-info-item">
              <span className="order-info-label">Method:</span>
              <span className="order-info-value">
                {order.paymentMethod || "Card Payment"}
              </span>
            </div>
            <div className="order-info-item">
              <span className="order-info-label">Total Amount:</span>
              <span className="order-info-value">${order.amount}</span>
            </div>
            <div className="order-info-item">
              <span className="order-info-label">Order Date:</span>
              <span className="order-info-value">
                <FaCalendarAlt /> {formatDate(order.createdAt)}
              </span>
            </div>
            <div className="order-info-item">
              <span className="order-info-label">Status:</span>
              <span className={`order-status ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>

          <div className="order-details-card">
            <h3 className="order-section-title">
              <FaBoxOpen /> Order Items
            </h3>
            <div className="order-items-list">
              {order.cartItems &&
                order.cartItems.map((item) => (
                  <div key={item.product._id} className="order-item">
                    <img
                      src={
                        item.product.images && item.product.images[0]
                          ? item.product.images[0].image
                          : "/images/default_product.jpg"
                      }
                      alt={item.product.name}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      <Link
                        to={`/product/${item.product._id}`}
                        className="order-item-name"
                      >
                        {item.product.name}
                      </Link>
                      <div className="order-item-price">
                        ${item.product.price}
                      </div>
                    </div>
                    <div className="order-item-quantity">
                      {item.qty} {item.qty > 1 ? "Pieces" : "Piece"}
                    </div>
                  </div>
                ))}
            </div>

            <div className="order-summary">
              <div className="order-summary-item">
                <span>Subtotal</span>
                <span>${order.amount}</span>
              </div>
              <div className="order-summary-item">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="order-summary-item order-summary-total">
                <span>Total</span>
                <span>${order.amount}</span>
              </div>
            </div>
          </div>

          <Link to="/orders" className="order-back-btn">
            <FaArrowLeft /> Back to Orders
          </Link>
        </>
      ) : (
        <div className="order-not-found">
          <h4>Order not found or you do not have access to view this order.</h4>
          <Link to="/orders" className="order-back-btn">
            <FaArrowLeft /> Back to Orders
          </Link>
        </div>
      )}
    </div>
  );
}
