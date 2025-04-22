import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaHeart,
  FaShoppingBasket,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <div className="footer-brand mb-4">
              <div className="d-flex align-items-center">
                <FaShoppingBasket size={28} className="brand-icon" />
                <div className="brand-text ml-2">
                  <span className="brand-text-main">Fusion</span>
                  <span className="brand-text-secondary">Buy</span>
                </div>
              </div>
            </div>
            <p className="text-light mb-4">
              Your premier destination for quality products at unbeatable
              prices. Discover the perfect fusion of style, quality, and value.
            </p>
            <div className="social-icons">
              <a href="#!" className="social-icon me-3">
                <FaFacebook size={22} />
              </a>
              <a href="#!" className="social-icon me-3">
                <FaTwitter size={22} />
              </a>
              <a href="#!" className="social-icon me-3">
                <FaInstagram size={22} />
              </a>
              <a href="#!" className="social-icon me-3">
                <FaLinkedin size={22} />
              </a>
              <a href="#!" className="social-icon">
                <FaGithub size={22} />
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Shop</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="footer-link">
                  All Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/?category=electronics" className="footer-link">
                  Electronics
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/?category=fashion" className="footer-link">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/?category=home" className="footer-link">
                  Home Goods
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Account</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/login" className="footer-link">
                  Login
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="footer-link">
                  Register
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="footer-link">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="footer-link">
                  Order History
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Contact Us</h5>
            <p className="text-light">
              <strong>Address:</strong> 123 E-Commerce Street, Shopping
              District, 12345
            </p>
            <p className="text-light">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p className="text-light">
              <strong>Email:</strong> support@fusionbuy.com
            </p>
            <div className="newsletter mt-4">
              <h6 className="mb-3">Subscribe to our newsletter</h6>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email"
                  aria-label="Your email"
                />
                <div className="input-group-append">
                  <button className="btn btn-gold" type="button">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright py-3">
        <div className="container text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-weight-bold">FusionBuy</span> - All Rights
            Reserved | Made with{" "}
            <FaHeart className="text-danger mx-1" size={14} /> by Our Team
          </p>
        </div>
      </div>
    </footer>
  );
}
