import { useState, type ChangeEvent, type FormEvent } from "react";
import type { EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  onSubmit: (data: EventFormData) => void;
  submitButtonText?: string;
}

export default function EventForm({
  initialData,
  onSubmit,
  submitButtonText = "Kaydet"
}: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Alan yazılırken hatayı temizleme
    if (errors[name as keyof EventFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const foundErrors = validateEvent(data);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length === 0) {
      onSubmit(data);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-grup">
        <label htmlFor="title">Etkinlik Adı</label>
        <input
          id="title"
          name="title"
          type="text"
          value={data.title}
          onChange={handleChange}
          aria-invalid={errors.title ? "true" : undefined}
          placeholder="Örn. Kariyer Günleri 2026"
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </div>

      <div className="form-grup">
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          aria-invalid={errors.category ? "true" : undefined}
        >
          <option value="">Seçiniz</option>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
        </select>
        {errors.category && (
          <span className="field-error">{errors.category}</span>
        )}
      </div>

      <div className="form-grup">
        <label htmlFor="date">Tarih</label>
        <input
          id="date"
          name="date"
          type="date"
          value={data.date}
          onChange={handleChange}
          aria-invalid={errors.date ? "true" : undefined}
        />
        {errors.date && <span className="field-error">{errors.date}</span>}
      </div>

      <div className="form-grup">
        <label htmlFor="time">Saat</label>
        <input
          id="time"
          name="time"
          type="time"
          value={data.time}
          onChange={handleChange}
          aria-invalid={errors.time ? "true" : undefined}
        />
        {errors.time && <span className="field-error">{errors.time}</span>}
      </div>

      <div className="form-grup">
        <label htmlFor="location">Yer</label>
        <input
          id="location"
          name="location"
          type="text"
          value={data.location}
          onChange={handleChange}
          aria-invalid={errors.location ? "true" : undefined}
          placeholder="Örn. A Blok Konferans Salonu"
        />
        {errors.location && (
          <span className="field-error">{errors.location}</span>
        )}
      </div>

      <div className="form-grup">
        <label htmlFor="capacity">Kontenjan</label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          value={data.capacity}
          onChange={handleChange}
          aria-invalid={errors.capacity ? "true" : undefined}
          placeholder="Örn. 50"
        />
        {errors.capacity && (
          <span className="field-error">{errors.capacity}</span>
        )}
      </div>

      <div className="form-grup">
        <label htmlFor="description">Açıklama</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={data.description}
          onChange={handleChange}
          aria-invalid={errors.description ? "true" : undefined}
          placeholder="Etkinlik hakkında detaylı bilgi verin (en az 10 karakter)"
        />
        {errors.description && (
          <span className="field-error">{errors.description}</span>
        )}
      </div>

      <button type="submit" className="btn-ana" style={{ marginTop: "1rem" }}>
        {submitButtonText}
      </button>
    </form>
  );
}

