import React, { useState, useEffect } from 'react'
import axios from "axios";
import Filter from "./components/Filter";
import Countries from './components/Countries';

const App = () => {
  const [newFilter, setNewFilter] = useState("")
  const [newCountries, setNewCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weather, setWeather] = useState("")
  const api_key = process.env.REACT_APP_API_KEY

  const handleFilterChange = (event) => {
    const newestFilter = event.target.value
    
    const newestFilteredCountries = newCountries.filter(country => country.name.toLowerCase().includes(newestFilter.toLowerCase()))
    console.log();
    setNewFilter(newestFilter)
    setFilteredCountries(newestFilteredCountries)
  }
  const handleClick = (country) => () => setFilteredCountries([country])

  const countryHook = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
        .then(response => setNewCountries(response.data))
  }
  useEffect(countryHook, [])

  const getWeather = (country) => {
    axios
      .get("http://api.weatherstack.com/current?access_key=" + api_key + "&query=" + country.capital)
        .then(response => setWeather(response.data))
  }

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries filteredCountries={filteredCountries} handleClick={handleClick} 
      weather={weather} getWeather={getWeather} /> 
    </div>
  )
}

export default App;
