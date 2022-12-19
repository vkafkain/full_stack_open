import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const url = "https://restcountries.com/v3.1/all";

  const [filterName, setFilterName] = useState("");
  const [countries, setCountries] = useState([]);
  
  useEffect(() => {
    axios(url).then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);
  
  const filterCountries = countries.filter((x) =>
  x.name.common.toLowerCase().includes(filterName.toLocaleLowerCase())
  );
  const maxCountries = 10
  const showCountryList = filterCountries.length > 1 && filterCountries.length < maxCountries
  const showMessage = filterCountries.length >= maxCountries && filterName.length > 0
  const oneCountry = filterCountries.length === 1

  console.log(showCountryList)
  console.log(filterCountries.length);

  return (
    <div>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      {showCountryList && <Countries countries={filterCountries} />
      }
      {showMessage && <p>Too many matches, specify another filter</p>}
      {oneCountry && <CountryDetails countries={filterCountries} />}
    </div>
  );
};

export default App;
