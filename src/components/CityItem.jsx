import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./CityItem.module.css";
import { useCitiesContext } from "../contexts/CitiesContext.jsx";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

CityItem.propTypes = {
  city: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cityName: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCitiesContext();

  const { id, cityName, emoji, date, position } = city;

  async function handleDelete(event) {
    event.preventDefault();
    await deleteCity(id);
  }

  return (
    <li>
      <NavLink
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </NavLink>
    </li>
  );
}
