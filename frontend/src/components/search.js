import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../styles/components/Search.css";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Clear search input when location changes (e.g., clicking logo)
  useEffect(() => {
    // Check if we're on the home page without a search query
    if (location.pathname === "/" && !location.search) {
      setKeyword("");
    }
  }, [location]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword.trim()}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={searchHandler} className="search-form">
      <div className="search-input-group">
        <input
          type="text"
          id="search_field"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
        />
        <button type="submit" id="search_btn" aria-label="Search">
          <FaSearch />
        </button>
      </div>
    </form>
  );
}
