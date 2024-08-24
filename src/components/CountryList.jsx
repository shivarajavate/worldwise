import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";
import styles from "./CountryList.module.css";
import { useCitiesContext } from "../contexts/CitiesContext.jsx";

export default function CountryList() {
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

  const countries = cities.reduce((acc, city) => {
    if (acc.find((country) => country.country === city.country)) return acc;
    return [...acc, { emoji: city.emoji, country: city.country }];
  }, []);

  //   const countries = cities.map((city) => ({
  //     emoji: city.emoji,
  //     country: city.country,
  //   }));

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}
