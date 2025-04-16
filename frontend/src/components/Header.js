import { Link } from "react-router-dom";
import Search from "./Search";

export default function Header({ cartItems }) {
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="logo-container">
              <h1 className="logo-text">
                <span className="logo-part-1">Fusion</span>
                <span className="logo-part-2">Buy</span>
              </h1>
            </div>
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to={"/cart"}>
          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            {cartItems.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}
