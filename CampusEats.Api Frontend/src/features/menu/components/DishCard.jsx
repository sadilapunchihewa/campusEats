import { Link } from "react-router-dom";
import { foodPhoto, price } from "../foodPhotos";
export default function DishCard({ dish }) {
  const { image, description } = foodPhoto(dish);
  return (
    <article className="dish-card">
      <Link
        className="dish-image-link"
        to={`/dish/${dish.id}`}
        aria-label={`View ${dish.name}`}
      >
        {image ? (
          <img
            src={image}
            alt={dish.name}
            loading="lazy"
            width="640"
            height="480"
          />
        ) : (
          <div className="photo-placeholder">Photo coming soon</div>
        )}
        <span className={`availability ${dish.available ? "" : "sold-out"}`}>
          {dish.available ? "Available" : "Sold out"}
        </span>
      </Link>
      <div className="dish-body">
        <span className="category-label">{dish.category}</span>
        <h3>{dish.name}</h3>
        <p>{description}</p>
        <div className="dish-bottom">
          <strong>{price(dish.price)}</strong>
          <Link className="detail-link" to={`/dish/${dish.id}`}>
            View dish <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
