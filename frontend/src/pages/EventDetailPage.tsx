import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import EventDetail from "../components/events/EventDetail";
import NotFoundPage from "./NotFoundPage";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { events } = useEvents();

  const event = findEventById(events, id ?? "");

  useEffect(() => {
    if (event) {
      document.title = `${event.title} | Kampüs Etkinlikleri`;
    } else {
      document.title = "Sayfa Bulunamadı | Kampüs Etkinlikleri";
    }
  }, [event]);

  if (!event) {
    return <NotFoundPage />;
  }

  return (
    <section>
      <h2>{event.title}</h2>
      <EventDetail event={event} />
    </section>
  );
}
