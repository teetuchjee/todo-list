import { Link, useLocation } from "react-router-dom";

import "./header.css";

const Header = () => {
  const location = useLocation();
  return (
    <div className="header-container space-x-3 p-3">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h3 className="logo cursor-pointer">TO DO LIST</h3>
      </Link>
      <Link to="/" style={{ textDecoration: "none" }}>
        <span className={`menu ${location.pathname == "/" && "active"}`}>
          Home
        </span>
      </Link>
      <Link to="/history" style={{ textDecoration: "none" }}>
        <span className={`menu ${location.pathname == "/history" && "active"}`}>
          History
        </span>
      </Link>
    </div>
  );
};

export default Header;
