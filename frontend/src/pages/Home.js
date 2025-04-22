import { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

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
        setProducts(res.products || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [keyword]);

  return (
    <Fragment>
      {keyword ? (
        <h1 id="products_heading">
          Search Results for: <span className="text-primary">"{keyword}"</span>
        </h1>
      ) : (
        <h1 id="products_heading">Latest Products</h1>
      )}

      <section id="products" className="container mt-5">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : products.length > 0 ? (
          <div className="row">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <FaSearch size={50} className="text-muted mb-3" />
            <h3>No Products Found</h3>
            {keyword && (
              <p className="text-muted">
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
