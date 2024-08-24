import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import PropTypes from "prop-types";
import Button from "./Button";
import { useCitiesContext } from "../contexts/CitiesContext.jsx";
import { useGeolocation } from "../hooks/useGeolocation.js";
import { useUrlPosition } from "../hooks/useUrlPosition.js";
import styles from "./Map.module.css";

export default function Map() {
  const { cities } = useCitiesContext();

  const [position, setPosition] = useState([0, 0]);
  const {
    isLoading: isLoadingGeolocation,
    position: geolocationPosition,
    getPosition: getGeolocationPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition)
      setPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getGeolocationPosition}>
          {isLoadingGeolocation ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                <span>{city.emoji}</span>
                <br />
                <strong>{city.cityName}</strong>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

ChangeCenter.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
