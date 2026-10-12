import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { API } from "../../../config";
import { foodPhoto, price } from "../foodPhotos";
export default function DishDetailPage() {
  const { id } = useParams();
  const {
    data: dish,
    isLoading,
    error,
  } = useFetch(`${API}/api/menu/${encodeURIComponent(id)}`);
  if (isLoading)
    return (
      <div className="state-panel" role="status">
        Loading dish…
      </div>
    );
  if (error)
    return (
      <div className="state-panel">
        <h1>Dish unavailable</h1>
        <p>We couldn’t load this dish.</p>
        <Link to="/">Back to menu</Link>
      </div>
    );
  const { image, description } = foodPhoto(dish);
  return (
    <section className="detail-page">
      <Link className="back-link" to="/">
        ← Back to menu
      </Link>
      <div className="detail-layout">
        {image ? (
          <img className="detail-photo" src={image} alt={dish.name} />
        ) : (
          <div className="photo-placeholder">Photo coming soon</div>
        )}
        <div className="detail-copy">
          <span className="category-label">{dish.category}</span>
          <h1>{dish.name}</h1>
          <p>{description}</p>
          <strong className="detail-price">{price(dish.price)}</strong>
          <p>
            {dish.available ? "Available on the menu" : "Currently sold out"}
          </p>
          {dish.available && (
            <Link className="button" to="/order">
              Place order
            </Link>
          )}
          <p className="small-note">
            Photos are illustrative. Actual presentation may vary.
          </p>
        </div>
      </div>
    </section>
  );
}
