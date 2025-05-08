import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHeart,
  FaShoppingBasket,
  FaCreditCard,
  FaShippingFast,
  FaHeadset,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
  FaShieldAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import "../styles/components/Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>Subscribe to our newsletter</h3>
              <p>Get the latest updates, deals and exclusive offers</p>
            </div>
            <div className="newsletter-form">
              <div className="form-group">
                <input type="email" placeholder="Your email address" />
                <button type="submit">
                  Subscribe <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <FaShippingFast />
              </div>
              <div className="feature-content">
                <h4>Free Shipping</h4>
                <p>On all orders over $50</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <FaExchangeAlt />
              </div>
              <div className="feature-content">
                <h4>Easy Returns</h4>
                <p>30-day return policy</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <div className="feature-content">
                <h4>Secure Payments</h4>
                <p>Protected by encryption</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <FaHeadset />
              </div>
              <div className="feature-content">
                <h4>24/7 Support</h4>
                <p>Call or email us anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-widgets">
            <div className="footer-widget about-widget">
              <div className="footer-logo">
                <Link to="/">
                  <FaShoppingBasket className="footer-logo-icon" />
                  <span className="footer-logo-text">
                    <span className="text-primary">Fusion</span>
                    <span className="text-secondary">Buy</span>
                  </span>
                </Link>
              </div>
              <p className="about-text">
                Your premier destination for quality products at unbeatable
                prices. Discover the perfect fusion of style, quality, and
                value.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>123 E-Commerce Street, Shopping District, 12345</span>
                </div>
                <div className="contact-item">
                  <FaPhoneAlt className="contact-icon" />
                  <span>+1 (123) 456-7890</span>
                </div>
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <span>support@fusionbuy.com</span>
                </div>
              </div>
              <div className="social-links">
                <a href="#!" className="social-link">
                  <FaFacebook />
                </a>
                <a href="#!" className="social-link">
                  <FaTwitter />
                </a>
                <a href="#!" className="social-link">
                  <FaInstagram />
                </a>
                <a href="#!" className="social-link">
                  <FaLinkedin />
                </a>
              </div>
            </div>

            <div className="footer-widget links-widget">
              <h3 className="widget-title">Shop</h3>
              <ul className="widget-list">
                <li>
                  <Link to="/">New Arrivals</Link>
                </li>
                <li>
                  <Link to="/?category=electronics">Electronics</Link>
                </li>
                <li>
                  <Link to="/?category=fashion">Fashion</Link>
                </li>
                <li>
                  <Link to="/?category=home">Home Goods</Link>
                </li>
                <li>
                  <Link to="/?category=beauty">Beauty</Link>
                </li>
                <li>
                  <Link to="/sale">Sale</Link>
                </li>
              </ul>
            </div>

            <div className="footer-widget links-widget">
              <h3 className="widget-title">Account</h3>
              <ul className="widget-list">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/profile">My Account</Link>
                </li>
                <li>
                  <Link to="/orders">Order History</Link>
                </li>
                <li>
                  <Link to="/wishlist">Wishlist</Link>
                </li>
                <li>
                  <Link to="/cart">Shopping Cart</Link>
                </li>
              </ul>
            </div>

            <div className="footer-widget links-widget">
              <h3 className="widget-title">Information</h3>
              <ul className="widget-list">
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/shipping">Shipping & Delivery</Link>
                </li>
                <li>
                  <Link to="/returns">Returns & Exchanges</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {new Date().getFullYear()} <strong>FusionBuy</strong> - All
              Rights Reserved | Made with <FaHeart className="heart-icon" /> by
              Our Team
            </p>
            <div className="footer-bottom-links">
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
