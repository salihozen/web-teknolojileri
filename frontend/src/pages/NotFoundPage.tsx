import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "Sayfa Bulunamadı | Kampüs Etkinlikleri";
  }, []);

  return (
    <section>
      <h2>Sayfa Bulunamadı</h2>
      <div className="message message-error" role="alert">
        <p>Aradığınız sayfa veya etkinlik bulunamadı. Lütfen adresi kontrol edin.</p>
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/" className="btn-ana">
          ← Ana Sayfaya Dön
        </Link>
      </div>
    </section>
  );
}
