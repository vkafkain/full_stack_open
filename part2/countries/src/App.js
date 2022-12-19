import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const url = "https://restcountries.com/v3.1/all";

  const [filterName, setFilterName] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const filterCountries = countries.filter((x) =>
    x.name.official.toLowerCase().includes(filterName.toLocaleLowerCase())
  );

  return (
    <div>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <Countries countries={filterCountries} />
    </div>
  );
};

export default App;
