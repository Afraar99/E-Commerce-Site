import { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import {
  FaSearch,
  FaAngleRight,
  FaShoppingBag,
  FaRegStar,
  FaLaptop,
  FaTshirt,
  FaHome,
  FaSprayCan,
  FaBook,
  FaRunning,
  FaShippingFast,
  FaAward,
  FaHeadset,
  FaUndo,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/pages/Home.css";

export default function Home({ setCartItems }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [categories, setCategories] = useState([
    { name: "Electronics", icon: <FaLaptop /> },
    { name: "Fashion", icon: <FaTshirt /> },
    { name: "Home", icon: <FaHome /> },
    { name: "Beauty", icon: <FaSprayCan /> },
    { name: "Books", icon: <FaBook /> },
    { name: "Sports", icon: <FaRunning /> },
  ]);
  const [featuredProduct, setFeaturedProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Build the API URL with search parameters if they exist
    const apiUrl = keyword
      ? `${process.env.REACT_APP_API_URL}/products?keyword=${encodeURIComponent(
          keyword
        )}`
      : `${process.env.REACT_APP_API_URL}/products`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => {
        const allProducts = res.products || [];
        setProducts(allProducts);

        // Set a featured product (first product with rating >= 4 or just the first product)
        if (allProducts.length > 0) {
          const featured =
            allProducts.find((p) => p.ratings >= 4) || allProducts[0];
          setFeaturedProduct(featured);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [keyword]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
        <p>Loading amazing products for you...</p>
      </div>
    );
  }

  // Add this helper function for the featured product image
  const getImageUrl = (product) => {
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

  // Add this function to handle adding products to cart
  const addToCart = (item) => {
    // Get current cart items
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = existingCartItems.find(
      (i) => i.product._id === item.product._id
    );

    let updatedCart;

    if (existingItem) {
      // Update quantity if item exists
      updatedCart = existingCartItems.map((i) =>
        i.product._id === item.product._id ? { ...i, qty: i.qty + item.qty } : i
      );
      toast.info("Item quantity updated in cart");
    } else {
      // Add new item
      updatedCart = [...existingCartItems, item];
      toast.success(`${item.product.name} added to cart`);
    }

    // Update both localStorage and state
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  return (
    <Fragment>
      {!keyword && (
        <>
          <div
            className="hero-section"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`,
            }}
          >
            <div className="hero-content">
              <span className="hero-badge">Premium Collection</span>
              <h1 className="hero-title">
                Discover <span className="highlight-text">Something</span> New
              </h1>
              <p className="hero-subtitle">
                Explore our curated collection of premium products with
                exclusive deals and fast shipping
              </p>
              <div className="hero-buttons">
                <a href="#products" className="hero-button primary">
                  Shop Now <FaAngleRight />
                </a>
                <a href="/collections" className="hero-button secondary">
                  Browse Collections
                </a>
              </div>
            </div>
            <div className="hero-categories">
              {categories.map((category, index) => (
                <div className="category-card" key={index}>
                  <div className="category-icon">{category.icon}</div>
                  <h3>{category.name}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="container features-container">
            <div className="features-section">
              <div className="features-row">
                <div className="feature-item">
                  <div className="feature-icon">
                    <FaShippingFast />
                  </div>
                  <div className="feature-text">
                    <h3>Free Shipping</h3>
                    <p>On orders over $50</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <FaAward />
                  </div>
                  <div className="feature-text">
                    <h3>Quality Guarantee</h3>
                    <p>100% authentic products</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <FaHeadset />
                  </div>
                  <div className="feature-text">
                    <h3>24/7 Support</h3>
                    <p>Dedicated customer service</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <FaUndo />
                  </div>
                  <div className="feature-text">
                    <h3>Easy Returns</h3>
                    <p>30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="container">
        {featuredProduct && !keyword && (
          <div className="featured-product-section">
            <div className="featured-product-content">
              <div className="featured-text">
                <span className="featured-tag">Featured Product</span>
                <h2>{featuredProduct.name}</h2>
                <p className="featured-price">${featuredProduct.price}</p>
                <div className="featured-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaRegStar
                      key={i}
                      className={
                        i < Math.floor(featuredProduct.ratings)
                          ? "star filled"
                          : "star"
                      }
                    />
                  ))}
                  <span>({featuredProduct.numOfReviews} reviews)</span>
                </div>
                <p className="featured-description">
                  {featuredProduct.description?.substring(0, 150)}...
                </p>
                <a
                  href={`/product/${featuredProduct._id}`}
                  className="featured-button"
                >
                  View Details
                </a>
              </div>
              <div className="featured-image">
                <img
                  src={getImageUrl(featuredProduct)}
                  alt={featuredProduct.name}
                />
              </div>
            </div>
          </div>
        )}

        <section id="products" className="products-section">
          <div className="section-header">
            {keyword ? (
              <h2 className="section-title">
                Search Results for{" "}
                <span className="highlight">"{keyword}"</span>
              </h2>
            ) : (
              <h2 className="section-title">Latest Products</h2>
            )}
            <p className="section-subtitle">
              {keyword
                ? "We found these products that match your search"
                : "Check out our newest arrivals and trending items"}
            </p>
          </div>

          {products.length > 0 ? (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <FaSearch size={50} className="no-products-icon" />
              <h3>No Products Found</h3>
              {keyword && (
                <p>
                  We couldn't find any products matching "{keyword}". Try a
                  different search term or browse our categories.
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </Fragment>
  );
}
