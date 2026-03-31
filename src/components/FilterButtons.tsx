import { FilterType } from "../types/todo";

interface FilterButtonsProps {
  current: FilterType;
  onChange: (filter: FilterType) => void;
  activeCounts: number;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "active", label: "Активные" },
  { value: "completed", label: "Завершённые" },
];

export function FilterButtons({
  current,
  onChange,
  activeCounts,
}: FilterButtonsProps) {
  return (
    <div className="filter-bar">
      <span className="active-count">{activeCounts} осталось</span>
      <div className="filter-buttons">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`filter-btn ${current === value ? "active" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
