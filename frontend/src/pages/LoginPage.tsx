import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Giriş Yap | Kampüs Etkinlikleri";
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};

    if (!email.trim() || !email.includes("@")) {
      found.email = "Geçerli bir e-posta adresi girin.";
    }

    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalıdır.";
    }

    setErrors(found);
    const isValid = Object.keys(found).length === 0;
    setSent(isValid);
  }

  return (
    <section>
      <h2>Giriş Yap</h2>
      {sent ? (
        <div className="message message-success" role="status">
          <p>Giriş başarılı! (Gerçek giriş Sprint 10'da bağlanacak)</p>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form-grup">
            <label htmlFor="login-email">E-posta</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              aria-invalid={errors.email ? "true" : undefined}
              placeholder="ornek@kampus.edu.tr"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-grup">
            <label htmlFor="login-password">Şifre</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              aria-invalid={errors.password ? "true" : undefined}
              placeholder="En az 6 karakter"
            />
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="btn-ana" style={{ marginTop: "1rem" }}>
            Giriş Yap
          </button>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              marginTop: "1.5rem",
              fontSize: "0.95rem"
            }}
          >
            <Link to="/forgot-password" className="detay-link">
              Şifremi unuttum
            </Link>
            <Link to="/register" className="detay-link">
              Hesabın yok mu? Kayıt ol
            </Link>
          </div>
        </form>
      )}
    </section>
  );
}
