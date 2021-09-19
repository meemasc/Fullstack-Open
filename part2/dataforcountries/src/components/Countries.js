import React from "react"

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const CountryNames = ({filteredCountries, handleClick}) => {
    return (
    <div>
        {filteredCountries.map(country => 
            <div key={country.name}>
                {country.name} <Button handleClick={handleClick(country)} text="show" />
            </div>
            )}
    </div>
    )
}

const Languages = ({languages}) => (
    <div>
        <h2>Languages</h2>
        <ul>
            {languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
    </div>
)

const Weather = ({weather, country, getWeather}) => {
    if (weather.location===undefined || !(weather.location.name === country.capital)) {
        getWeather(country)
        return <div></div>
    }
    else {
        return (
            <div>
                <h2>Weather in {weather.location.name}</h2>
                <div>
                    <b>Last observation time is: </b>
                    {weather.current.observation_time}
                </div>
                <div>
                    <b>Temperature is: </b>
                    {weather.current.temperature} Celcius
                </div>
                <div>
                    <b>Weather description: </b>
                    {weather.current.weather_descriptions[0]}
                </div>
                <div>
                    <b>Wind speed: </b>
                    {weather.current.wind_speed}
                </div>
                <div>
                    <b>Wind direction: </b>
                    {weather.current.wind_dir}
                </div>
                <img src={weather.current.weather_icons[0]} 
                alt={weather.current.weather_descriptions[0]} ></img>
            </div>
        )
    }
}

const FullCountry = ({country, weather, getWeather}) => (
    <div>
        <h1>{country.name}</h1>
        <div>capital: {country.capital}</div>
        <div>population: {country.population}</div>
        <Languages languages={country.languages} /> 
        <img src={country.flag} alt="Country Flag" width="200" height="150" ></img>
        <Weather weather={weather} country={country} getWeather={getWeather} />
    </div>
)

const Countries = ({filteredCountries, handleClick, weather, getWeather}) => {
    
    const numOfCountries = filteredCountries.length

    if (numOfCountries > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    else if (numOfCountries === 1){
        return (
            <div>
                <FullCountry country={filteredCountries[0]} weather={weather} getWeather={getWeather} />
            </div>
        )
    }
    return (
        <div>
            <CountryNames filteredCountries={filteredCountries} handleClick={handleClick} />
        </div>
    )
}

export default Countries