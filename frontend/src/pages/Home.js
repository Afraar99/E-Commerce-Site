import { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import {
  FaSearch,
  FaAngleRight,
  FaShoppingBag,
  FaRegStar,
} from "react-icons/fa";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [categories, setCategories] = useState([
    "Electronics",
    "Fashion",
    "Home",
    "Beauty",
    "Books",
    "Sports",
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

  return (
    <Fragment>
      {!keyword && (
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Discover Something New</h1>
            <p className="hero-subtitle">
              Explore our curated collection of premium products
            </p>
            <a href="#products" className="hero-button">
              Shop Now <FaAngleRight />
            </a>
          </div>
          <div className="hero-categories">
            {categories.map((category, index) => (
              <div className="category-card" key={index}>
                <div className="category-icon">
                  <FaShoppingBag />
                </div>
                <h3>{category}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

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
                src={
                  featuredProduct.images?.[0]?.url ||
                  "/images/default-product.png"
                }
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
              Search Results for <span className="highlight">"{keyword}"</span>
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
              <ProductCard key={product._id} product={product} />
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
    </Fragment>
  );
}
