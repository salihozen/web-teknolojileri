import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import type { EventFormData } from "../types/campus-event";
import EventForm from "../components/forms/EventForm";
import NotFoundPage from "./NotFoundPage";

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = findEventById(events, id ?? "");

  useEffect(() => {
    if (event) {
      document.title = `${event.title} Düzenle | Kampüs Etkinlikleri`;
    }
  }, [event]);

  if (!event) {
    return <NotFoundPage />;
  }

  function handleSubmit(data: EventFormData) {
    if (!event) return;
    updateEvent(event.id, data);
    navigate("/admin");
  }

  return (
    <section>
      <div style={{ marginBottom: "1rem" }}>
        <Link to="/admin" className="geri-link" style={{ marginTop: 0 }}>
          ← Yönetim Paneline Dön
        </Link>
      </div>
      <h2>Etkinlik Düzenle: {event.title}</h2>
      <EventForm
        initialData={{
          title: event.title,
          category: event.category,
          capacity: String(event.capacity),
          date: event.date,
          time: event.time,
          location: event.location,
          description: event.description
        }}
        onSubmit={handleSubmit}
        submitButtonText="Değişiklikleri Kaydet"
      />
    </section>
  );
}
