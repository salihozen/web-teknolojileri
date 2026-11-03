import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  columnsClass?: string;
}

export default function EventList({
  events,
  columnsClass = "uc-sutun"
}: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="message" role="status">
        <p>Henüz etkinlik yok veya aranan kriterlere uygun etkinlik bulunamadı.</p>
      </div>
    );
  }

  return (
    <section className={`etkinlikler-grid ${columnsClass}`}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

