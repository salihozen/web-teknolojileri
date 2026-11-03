import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <article className="detay">
      <div className="detay-konteyner">
        {event.image && (
          <div className="detay-gorsel">
            <figure>
              <img src={event.image} alt={`${event.title} afişi`} />
              <figcaption
                style={{
                  fontSize: "0.85rem",
                  color: "var(--renk-gri)",
                  marginTop: "0.3rem"
                }}
              >
                {event.title} afişi
              </figcaption>
            </figure>
          </div>
        )}
        <div className="detay-bilgi">
          <section>
            <h2>Etkinlik Künyesi</h2>
            <dl>
              <dt>Tarih</dt>
              <dd>
                {formatDate(event.date)}, {event.time}
              </dd>
              <dt>Yer</dt>
              <dd>{event.location}</dd>
              <dt>Kategori</dt>
              <dd>{event.category}</dd>
              <dt>Kontenjan</dt>
              <dd>{event.capacity} kişi</dd>
            </dl>
          </section>
          <section style={{ marginTop: "1.5rem" }}>
            <h2>Açıklama</h2>
            <p>{event.description}</p>
          </section>
          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center"
            }}
          >
            <Link to="/events" className="geri-link" style={{ marginTop: 0 }}>
              ← Listeye dön
            </Link>
            <Link
              to={`/admin/${event.id}/edit`}
              className="btn-ana"
              style={{ marginTop: 0 }}
            >
              Bu etkinliği güncelle
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
