import type { EventFormData, EventFormErrors } from "../types/campus-event";

export function validateEvent(data: EventFormData): EventFormErrors {
  const errors: EventFormErrors = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = "En az 3 karakter olmalı.";
  }

  if (!data.category) {
    errors.category = "Bir kategori seçin.";
  }

  if (!data.date || data.date.trim() === "") {
    errors.date = "Tarih seçilmelidir.";
  }

  if (!data.time || data.time.trim() === "") {
    errors.time = "Saat belirtilmelidir.";
  }

  if (!data.location || data.location.trim() === "") {
    errors.location = "Yer belirtilmelidir.";
  }

  const capacity = Number(data.capacity);
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1000) {
    errors.capacity = "1 ile 1000 arası tam sayı.";
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = "Açıklama en az 10 karakter olmalı.";
  }

  return errors;
}
