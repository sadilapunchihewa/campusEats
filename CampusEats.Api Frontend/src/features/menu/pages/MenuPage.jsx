import { useState } from "react";
import MenuList from "../components/MenuList";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { API } from "../../../config";
export default function MenuPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All dishes");
  const debounced = useDebounce(query, 400);
  const { data: dishes, isLoading, error } = useFetch(`${API}/api/menu`);
  const categories = [
    "All dishes",
    ...new Set((dishes || []).map((d) => d.category)),
  ];
  const filtered = (dishes || []).filter(
    (d) =>
      d.name.toLowerCase().includes(debounced.toLowerCase()) &&
      (category === "All dishes" || d.category === category),
  );
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-tag">Made for your campus break</span>
          <h1>
            Good food.
            <br />
            Great study breaks.
          </h1>
          <p>
            Your Sri Lankan favourites, all in one place. Find something
            delicious between lectures.
          </p>
          <a className="button button-yellow" href="#menu">
            Explore the menu
          </a>
          <span className="hero-footnote">
            From a hearty kottu to a sweet finish.
          </span>
        </div>
        <div className="hero-photo">
          <img
            src="/images/fried-rice.jpg"
            alt="A generous bowl of fried rice"
            width="640"
            height="480"
            fetchPriority="high"
          />
          <div className="photo-caption">
            <span>On the menu</span>
            <strong>Fried Rice</strong>
          </div>
        </div>
      </section>
      <section id="menu" className="menu-section" aria-labelledby="menu-title">
        <div className="section-heading">
          <div>
            <h2 id="menu-title">Find your next favourite</h2>
            <p>A proper meal, or a little something sweet.</p>
          </div>
          <label className="search-field">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">Search dishes</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the menu"
            />
          </label>
        </div>
        <div className="menu-toolbar">
          <div className="category-filters" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                key={item}
                aria-pressed={category === item}
                className={category === item ? "selected" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="result-count" aria-live="polite">
            {!isLoading && !error && `${filtered.length} dishes`}
          </span>
        </div>
        {isLoading ? (
          <div className="state-panel" role="status">
            Loading the menu…
          </div>
        ) : error ? (
          <div className="state-panel" role="alert">
            <h3>We couldn’t load the menu</h3>
            <p>Check your connection and try again.</p>
            <button className="button" onClick={() => window.location.reload()}>
              Try again
            </button>
          </div>
        ) : filtered.length ? (
          <MenuList dishes={filtered} />
        ) : (
          <div className="state-panel">
            <h3>No dishes found</h3>
            <p>Try another search or choose a different category.</p>
            <button
              className="button"
              onClick={() => {
                setQuery("");
                setCategory("All dishes");
              }}
            >
              Show all dishes
            </button>
          </div>
        )}
      </section>
    </>
  );
}
