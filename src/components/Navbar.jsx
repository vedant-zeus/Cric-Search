import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="crci-navbar navbar navbar-expand-md">
      <div className="container">
        <Link to="/" className="navbar-brand">
          🏏 CricSearch
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ color: "var(--text-primary)", fontSize: "1.2rem" }}
        >
          <i className="bi bi-list"></i>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-center gap-1">
            <li className="nav-item">
              <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
                <i className="bi bi-house me-1"></i>Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
                <i className="bi bi-search me-1"></i>Search
              </NavLink>
            </li>
            <li className="nav-item ms-2">
              <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "dark" ? (
                  <>
                    <i className="bi bi-sun-fill"></i>
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-moon-stars-fill"></i>
                    <span>Dark</span>
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
