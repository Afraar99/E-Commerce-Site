import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/OrderDetails";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Header cartItemCount={cartItems.length} />
          <div className="container container-fluid">
            <ToastContainer position="bottom-center" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/product/:id"
                element={
                  <ProductDetail
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <Cart cartItems={cartItems} setCartItems={setCartItems} />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/order/:id" element={<OrderDetails />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
