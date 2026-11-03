import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  selectedCategory: Category | "";
  onCategoryChange: (category: Category | "") => void;
  categories: Category[];
  totalResults: number;
}

export default function EventFilter({
  searchText,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  totalResults
}: EventFilterProps) {
  return (
    <>
      <form className="filtre" onSubmit={(e) => e.preventDefault()}>
        <div className="form-grup">
          <label htmlFor="arama">Etkinlik ara</label>
          <input
            id="arama"
            type="search"
            placeholder="Örn. atölye, kariyer"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="form-grup">
          <label htmlFor="kategori-filtre">Kategori</label>
          <select
            id="kategori-filtre"
            value={selectedCategory}
            onChange={(e) =>
              onCategoryChange(e.target.value as Category | "")
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
        {totalResults === 0
          ? "bulunamadı"
          : `${totalResults} etkinlik listeleniyor.`}
      </p>
    </>
  );
}
