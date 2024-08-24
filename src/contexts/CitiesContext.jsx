import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const BASE_URL = "http://localhost:8000";

CitiesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const CitiesContext = createContext();

function CitiesContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(`${BASE_URL}/cities`);
        const cities = await response.json();
        setCities(cities);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const city = await response.json();
      setCurrentCity(city);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();
      const city = data;
      setCities((cities) => [...cities, city]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      setError("");
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        error,
        cities,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCitiesContext() {
  return useContext(CitiesContext);
}

export { CitiesContextProvider, useCitiesContext };
