import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

export default function Cart({ cartItems, setCartItems }) {
  const [shippingInfo, setShippingInfo] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [showShippingForm, setShowShippingForm] = useState(false);
  const { isAuthenticated, user } = useContext(UserContext);
  const navigate = useNavigate();

  function handleShippingChange(e) {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  }

  function removeItem(item) {
    const updatedItems = cartItems.filter(
      (i) => i.product._id !== item.product._id
    );
    setCartItems(updatedItems);
    toast.success("Item removed from cart");
  }

  function updateQuantity(item, newQty) {
    if (newQty <= 0) return;
    if (newQty > item.product.stock) {
      toast.error("Cannot exceed available stock");
      return;
    }

    const updatedItems = cartItems.map((i) =>
      i.product._id === item.product._id ? { ...i, qty: newQty } : i
    );
    setCartItems(updatedItems);
  }

  function handleCheckout() {
    if (!isAuthenticated) {
      toast.info("Please login to checkout");
      navigate("/login");
      return;
    }

    // Pre-fill shipping info from user profile if available
    if (user && user.address) {
      setShippingInfo({
        street: user.address.street || "",
        city: user.address.city || "",
        state: user.address.state || "",
        postalCode: user.address.postalCode || "",
        country: user.address.country || "",
      });
    }

    setShowShippingForm(true);
  }

  async function placeOrder(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          cartItems,
          shippingAddress: shippingInfo,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCartItems([]);
        toast.success("Order placed successfully!");
        navigate(`/order/${data.order._id}`);
      } else {
        toast.error(data.message || "Error placing order");
      }
    } catch (error) {
      toast.error("Error placing order");
    }
  }

  return (
    <div className="container container-fluid">
      {cartItems.length === 0 ? (
        <div className="row justify-content-center">
          <div className="col-6 mt-5 text-center">
            <h2>Your Cart is Empty</h2>
            <Link to="/" className="btn btn-primary mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h2 className="mt-5">
            Your Cart: <b>{cartItems.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <div key={item.product._id} className="cart-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.product.images[0].image}
                        alt="Laptop"
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={`/product/${item.product._id}`}>
                        {item.product.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">${item.product.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={() => updateQuantity(item, item.qty - 1)}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.qty}
                          readOnly
                        />
                        <span
                          className="btn btn-primary plus"
                          onClick={() => updateQuantity(item, item.qty + 1)}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                        onClick={() => removeItem(item)}
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.product.price * item.qty,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={handleCheckout}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>

          {/* Shipping form */}
          {showShippingForm && (
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="card mb-4">
                  <div className="card-header bg-primary text-white">
                    <h4>Shipping Information</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={placeOrder}>
                      <div className="form-group">
                        <label htmlFor="street">Street Address</label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          className="form-control"
                          value={shippingInfo.street}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="city">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            className="form-control"
                            value={shippingInfo.city}
                            onChange={handleShippingChange}
                            required
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="state">State</label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            className="form-control"
                            value={shippingInfo.state}
                            onChange={handleShippingChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="postalCode">Postal Code</label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            className="form-control"
                            value={shippingInfo.postalCode}
                            onChange={handleShippingChange}
                            required
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="country">Country</label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            className="form-control"
                            value={shippingInfo.country}
                            onChange={handleShippingChange}
                            required
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Place Order
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
