import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const roleClass = (role) => role.replace(/[^a-zA-Z]/g, "-");

export default function CricketCard({ cricketer, index = 0 }) {
  const { id, name, country, flag, role, image, matches, runs, wickets, centuries, average } = cricketer;

  const isWicketKeeper = role === "Wicket-keeper";
  const isBowler = role === "Bowler";

  const stat1Val = isBowler ? wickets : runs;
  const stat1Lbl = isBowler ? "Wickets" : "Runs";
  const stat2Val = isBowler ? average : centuries;
  const stat2Lbl = isBowler ? "Average" : "100s";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
    >
      <Link to={`/player/${id}`} className="cricket-card" style={{ textDecoration: "none" }}>
        <div className="card-img-wrapper">
          <img
            src={image}
            alt={name}
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=00c46a&color=fff&bold=true`;
            }}
          />
          <div className="card-img-overlay-gradient" />
          <span className={`role-badge role-${roleClass(role)}`}>{role}</span>
        </div>
        <div className="card-body-custom">
          <div className="card-player-name">{name}</div>
          <div className="card-country">
            {flag} {country}
          </div>
          <div className="card-stats-row">
            <div className="card-stat">
              <div className="card-stat-val">{matches}</div>
              <div className="card-stat-lbl">Matches</div>
            </div>
            <div className="card-stat">
              <div className="card-stat-val">{stat1Val.toLocaleString()}</div>
              <div className="card-stat-lbl">{stat1Lbl}</div>
            </div>
            <div className="card-stat">
              <div className="card-stat-val">{stat2Val}</div>
              <div className="card-stat-lbl">{stat2Lbl}</div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
