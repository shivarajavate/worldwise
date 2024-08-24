import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CityItem from "./CityItem.jsx";
import styles from "./CityList.module.css";
import { useCitiesContext } from "../contexts/CitiesContext.jsx";

export default function CityList() {
  const { isLoading, error, cities } = useCitiesContext();

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
