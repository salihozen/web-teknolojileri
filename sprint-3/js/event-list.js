import { events, formatDate, escapeHTML, dateToISO } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

function createCard(event) {
  return `
    <article class="kart">
      <h3>${escapeHTML(event.title)}</h3>
      <p><strong>Tarih:</strong> ${escapeHTML(formatDate(event.date))} - ${escapeHTML(event.time)}</p>
      <p><strong>Mekan:</strong> ${escapeHTML(event.location)}</p>
      <p><strong>Kategori:</strong> ${escapeHTML(event.category)}</p>
      <p>${escapeHTML(event.description)}</p>
      <div style="display: flex; gap: 0.5rem; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
        <a href="etkinlik-detay.html?id=${encodeURIComponent(event.id)}" class="detay-link">Detaylar &rarr;</a>
      </div>
    </article>`;
}

function render(items) {
  list.innerHTML = items.map(createCard).join("");
}

if (list.dataset.limit) {
  const upcoming = [...events]
    .sort((a, b) => dateToISO(a.date).localeCompare(dateToISO(b.date)))
    .slice(0, Number(list.dataset.limit));
  render(upcoming);
} else {
  render(events);

  const filterForm = document.querySelector("#filtre-formu");
  const search = document.querySelector("#arama");
  const categorySelect = document.querySelector("#kategori-filtre");
  const resultLine = document.querySelector("#sonuc");

  for (const category of new Set(events.map((event) => event.category))) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  }

  function filterEvents() {
    const term = search.value.trim().toLocaleLowerCase("tr-TR");
    const selectedCategory = categorySelect.value;
    const filtered = events.filter((event) => {
      const searchableText = `${event.title} ${event.category} ${event.location} ${event.description}`
        .toLocaleLowerCase("tr-TR");
      const textMatches = searchableText.includes(term);
      const categoryMatches = !selectedCategory || event.category === selectedCategory;
      return textMatches && categoryMatches;
    });

    render(filtered);
    resultLine.textContent = filtered.length
      ? `${filtered.length} etkinlik listeleniyor.`
      : "Aramanıza uygun etkinlik bulunamadı.";
  }

  filterForm.addEventListener("submit", (event) => event.preventDefault());
  search.addEventListener("input", filterEvents);
  categorySelect.addEventListener("change", filterEvents);
  resultLine.textContent = `${events.length} etkinlik listeleniyor.`;
}