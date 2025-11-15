
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (search: string) => void;
  searchQuery: string;
}

export default function SearchBox({ onSearch, searchQuery }: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <input
      className={css.input}
      defaultValue={searchQuery}
      onChange={handleChange}
      type="text"
      placeholder="Search notes"
    />
  );
}
