import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/components/ProductCard.css";

export default function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  // Helper function to get the correct image URL
  const getImageUrl = () => {
    // Check if product.images exists and has at least one item
    if (product.images && product.images.length > 0) {
      // Handle different image object structures
      if (product.images[0].url) {
        return product.images[0].url;
      } else if (product.images[0].image) {
        return product.images[0].image;
      }
    }
    // Fallback image
    return "/images/default-product.png";
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="star-filled" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} className="star-half" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-empty" />);
      }
    }
    return stars;
  };

  // Navigate to product details page when card is clicked
  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  // Handle add to cart button click
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click event

    // Check if the product is in stock
    if (product.stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    // Add the product to cart with quantity 1
    if (addToCart) {
      addToCart({
        product: product,
        qty: 1,
      });
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-badge">New</div>
      <div className="product-image">
        <img src={getImageUrl()} alt={product.name} />
        <div className="product-actions">
          <button
            onClick={handleAddToCart}
            className="cart-btn"
            aria-label="Add to cart"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
      <div className="product-info">
        <span className="product-name">{product.name}</span>
        <div className="product-rating">
          <div className="stars">{renderStars(product.ratings)}</div>
          <span className="reviews-count">
            ({product.numOfReviews} reviews)
          </span>
        </div>
        <div className="product-price">${product.price}</div>
      </div>
    </div>
  );
}
