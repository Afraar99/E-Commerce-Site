import Search from "./search";

export default function Header() {
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <a href="/" style={{ textDecoration: "none" }}>
            <h1
              style={{
                fontFamily: "Arial, sans-serif",
                color: "#FEBD69",
                fontWeight: "bold",
              }}
            >
              A<span style={{ color: "#6c757d" }}>zone</span>
            </h1>
          </a>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <span id="cart" className="ml-3">
          Cart
        </span>
        <span className="ml-1" id="cart_count">
          2
        </span>
      </div>
    </nav>
  );
}
