import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

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

  return (
    <div className="container container-fluid">
      <h1 className="my-5">My Orders</h1>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="row justify-content-center">
          <div className="col-6 mt-5 text-center">
            <h4>You haven't placed any orders yet.</h4>
            <Link to="/" className="btn btn-primary mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td>${order.amount}</td>
                      <td>
                        <span
                          className={`badge ${
                            order.status === "Delivered"
                              ? "badge-success"
                              : order.status === "Shipped"
                              ? "badge-info"
                              : "badge-warning"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/order/${order._id}`}
                          className="btn btn-primary"
                        >
                          <i className="fa fa-eye"></i> View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
