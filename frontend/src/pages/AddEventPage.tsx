import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/campus-event";
import EventForm from "../components/forms/EventForm";

const emptyForm: EventFormData = {
  title: "",
  category: "",
  capacity: "",
  date: "",
  time: "",
  location: "",
  description: ""
};

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Kampüs Etkinlikleri — Yeni Etkinlik Ekle";
  }, []);

  function handleSubmit(data: EventFormData) {
    addEvent(data);
    navigate("/admin");
  }

  return (
    <section>
      <div style={{ marginBottom: "1rem" }}>
        <Link to="/admin" className="geri-link" style={{ marginTop: 0 }}>
          ← Yönetim Paneline Dön
        </Link>
      </div>
      <h2>Yeni Etkinlik Ekle</h2>
      <EventForm
        initialData={emptyForm}
        onSubmit={handleSubmit}
        submitButtonText="Etkinliği Kaydet"
      />
    </section>
  );
}

