import { useFetchContext } from "../../contexts/FetchContext";
import "./SearchBar.css";
export default function SearchBar() {
  const { productDispatcher } = useFetchContext();
  return (
    <div className="searchBar">
      <input
        type="text"
        className="searchField"
        onChange={(e) =>
          productDispatcher({
            type: "SERCH_VALUE",
            payload: e.target.value,
          })
        }
        placeholder="Search in SREET"
      />
    </div>
  );
}
