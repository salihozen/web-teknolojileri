import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();

  useEffect(() => {
    document.title = "Kampüs Etkinlikleri — Yönetim Paneli";
  }, []);

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  }

  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem"
        }}
      >
        <h2>Yönetim Paneli</h2>
        <Link to="/admin/new" className="btn-ana" style={{ marginTop: 0 }}>
          + Yeni etkinlik
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="message" role="status">
          <p>Henüz etkinlik yok.</p>
        </div>
      ) : (
        <>
          <p className="mobil-kaydir-ipucu">💡 Tabloyu sağa-sola kaydırarak tüm işlemleri görebilirsiniz.</p>
          <div className="tablo-sarmalayici">
          <table className="yonetim-tablosu">
            <thead>
              <tr>
                <th>Etkinlik</th>
                <th>Tarih</th>
                <th>Kategori</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>
                    <strong>{event.title}</strong>
                    <div style={{ fontSize: "0.85rem", color: "var(--renk-gri)" }}>
                      {event.location}
                    </div>
                  </td>
                  <td>
                    {formatDate(event.date)}, {event.time}
                  </td>
                  <td>
                    <span className="kategori-rozet">{event.category}</span>
                  </td>
                  <td>
                    <div className="tablo-islemler">
                      <Link
                        to={`/admin/${event.id}/edit`}
                        className="buton-duzenle"
                      >
                        Düzenle
                      </Link>
                      <button
                        type="button"
                        className="buton buton-sil"
                        onClick={() => handleDelete(event.id, event.title)}
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}
    </section>
  );
}

