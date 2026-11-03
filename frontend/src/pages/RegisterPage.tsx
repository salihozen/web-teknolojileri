import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Kayıt Ol | Kampüs Etkinlikleri";
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: RegisterErrors = {};

    if (name.trim().length < 3) {
      found.name = "Ad Soyad en az 3 karakter olmalıdır.";
    }

    if (!email.trim() || !email.includes("@")) {
      found.email = "Geçerli bir e-posta adresi girin.";
    }

    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalıdır.";
    }

    if (password2 !== password) {
      found.password2 = "Şifreler aynı değil.";
    }

    setErrors(found);
    const isValid = Object.keys(found).length === 0;
    setSent(isValid);
  }

  return (
    <section>
      <h2>Kayıt Ol</h2>
      {sent ? (
        <div className="message message-success" role="status">
          <p>Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz (Demo).</p>
          <div style={{ marginTop: "1rem" }}>
            <Link to="/login" className="btn-ana">
              Giriş Yap
            </Link>
          </div>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form-grup">
            <label htmlFor="reg-name">Ad Soyad</label>
            <input
              id="reg-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              aria-invalid={errors.name ? "true" : undefined}
              placeholder="Örn. Ahmet Yılmaz"
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-grup">
            <label htmlFor="reg-email">E-posta</label>
            <input
              id="reg-email"
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
            <label htmlFor="reg-password">Şifre</label>
            <input
              id="reg-password"
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

          <div className="form-grup">
            <label htmlFor="reg-password2">Şifre (Tekrar)</label>
            <input
              id="reg-password2"
              type="password"
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
                if (errors.password2) setErrors((prev) => ({ ...prev, password2: undefined }));
              }}
              aria-invalid={errors.password2 ? "true" : undefined}
              placeholder="Şifrenizi tekrar girin"
            />
            {errors.password2 && (
              <span className="field-error">{errors.password2}</span>
            )}
          </div>

          <button type="submit" className="btn-ana" style={{ marginTop: "1rem" }}>
            Kayıt Ol
          </button>

          <div style={{ marginTop: "1.5rem", fontSize: "0.95rem" }}>
            <Link to="/login" className="detay-link">
              Zaten hesabın var mı? Giriş yap
            </Link>
          </div>
        </form>
      )}
    </section>
  );
}
