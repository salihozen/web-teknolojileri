import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

export default function HomePage() {
  const { events } = useEvents();

  useEffect(() => {
    document.title = "Kampüs Etkinlikleri — Ana Sayfa";
  }, []);

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <section>
      <h2>Yaklaşan 2 Etkinlik</h2>
      <EventList events={upcoming} columnsClass="iki-sutun" />
      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/events" className="btn-ana">
          Tüm etkinlikleri gör
        </Link>
      </div>
    </section>
  );
}
