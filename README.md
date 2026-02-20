# 🏏 CricSearch — Interactive Cricketer Search Website

A modern, fully responsive 3-page React application for discovering and exploring international cricket legends. Features dark/light theme, smooth animations, and live search with filters.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite) ![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF0461)

---

## ✨ Features

- **3 Pages** — Home, Search Results, Player Profile
- **25 Famous Cricketers** — Full mock data with stats, career highlights & recent matches
- **Live Filters** — Search by name, filter by country & role, synced to URL params
- **Dark / Light Theme** — Toggleable, persisted via `localStorage`
- **Smooth Animations** — Framer Motion entrance animations, `AnimatePresence` carousel, stagger grids
- **Animated Stat Counters** — IntersectionObserver-triggered count-up on the home page
- **Fully Responsive** — Bootstrap 5 grid, mobile-first layout

---

## 🗂️ Pages

| Route | Page | Description |
|---|---|---|
| `/` | **Home** | Hero with search bar, featured carousel, quick stats |
| `/search` | **Search Results** | Filterable grid of all 25 players |
| `/player/:id` | **Player Profile** | Detailed stats, highlights, recent matches |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite 7](https://vite.dev) | Build tool & dev server |
| [React Router v6](https://reactrouter.com) | Client-side routing |
| [Bootstrap 5](https://getbootstrap.com) | Responsive layout & components |
| [Bootstrap Icons](https://icons.getbootstrap.com) | Icon library |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Install & Run

```bash
# Clone or open the project directory
cd crci-dash

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Build completes in ~3 seconds with zero errors.

---

## 📁 Project Structure

```
src/
├── data/
│   └── cricketers.js          # Mock data — 25 cricketers
├── context/
│   └── ThemeContext.jsx        # Dark/Light theme provider
├── components/
│   ├── Navbar.jsx              # Sticky nav with theme toggle
│   └── CricketCard.jsx         # Reusable player card
├── pages/
│   ├── Home.jsx                # Page 1
│   ├── SearchResults.jsx       # Page 2
│   └── PlayerProfile.jsx       # Page 3
├── App.jsx                     # Router setup
├── main.jsx                    # Entry point
└── index.css                   # Global styles & CSS theme variables
```

---

## 🎨 Design

- CSS custom properties for both dark and light themes (`[data-theme="dark/light"]`)
- Cricket-green accent (`#00c46a`) with glow effects
- Glassmorphism navbar with `backdrop-filter`
- Role-coloured badges: 🟢 Batsman · 🔴 Bowler · 🟣 All-rounder · 🟡 Wicket-keeper

---

## 🏏 Featured Cricketers

Sachin Tendulkar, Virat Kohli, Rohit Sharma, MS Dhoni, Jasprit Bumrah, Steve Smith, Pat Cummins, David Warner, Joe Root, Ben Stokes, Kane Williamson, Babar Azam, Shaheen Afridi, Shakib Al Hasan, Kagiso Rabada, Quinton de Kock, Rashid Khan, Suryakumar Yadav, Hardik Pandya, Lasith Malinga, AB de Villiers, Ricky Ponting, Wasim Akram, Brian Lara, and Jason Holder.
