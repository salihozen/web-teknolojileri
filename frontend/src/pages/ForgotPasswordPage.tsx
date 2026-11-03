import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Şifremi Unuttum | Kampüs Etkinlikleri";
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = email.trim() && email.includes("@")
      ? ""
      : "Geçerli bir e-posta adresi girin.";

    setError(found);
    setSent(found === "");
  }

  return (
    <section>
      <h2>Şifremi Unuttum</h2>
      <p style={{ color: "var(--renk-gri)", marginBottom: "1rem" }}>
        Kayıtlı e-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
      </p>

      {sent ? (
        <div className="message message-success" role="status">
          <p>Şifre sıfırlama bağlantısı {email} adresine gönderildi (demo).</p>
          <div style={{ marginTop: "1rem" }}>
            <Link to="/login" className="btn-ana">
              ← Girişe dön
            </Link>
          </div>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form-grup">
            <label htmlFor="forgot-email">E-posta</label>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              aria-invalid={error ? "true" : undefined}
              placeholder="ornek@kampus.edu.tr"
            />
            {error && <span className="field-error">{error}</span>}
          </div>

          <button type="submit" className="btn-ana" style={{ marginTop: "1rem" }}>
            Sıfırlama Bağlantısı Gönder
          </button>

          <div style={{ marginTop: "1.5rem", fontSize: "0.95rem" }}>
            <Link to="/login" className="detay-link">
              ← Girişe dön
            </Link>
          </div>
        </form>
      )}
    </section>
  );
}

