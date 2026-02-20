import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cricketers } from "../data/cricketers";

export default function PlayerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const player = cricketers.find((c) => c.id === Number(id));

  if (!player) {
    return (
      <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="text-center">
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏏</div>
          <h2 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Player not found</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            This player doesn't exist in our database.
          </p>
          <button className="btn btn-accent" onClick={() => navigate("/search")}>
            Browse All Players
          </button>
        </div>
      </main>
    );
  }

  const roleColor = {
    Batsman: "#00c46a",
    Bowler: "#ff595e",
    "All-rounder": "#7851e6",
    "Wicket-keeper": "#ffa800",
  };

  const isBowler = player.role === "Bowler";
  const isKeeper = player.role === "Wicket-keeper";

  const careerStats = [
    { val: player.matches, lbl: "Matches" },
    { val: player.runs.toLocaleString(), lbl: "Runs" },
    { val: player.wickets, lbl: "Wickets" },
    { val: player.average, lbl: "Average" },
    { val: player.strikeRate, lbl: "Strike Rate" },
    { val: player.centuries, lbl: "Centuries" },
    { val: player.halfCenturies, lbl: "Half-Cents" },
    { val: player.highestScore, lbl: "Best Score" },
  ];

  return (
    <main className="profile-page">
      {/* ── Profile Hero ── */}
      <section className="profile-hero">
        <div className="container">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <button className="back-btn" onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left"></i>
              Back
            </button>
          </motion.div>

          <div className="row g-4 align-items-end pb-4">
            {/* Player Image */}
            <div className="col-md-4 col-lg-3">
              <motion.div
                className="profile-img-wrapper"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={player.image}
                  alt={player.name}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&size=600&background=00c46a&color=fff&bold=true&font-size=0.33`;
                  }}
                />
              </motion.div>
            </div>

            {/* Player Info */}
            <div className="col-md-8 col-lg-9">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                  <span
                    style={{
                      background: `${roleColor[player.role]}22`,
                      color: roleColor[player.role],
                      border: `1px solid ${roleColor[player.role]}44`,
                      borderRadius: "50px",
                      padding: "0.25rem 0.8rem",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {player.role}
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    Debut {player.debut}
                  </span>
                </div>

                <h1 className="profile-name">{player.name}</h1>
                <div className="profile-country">
                  {player.flag} {player.country}
                </div>
                <p className="profile-bio">{player.bio}</p>

                {/* Quick pills */}
                <div className="d-flex flex-wrap gap-2">
                  {[
                    { val: player.matches, lbl: "Matches" },
                    { val: player.runs.toLocaleString(), lbl: "Runs" },
                    { val: player.wickets, lbl: "Wickets" },
                    { val: player.centuries, lbl: "100s" },
                    { val: `${player.average}`, lbl: "Average" },
                  ].map(({ val, lbl }) => (
                    <div key={lbl} className="stat-pill">
                      <span className="stat-pill-val">{val}</span>
                      <span className="stat-pill-lbl">{lbl}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Profile Content ── */}
      <section className="profile-content">
        <div className="container">
          <div className="row g-4">
            {/* Left Column */}
            <div className="col-lg-7">
              {/* Career Stats */}
              <motion.div
                className="profile-section"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="profile-section-title">
                  <i className="bi bi-bar-chart-fill"></i>
                  Career Statistics
                </div>
                <div className="career-stats-grid">
                  {careerStats.map(({ val, lbl }) => (
                    <div key={lbl} className="career-stat-item">
                      <div className="career-stat-val">{val}</div>
                      <div className="career-stat-lbl">{lbl}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Matches */}
              {player.recentMatches && player.recentMatches.length > 0 && (
                <motion.div
                  className="profile-section"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="profile-section-title">
                    <i className="bi bi-calendar-event-fill"></i>
                    Recent Matches
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table className="matches-table">
                      <thead>
                        <tr>
                          <th>Match</th>
                          <th>Format</th>
                          <th>Score</th>
                          <th>Result</th>
                          <th>Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {player.recentMatches.map((m, i) => (
                          <motion.tr
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.06 }}
                          >
                            <td style={{ fontWeight: 500, color: "var(--text-primary)" }}>{m.match}</td>
                            <td>
                              <span
                                style={{
                                  background: "var(--accent-subtle)",
                                  color: "var(--accent)",
                                  border: "1px solid var(--border-accent)",
                                  borderRadius: "6px",
                                  padding: "0.15rem 0.5rem",
                                  fontSize: "0.72rem",
                                  fontWeight: 700,
                                }}
                              >
                                {m.format}
                              </span>
                            </td>
                            <td style={{ fontWeight: 600 }}>{m.score}</td>
                            <td>
                              <span className={`result-badge result-${m.result}`}>{m.result}</span>
                            </td>
                            <td style={{ color: "var(--text-muted)" }}>{m.year}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column */}
            <div className="col-lg-5">
              {/* Career Highlights */}
              <motion.div
                className="profile-section"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <div className="profile-section-title">
                  <i className="bi bi-trophy-fill"></i>
                  Career Highlights
                </div>
                <ul className="highlights-list">
                  {player.careerHighlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.08 }}
                    >
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Player Details Card */}
              <motion.div
                className="profile-section"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <div className="profile-section-title">
                  <i className="bi bi-person-badge-fill"></i>
                  Player Details
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  {[
                    { label: "Full Name", value: player.name, icon: "bi-person" },
                    { label: "Country", value: `${player.flag} ${player.country}`, icon: "bi-globe" },
                    { label: "Role", value: player.role, icon: "bi-shield-fill" },
                    { label: "Debut Year", value: player.debut, icon: "bi-calendar" },
                    { label: "Highest Score", value: player.highestScore, icon: "bi-graph-up" },
                  ].map(({ label, value, icon }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "0.8rem",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <i className={`bi ${icon} text-accent`}></i> {label}
                      </span>
                      <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Browse More */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <Link
                  to="/search"
                  className="btn btn-outline-accent w-100 py-2"
                  style={{ borderRadius: "12px" }}
                >
                  <i className="bi bi-search me-2"></i>
                  Browse More Players
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
