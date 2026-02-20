import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cricketers, featuredCricketers, quickStats } from "../data/cricketers";

// ── Animated counter hook ──
function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ── Stat Counter Component ──
function StatCounter({ value, label, icon }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="col-6 col-md-3" ref={ref}>
      <motion.div
        className="stat-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div style={{ fontSize: "1.6rem", marginBottom: "0.3rem" }}>{icon}</div>
        <div className="stat-number">{count.toLocaleString()}</div>
        <div className="stat-label">{label}</div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const featured = featuredCricketers;
  const total = featured.length;

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  };

  const prev = () => setActiveSlide((s) => (s - 1 + total) % total);
  const next = () => setActiveSlide((s) => (s + 1) % total);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  const player = featured[activeSlide];

  return (
    <main>
      {/* ── Hero Section ── */}
      <section className="hero-section">
        <div className="hero-deco hero-deco-1" />
        <div className="hero-deco hero-deco-2" />
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <motion.div
                className="hero-badge"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <i className="bi bi-trophy-fill"></i>
                World's Greatest Cricketers
              </motion.div>

              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Discover{" "}
                <span className="gradient-text">Cricket</span>{" "}
                Legends
              </motion.h1>

              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Explore stats, career highlights, and profiles of 25+ international superstars
              </motion.p>

              <motion.div
                className="hero-search-wrapper d-flex justify-content-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <form className="hero-search-bar w-100" style={{ maxWidth: 580 }} onSubmit={handleSearch}>
                  <i className="bi bi-search" style={{ color: "var(--text-muted)", fontSize: "1rem" }}></i>
                  <input
                    type="text"
                    placeholder="Search cricketers, countries, roles..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search cricketers"
                  />
                  <button type="submit" className="hero-search-btn">
                    <i className="bi bi-search"></i>
                    Search
                  </button>
                </form>
              </motion.div>

              <motion.div
                className="d-flex justify-content-center gap-3 mt-4 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {["Batsmen", "Bowlers", "All-rounders", "Wicket-keepers"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => navigate(`/search?role=${tag.replace(/s$/, "").replace("Wicket-keeper", "Wicket-keeper")}`)}
                    style={{
                      background: "var(--accent-subtle)",
                      border: "1px solid var(--border-accent)",
                      color: "var(--accent)",
                      borderRadius: "50px",
                      padding: "0.3rem 0.9rem",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.target.style.background = "var(--accent)"; e.target.style.color = "white"; }}
                    onMouseLeave={(e) => { e.target.style.background = "var(--accent-subtle)"; e.target.style.color = "var(--accent)"; }}
                  >
                    {tag}
                  </button>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Stats ── */}
      <section className="stats-section">
        <div className="container">
          <div className="row g-3">
            <StatCounter value={quickStats.totalPlayers} label="Players" icon="👤" />
            <StatCounter value={quickStats.countries} label="Countries" icon="🌍" />
            <StatCounter value={quickStats.totalCenturies} label="Total Centuries" icon="💯" />
            <StatCounter value={quickStats.totalWickets} label="Total Wickets" icon="🏏" />
          </div>
        </div>
      </section>

      {/* ── Featured Carousel ── */}
      <section className="carousel-section">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="section-title">Featured Players</h2>
            <div className="carousel-controls d-flex gap-2">
              <button className="btn" onClick={prev} aria-label="Previous">
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="btn" onClick={next} aria-label="Next">
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={player.id}
              className="carousel-slide"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="row g-0">
                <div className="col-md-5 col-lg-4">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="carousel-player-img"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&size=600&background=00c46a&color=fff&bold=true`;
                    }}
                  />
                </div>
                <div className="col-md-7 col-lg-8 d-flex flex-column justify-content-center">
                  <div className="p-4 p-md-5">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className={`role-badge role-${player.role.replace(/[^a-zA-Z]/g, "-")} position-static`}>
                        {player.role}
                      </span>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                        {player.flag} {player.country}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.8rem" }}>
                      {player.name}
                    </h3>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "0.95rem", lineHeight: 1.7 }}>
                      {player.bio}
                    </p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {[
                        { val: player.matches, lbl: "Matches" },
                        { val: player.runs.toLocaleString(), lbl: "Runs" },
                        { val: player.centuries, lbl: "100s" },
                        { val: player.average, lbl: "Average" },
                      ].map(({ val, lbl }) => (
                        <div key={lbl} className="stat-pill">
                          <span className="stat-pill-val">{val}</span>
                          <span className="stat-pill-lbl">{lbl}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => navigate(`/player/${player.id}`)}
                      className="btn btn-accent px-4 py-2"
                    >
                      View Profile <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="d-flex justify-content-center gap-2 mt-3">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                style={{
                  width: i === activeSlide ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: "none",
                  background: i === activeSlide ? "var(--accent)" : "var(--border)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  padding: 0,
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse All ── */}
      <section style={{ padding: "3rem 0 5rem", background: "var(--bg-secondary)" }}>
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ fontWeight: 800, marginBottom: "0.75rem" }}>
              Browse All <span style={{ color: "var(--accent)" }}>25 Cricketers</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.8rem" }}>
              Filter by country, role, and search for your favorites
            </p>
            <button
              className="btn btn-accent px-5 py-3"
              style={{ fontSize: "1rem", borderRadius: "12px" }}
              onClick={() => navigate("/search")}
            >
              <i className="bi bi-search me-2"></i>
              Explore Players
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
