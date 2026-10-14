import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  searchEvents,
  filterByCategory,
  findEventById
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

function formatDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  let currentTitle = "Ana Sayfa";
  let headerHeading = "Kampüs Etkinlikleri";
  let headerSubtitle =
    "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";

  if (page === "events") {
    currentTitle = "Tüm Etkinlikler";
    headerHeading = "Tüm Etkinlikler";
    headerSubtitle = "Ekim ayında kampüste düzenlenen etkinlikler.";
  } else if (page === "detail") {
    currentTitle = selected ? selected.title : "Etkinlik bulunamadı";
    headerHeading = currentTitle;
    headerSubtitle = "";
  } else if (page === "add") {
    currentTitle = "Etkinlik Ekle";
    headerHeading = "Etkinlik Ekle";
    headerSubtitle = "";
  } else if (page === "update") {
    currentTitle = "Etkinlik Güncelle";
    headerHeading = "Etkinlik Güncelle";
    headerSubtitle = "";
  }

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${currentTitle}`;
  }, [currentTitle]);

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories = [...new Set(events.map((e) => e.category))];

  const filtered = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p className="kategori">{event.category}</p>
        <p>
          Tarih: {formatDate(event.date)}, {event.time}
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a
          href={`#detail-${event.id}`}
          className="detay-link"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  const navItems: { label: string; page: PageName }[] = [
    { label: "Ana Sayfa", page: "home" },
    { label: "Etkinlikler", page: "events" },
    { label: "Ekle", page: "add" }
  ];

  return (
    <>
      <header className="site-baslik">
        <h1>{headerHeading}</h1>
        {headerSubtitle && <p>{headerSubtitle}</p>}
        <nav className="menu">
          <ul>
            {navItems.map((item) => (
              <li key={item.page}>
                <a
                  href={`#${item.page}`}
                  aria-current={page === item.page ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.page);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlikler-grid iki-sutun">
              {upcoming.map(renderCard)}
            </section>
            <div>
              <button
                type="button"
                className="btn-ana"
                onClick={() => go("events")}
              >
                Tüm etkinlikleri gör
              </button>
            </div>
          </>
        )}

        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div className="form-grup">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  id="arama"
                  type="search"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="form-grup">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as Category | "")
                  }
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p className="sonuc-metni">
              {filtered.length === 0
                ? "bulunamadı"
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlikler-grid uc-sutun">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <div>
            <div className="message message-error" role="alert">
              <p>Etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
            </div>
            <a
              href="#events"
              className="geri-link"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              ← Listeye dön
            </a>
          </div>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            <div className="detay-konteyner">
              {selected.image && (
                <div className="detay-gorsel">
                  <figure>
                    <img src={selected.image} alt={`${selected.title} afişi`} />
                    <figcaption
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--renk-gri)",
                        marginTop: "0.3rem"
                      }}
                    >
                      {selected.title} afişi
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
                      {formatDate(selected.date)}, {selected.time}
                    </dd>
                    <dt>Yer</dt>
                    <dd>{selected.location}</dd>
                    <dt>Kategori</dt>
                    <dd>{selected.category}</dd>
                    <dt>Kontenjan</dt>
                    <dd>{selected.capacity} kişi</dd>
                  </dl>
                </section>
                <section style={{ marginTop: "1.5rem" }}>
                  <h2>Açıklama</h2>
                  <p>{selected.description}</p>
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
                  <a
                    href="#events"
                    className="geri-link"
                    style={{ marginTop: 0 }}
                    onClick={(e) => {
                      e.preventDefault();
                      go("events");
                    }}
                  >
                    ← Listeye dön
                  </a>
                  <button
                    type="button"
                    className="geri-link"
                    style={{
                      marginTop: 0,
                      color: "white",
                      backgroundColor: "var(--renk-ana)",
                      padding: "0.5rem 1rem",
                      borderRadius: "var(--kose)",
                      border: "none",
                      cursor: "pointer",
                      lineHeight: "normal",
                      minHeight: "auto",
                      fontFamily: "inherit",
                      fontSize: "0.95rem"
                    }}
                    onClick={() => go("update", selected.id)}
                  >
                    Bu etkinliği güncelle
                  </button>
                </div>
              </div>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <section>
            <h2>
              {page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}
            </h2>
            <p className="form-intro">
              Bu sprintte form sadece görünüm; kayıt yapılmaz.
            </p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-grup">
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  id="title"
                  maxLength={80}
                  placeholder="Örn. Kariyer Günleri 2026"
                />
              </div>

              <div className="form-grup">
                <label htmlFor="category">Kategori</label>
                <select id="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>

              <div className="form-grup">
                <label htmlFor="date">Tarih</label>
                <input type="date" id="date" />
              </div>

              <div className="form-grup">
                <label htmlFor="time">Saat</label>
                <input type="time" id="time" />
              </div>

              <div className="form-grup">
                <label htmlFor="location">Yer</label>
                <input
                  type="text"
                  id="location"
                  placeholder="Örn. A Blok Konferans Salonu"
                />
              </div>

              <div className="form-grup">
                <label htmlFor="capacity">Kontenjan</label>
                <input type="number" id="capacity" min={1} max={1000} />
              </div>

              <div className="form-grup">
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" rows={5} />
              </div>

              <button type="submit">Kaydet</button>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>Ömer Salih Özen · 2416501011 · 2026</p>
      </footer>
    </>
  );
}

export default App;
