import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <p className="kategori">{event.category}</p>
      <p>
        Tarih: {formatDate(event.date)}, {event.time}
      </p>
      <p>Yer: {event.location}</p>
      <p>Kontenjan: {event.capacity} kişi</p>
      <p>{event.description}</p>
      <Link to={`/events/${event.id}`} className="detay-link">
        Detayları gör
      </Link>
    </article>
  );
}
