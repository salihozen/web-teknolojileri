import { events, formatDate, escapeHTML } from "./data.js";

const container = document.querySelector("#detay");
const heading = document.querySelector("#detay-baslik");
const id = new URLSearchParams(location.search).get("id");
const event = events.find((item) => item.id === id);

if (!event) {
  if (heading) heading.textContent = "Etkinlik bulunamadı";
  document.title = "Etkinlik bulunamadı | Kampüs Etkinlikleri";
  if (container) {
    container.innerHTML = `
      <div class="message message-error" role="alert">
        <p>"${escapeHTML(id || "")}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
      </div>
      <a class="geri-link" href="etkinlikler.html">← Listeye dön</a>`;
  }
} else {
  if (heading) heading.textContent = event.title;
  document.title = `${event.title} | Kampüs Etkinlikleri`;

  const poster = event.image ? `
      <div class="detay-gorsel">
        <figure>
          <img src="${escapeHTML(event.image)}" alt="${escapeHTML(event.title)} Afişi">
          <figcaption style="font-size:0.85rem; color:var(--renk-gri); margin-top:0.3rem;">Şekil 1: Etkinlik afişi</figcaption>
        </figure>
      </div>` : "";

  if (container) {
    container.innerHTML = `
      <div class="detay-konteyner">
        ${poster}
        <div class="detay-bilgi">
          <dl>
            <dt>Tarih</dt>
            <dd>${escapeHTML(formatDate(event.date))}, ${escapeHTML(event.time)}</dd>
            
            <dt>Yer</dt>
            <dd>${escapeHTML(event.location)}</dd>
            
            <dt>Kategori</dt>
            <dd>${escapeHTML(event.category)}</dd>
            
            <dt>Kontenjan</dt>
            <dd>${escapeHTML(event.capacity || "Belirtilmedi")}</dd>
          </dl>
          <p>${escapeHTML(event.description)}</p>
          <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
            <a href="etkinlikler.html" class="geri-link">← Listeye dön</a>
            <a href="etkinlik-guncelle.html?id=${encodeURIComponent(event.id)}" class="geri-link" style="color: white; background: var(--renk-ana); padding: 0.5rem 1rem; border-radius: var(--kose);">Bu etkinliği güncelle</a>
          </div>
        </div>
      </div>`;
  }
}
