import { useState } from "react";
import MenuList from "../components/MenuList";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { API } from "../../../config";



function MenuPage() {

  // Stores the current input value
  const [query, setQuery] = useState("");

  // Updates 400 milliseconds after typing stops
  const debounced = useDebounce(query, 400);

  const {
    data: dishes,
    isLoading,
    error,
  } = useFetch(`${API}/api/menu`);

  // State 1: Loading
  if (isLoading) {
    return <p>Loading menu...</p>;
  }

  // State 2: Error
  if (error) {
    return <p>Could not load menu: {error}</p>;
  }

  // State 3: Success
  const filtered = dishes.filter((dish) =>
    dish.name
      .toLowerCase()
      .includes(debounced.toLowerCase())
  );



  return (
    <div>
      <h1>CampusEats Menu</h1>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search dishes..."
      />

      <MenuList dishes={filtered} />
    </div>
  );
}

export default MenuPage;
