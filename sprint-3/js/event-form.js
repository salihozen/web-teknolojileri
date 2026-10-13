import { events, dateToISO, escapeHTML } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const message = document.querySelector("#form-mesaj");
const formIntro = document.querySelector(".form-intro");
const mode = form.dataset.mode;
const params = new URLSearchParams(location.search);
const id = params.get("id");
let editingEvent = null;

if (mode === "guncelle") {
  editingEvent = events.find((event) => event.id === id);
  if (!editingEvent) {
    formIntro.hidden = true;
    form.outerHTML = `
      <div class="message message-error" role="alert">
        <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
      </div>
      <a class="button" href="etkinlikler.html">Etkinliklere git</a>`;
  } else {
    form.elements.ad.value = editingEvent.title;
    form.elements.kategori.value = editingEvent.category;
    form.elements.tarih.value = dateToISO(editingEvent.date);
    form.elements.saat.value = editingEvent.time;
    form.elements.yer.value = editingEvent.location;
    form.elements.kontenjan.value = editingEvent.capacity;
    form.elements.aciklama.value = editingEvent.description;
  }
}

if (mode !== "guncelle" || editingEvent) {
  form.addEventListener("input", clearFieldError);
  form.addEventListener("change", clearFieldError);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearAllErrors();

    const values = new FormData(form);
    const data = {
      id: editingEvent?.id ?? "event-7",
      title: String(values.get("ad") ?? "").trim(),
      category: String(values.get("kategori") ?? ""),
      date: String(values.get("tarih") ?? ""),
      time: String(values.get("saat") ?? ""),
      location: String(values.get("yer") ?? "").trim(),
      capacity: values.get("kontenjan") ? Number(values.get("kontenjan")) : null,
      description: String(values.get("aciklama") ?? "").trim()
    };
    console.log(data);

    const errors = validate(data);
    for (const [field, text] of Object.entries(errors)) {
      showFieldError(field, text);
    }

    if (Object.keys(errors).length) {
      message.className = "message message-error";
      message.textContent = "Formda hatalı alanlar var.";
      message.hidden = false;
      form.querySelector(`[name="${Object.keys(errors)[0]}"]`).focus();
      return;
    }

    message.className = "message message-success";
    const label = mode === "guncelle"
      ? "Etkinlik güncellendi (bu sprintte kalıcı olarak kaydedilmez):"
      : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";
    message.innerHTML = `
      <p>${label}</p>
      <pre>${escapeHTML(JSON.stringify(data, null, 2))}</pre>`;
    message.hidden = false;
  });
}

function validate(data) {
  const errors = {};
  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (!events.some((event) => event.category === data.category)) {
    errors.kategori = "Bir kategori seçin.";
  }
  if (!data.date) errors.tarih = "Tarih seçin.";
  if (!data.time) errors.saat = "Saat seçin.";
  if (!data.location) errors.yer = "Yer bilgisini yazın.";
  if (data.capacity !== null && (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)) {
    errors.kontenjan = "Kontenjan 1–1000 arasında olmalı.";
  }
  return errors;
}

function showFieldError(name, text) {
  const field = form.elements[name];
  const error = document.querySelector(`#${name}-hata`);
  field.setAttribute("aria-invalid", "true");
  error.textContent = text;
}

function clearFieldError(event) {
  if (!event.target.name) return;
  const error = document.querySelector(`#${event.target.name}-hata`);
  if (error) error.textContent = "";
  event.target.removeAttribute("aria-invalid");
  message.hidden = true;
}

function clearAllErrors() {
  form.querySelectorAll("[aria-invalid='true']").forEach((field) => field.removeAttribute("aria-invalid"));
  form.querySelectorAll(".field-error").forEach((field) => { field.textContent = ""; });
}
