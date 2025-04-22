import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

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

  return (
    <div className="container container-fluid">
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : order ? (
        <>
          <h1 className="my-5">Order Details</h1>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h2 className="my-5">Order # {order._id}</h2>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {order.user.name}
              </p>
              <p>
                <b>Address:</b>{" "}
                {order.shippingAddress
                  ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`
                  : "Not provided"}
              </p>
              <p>
                <b>Amount:</b> ${order.amount}
              </p>
              <p>
                <b>Date:</b> {formatDate(order.createdAt)}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p>
                <b>Method:</b> {order.paymentMethod || "Card Payment"}
              </p>
              <p
                className={
                  order.status === "Delivered" ? "greenColor" : "redColor"
                }
              >
                <b>Status:</b> {order.status}
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {order.cartItems &&
                  order.cartItems.map((item) => (
                    <div key={item.product._id} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={
                            item.product.images && item.product.images[0]
                              ? item.product.images[0].image
                              : "/images/default_product.jpg"
                          }
                          alt={item.product.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${item.product._id}`}>
                          {item.product.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.product.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.qty} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4 mt-3 mb-5">
              <Link to="/orders" className="btn btn-primary">
                <i className="fa fa-arrow-left"></i> Back to Orders
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="row justify-content-center">
          <div className="col-6 mt-5 text-center">
            <h4>
              Order not found or you do not have access to view this order.
            </h4>
            <Link to="/orders" className="btn btn-primary mt-3">
              Back to Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
