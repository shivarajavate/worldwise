import PropTypes from "prop-types";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CityItem from "./CityItem.jsx";
import styles from "./CityList.module.css";

CityList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      population: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default function CityList({ isLoading, error, cities }) {
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Message message={`Error: ${error}`} />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
