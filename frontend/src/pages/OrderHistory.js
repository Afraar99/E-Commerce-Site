import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import {
  FaShoppingBag,
  FaBox,
  FaClipboardList,
  FaSearch,
  FaEye,
  FaExclamationCircle,
  FaArrowLeft,
  FaShippingFast,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaCalendarAlt,
  FaDollarSign,
  FaReceipt,
  FaHistory,
  FaBoxOpen,
} from "react-icons/fa";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/orders/me`,
          {
            headers: { token },
          }
        );

        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        } else {
          toast.error(data.message || "Failed to fetch orders");
        }

        setLoading(false);
      } catch (error) {
        toast.error("An error occurred while fetching orders");
        setLoading(false);
      }
    }

    fetchOrders();
  }, [isAuthenticated, navigate]);

  // Format date function
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge based on order status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="status-badge status-delivered">
            <FaCheckCircle /> Delivered
          </span>
        );
      case "Shipped":
        return (
          <span className="status-badge status-shipped">
            <FaShippingFast /> Shipped
          </span>
        );
      case "Processing":
        return (
          <span className="status-badge status-processing">
            <FaClock /> Processing
          </span>
        );
      default:
        return (
          <span className="status-badge status-pending">
            <FaClock /> Pending
          </span>
        );
    }
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <div className="orders-icon-wrapper">
          <div className="orders-icon-circle">
            <FaBoxOpen />
          </div>
          <div className="orders-icon-accent"></div>
        </div>
        <div className="orders-title">
          <h1>My Orders</h1>
          <p className="orders-subtitle">
            Track and manage your purchase history
          </p>
        </div>
      </div>

      {loading ? (
        <div className="orders-loading">
          <div className="orders-loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="orders-empty">
          <div className="orders-empty-icon">
            <FaExclamationCircle />
          </div>
          <h2>No Orders Found</h2>
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="orders-shop-btn">
            <FaShoppingBag className="orders-btn-icon-left" /> Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="orders-count-summary">
            <div className="order-count-badge">
              <FaReceipt className="count-icon" />
              <span>
                {orders.length} {orders.length === 1 ? "Order" : "Orders"} in
                your account
              </span>
            </div>
          </div>

          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-card-header">
                  <div className="order-info">
                    <div className="order-id-row">
                      <FaBox className="order-header-icon" />
                      <span className="order-id-value">{order._id}</span>
                    </div>
                    <div className="order-meta-row">
                      <div className="order-meta-item">
                        <FaCalendarAlt className="meta-icon" />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                      <div className="order-meta-item">
                        <FaDollarSign className="meta-icon" />
                        <span className="order-amount">${order.amount}</span>
                      </div>
                      <div className="order-meta-item order-status-badge">
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-card-body">
                  <div className="order-items-preview-container">
                    <h4 className="preview-title">Items in your order</h4>
                    <div className="order-items-preview">
                      {order.cartItems.slice(0, 3).map((item, index) => (
                        <div key={index} className="order-item-card">
                          <div className="order-item-image">
                            <img
                              src={
                                item.product.images && item.product.images[0]
                                  ? item.product.images[0].image
                                  : "/images/default_product.jpg"
                              }
                              alt={item.product.name}
                            />
                          </div>
                          <div className="order-item-details">
                            <div className="order-item-name">
                              {item.product.name.length > 20
                                ? `${item.product.name.substring(0, 20)}...`
                                : item.product.name}
                            </div>
                            <div className="order-item-price-qty">
                              <span className="item-price">
                                ${item.product.price}
                              </span>
                              <span className="item-qty">Qty: {item.qty}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {order.cartItems.length > 3 && (
                        <div className="more-items-card">
                          <div className="more-items-content">
                            <span>+{order.cartItems.length - 3}</span>
                            <span>more</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="order-card-footer">
                  <Link
                    to={`/order/${order._id}`}
                    className="order-details-btn"
                  >
                    <FaEye className="btn-icon-left" />
                    View Details
                  </Link>
                  {order.status === "Delivered" && (
                    <button className="order-review-btn">
                      <FaStar className="btn-icon-left" />
                      Write a Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="orders-actions">
        <button
          type="button"
          className="back-home-btn"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft className="btn-icon-left" />
          <span>Continue Shopping</span>
        </button>
      </div>
    </div>
  );
}
