import { NavLink, useLocation } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { findEventById } from "../../utils/filter-events";

const menu = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/events", label: "Etkinlikler" },
  { to: "/admin", label: "Yönetim" },
  { to: "/login", label: "Giriş" },
];

export default function Navigation() {
  const location = useLocation();
  const { events } = useEvents();

  // /events/:id kontrolü
  const detailMatch = location.pathname.match(/^\/events\/([^/]+)$/);
  const detailId = detailMatch ? detailMatch[1] : null;
  const currentDetailEvent = detailId ? findEventById(events, detailId) : null;

  return (
    <nav className="menu" aria-label="Ana menü">
      <ul>
        {menu.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => (isActive ? "aktif" : undefined)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
        {currentDetailEvent && (
          <li key="nav-detail">
            <span
              className="nav-detay-etiket"
              aria-current="page"
              style={{
                backgroundColor: "var(--renk-beyaz)",
                color: "var(--renk-ana)",
                fontWeight: "bold",
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
                display: "inline-block",
                minHeight: "44px",
                lineHeight: "28px",
                border: "1px solid rgba(255, 255, 255, 0.4)"
              }}
            >
              Etkinlik: {currentDetailEvent.title}
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
}
