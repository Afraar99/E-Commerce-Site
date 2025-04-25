import { Link } from "react-router-dom";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaEye,
  FaShoppingCart,
} from "react-icons/fa";

export default function ProductCard({ product }) {
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

  return (
    <div className="product-card">
      <div className="product-badge">New</div>
      <div className="product-image">
        <img
          src={product.images?.[0]?.url || "/images/default-product.png"}
          alt={product.name}
        />
        <div className="product-actions">
          <Link to={`/product/${product._id}`} className="view-btn">
            <FaEye />
          </Link>
          <Link to={`/product/${product._id}`} className="cart-btn">
            <FaShoppingCart />
          </Link>
        </div>
      </div>
      <div className="product-info">
        <Link to={`/product/${product._id}`} className="product-name">
          {product.name}
        </Link>
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
