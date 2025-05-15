import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaShoppingCart,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../styles/pages/ProductDetail.css";

export default function ProductDetail({ cartItems, setCartItems }) {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_API_URL + "/product/" + id)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res.product);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
        toast.error("Failed to load product details");
      });
  }, [id]);

  function addToCart() {
    const itemExist = cartItems.find(
      (item) => item.product._id === product._id
    );
    if (!itemExist) {
      const newItem = { product, qty };
      setCartItems((state) => [...state, newItem]);
      toast.success("Item added to cart successfully!");
    } else {
      toast.info("Item is already in your cart");
    }
  }

  function increaseQty() {
    if (product.stock === qty) {
      toast.warning("Maximum stock limit reached");
      return;
    }
    setQty((state) => state + 1);
  }

  function decreaseQty() {
    if (qty > 1) {
      setQty((state) => state - 1);
    }
  }

  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} className="star filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    return stars;
  };

  // Calculate discount percentage
  const calculateDiscount = (originalPrice, discountedPrice) => {
    return Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  // Calculate discounted price (assuming 20% discount for demonstration)
  const originalPrice = Number(product.price);
  const discountPercentage = 20;
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <div className="product-gallery">
          <div className="main-image-container">
            <img
              src={product.images[selectedImage].image}
              alt={product.name}
              className="main-image"
            />
            {product.images.length > 1 && (
              <>
                <button
                  className="image-nav-btn prev-btn"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="image-nav-btn next-btn"
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="thumbnail-grid">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image.image}
                  alt={`${product.name} - View ${index + 1}`}
                  className={`thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-id">Product #{product._id}</p>
          </div>

          <div className="product-rating">
            <div className="rating-stars">{renderStars(product.ratings)}</div>
            <span className="reviews-count">
              ({product.numOfReviews} reviews)
            </span>
          </div>

          <div className="product-pricing">
            <div className="price-container">
              <span className="original-price">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="discounted-price">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="discount-badge">{discountPercentage}% OFF</span>
            </div>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="quantity-selector">
            <button
              className="quantity-btn"
              onClick={decreaseQty}
              disabled={qty <= 1}
            >
              -
            </button>
            <input
              type="number"
              className="quantity-input"
              value={qty}
              readOnly
            />
            <button
              className="quantity-btn"
              onClick={increaseQty}
              disabled={qty >= product.stock}
            >
              +
            </button>
          </div>

          <button
            className="add-to-cart-btn"
            onClick={addToCart}
            disabled={product.stock === 0}
          >
            <FaShoppingCart />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>

          <div
            className={`stock-status ${
              product.stock > 0 ? "in-stock" : "out-of-stock"
            }`}
          >
            {product.stock > 0
              ? `${product.stock} units available`
              : "Currently out of stock"}
          </div>

          <div className="product-meta">
            <div className="meta-item">
              <FaTruck />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="meta-item">
              <FaUndo />
              <span>30-day return policy</span>
            </div>
            <div className="meta-item">
              <FaShieldAlt />
              <span>2-year warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
