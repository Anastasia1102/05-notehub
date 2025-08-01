import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <input
      type="text"
      className={css.input}
      placeholder="Search notes"
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}