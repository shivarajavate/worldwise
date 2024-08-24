import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import { useCitiesContext } from "../contexts/CitiesContext.jsx";
import { useUrlPosition } from "../hooks/useUrlPosition.js";
import styles from "./Form.module.css";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [errorGeocoding, setErrorGeocoding] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const { isLoading: isLoadingCities, createCity } = useCitiesContext();

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setErrorGeocoding("");
        const searchParameters = `latitude=${lat}&longitude=${lng}`;
        const response = await fetch(`${BASE_URL}?${searchParameters}`);
        const data = await response.json();
        const { city, locality, countryCode, countryName } = data;
        if (!city && !countryCode)
          throw new Error(`Invalid location. Click elsewhere 😉`);
        const emoji = convertToEmoji(countryCode);
        setCityName(city || locality || "");
        setCountryName(countryName);
        setEmoji(emoji);
      } catch (error) {
        setErrorGeocoding(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country: countryName,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities/");
  }

  if (isLoadingGeocoding) {
    return <Spinner />;
  }

  if (!lat && !lng) {
    return <Message message="Start by clicking somewhere on the map 😉" />;
  }

  if (errorGeocoding) {
    return <Message message={errorGeocoding} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoadingCities ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
