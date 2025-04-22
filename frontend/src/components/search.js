import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

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
      <div className="input-group search-input-group">
        <input
          type="text"
          id="search_field"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="form-control"
          placeholder="Search products..."
        />
        <div className="input-group-append">
          <button type="submit" id="search_btn" className="btn">
            <FaSearch />
          </button>
        </div>
      </div>
    </form>
  );
}
