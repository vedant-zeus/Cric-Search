import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { cricketers, countries, roles } from "../data/cricketers";
import CricketCard from "../components/CricketCard";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [country, setCountry] = useState(searchParams.get("country") || "");
  const [role, setRole] = useState(() => {
    const rawRole = searchParams.get("role") || "";
    // Normalise: "Batsmen" -> "Batsman", "Bowlers" -> "Bowler", etc.
    if (rawRole.endsWith("s") && !rawRole.endsWith("ers")) return rawRole.slice(0, -1);
    return rawRole;
  });

  // Sync URL params
  useEffect(() => {
    const params = {};
    if (query) params.q = query;
    if (country) params.country = country;
    if (role) params.role = role;
    setSearchParams(params, { replace: true });
  }, [query, country, role]);

  const filtered = useMemo(() => {
    return cricketers.filter((c) => {
      const qMatch =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.country.toLowerCase().includes(query.toLowerCase()) ||
        c.role.toLowerCase().includes(query.toLowerCase());
      const countryMatch = !country || c.country === country;
      const roleMatch = !role || c.role === role;
      return qMatch && countryMatch && roleMatch;
    });
  }, [query, country, role]);

  const clearFilters = () => {
    setQuery("");
    setCountry("");
    setRole("");
  };

  const hasFilters = query || country || role;

  return (
    <main className="search-page">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pt-2 pb-2"
        >
          <h1 className="section-title mb-1" style={{ fontSize: "1.6rem" }}>
            Search Players
          </h1>
          <p className="results-count mb-3">
            Showing <strong style={{ color: "var(--accent)" }}>{filtered.length}</strong> of {cricketers.length} cricketers
          </p>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          className="filters-bar"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Search input */}
          <div style={{ flex: "2 1 200px", position: "relative" }}>
            <i
              className="bi bi-search"
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              className="filter-input form-control"
              placeholder="Search by name, country, role..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ paddingLeft: "2.2rem" }}
              aria-label="Search players"
            />
          </div>

          {/* Country filter */}
          <select
            className="filter-select form-select"
            style={{ flex: "1 1 140px" }}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            aria-label="Filter by country"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Role filter */}
          <select
            className="filter-select form-select"
            style={{ flex: "1 1 140px" }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Filter by role"
          >
            <option value="">All Roles</option>
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          {/* Clear */}
          {hasFilters && (
            <button
              className="btn btn-outline-accent"
              onClick={clearFilters}
              style={{ flex: "0 0 auto", whiteSpace: "nowrap" }}
            >
              <i className="bi bi-x-circle me-1"></i>Clear
            </button>
          )}
        </motion.div>

        {/* Active Filter Chips */}
        {hasFilters && (
          <div className="d-flex flex-wrap gap-2 mb-3">
            {query && (
              <span
                style={{
                  background: "var(--accent-subtle)",
                  border: "1px solid var(--border-accent)",
                  color: "var(--accent)",
                  borderRadius: "50px",
                  padding: "0.2rem 0.8rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                🔍 {query}
                <i
                  className="bi bi-x"
                  style={{ cursor: "pointer" }}
                  onClick={() => setQuery("")}
                />
              </span>
            )}
            {country && (
              <span
                style={{
                  background: "var(--accent-subtle)",
                  border: "1px solid var(--border-accent)",
                  color: "var(--accent)",
                  borderRadius: "50px",
                  padding: "0.2rem 0.8rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                🌍 {country}
                <i
                  className="bi bi-x"
                  style={{ cursor: "pointer" }}
                  onClick={() => setCountry("")}
                />
              </span>
            )}
            {role && (
              <span
                style={{
                  background: "var(--accent-subtle)",
                  border: "1px solid var(--border-accent)",
                  color: "var(--accent)",
                  borderRadius: "50px",
                  padding: "0.2rem 0.8rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                🏏 {role}
                <i
                  className="bi bi-x"
                  style={{ cursor: "pointer" }}
                  onClick={() => setRole("")}
                />
              </span>
            )}
          </div>
        )}

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <motion.div
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="no-results-icon">🏏</span>
            <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>No players found</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Try adjusting your search or filters
            </p>
            <button className="btn btn-accent" onClick={clearFilters}>
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="row g-4">
            {filtered.map((cricketer, index) => (
              <div key={cricketer.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <CricketCard cricketer={cricketer} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
