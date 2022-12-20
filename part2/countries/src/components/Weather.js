import { useEffect, useState } from "react";
import axios from "axios";


const Weather = ({city}) => {
    const API_WEATHER_KEY = process.env.API_WEATHER_KEY
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${API_WEATHER_KEY}&query=${city}`)
        .then(response => {
            setWeather(response.data)
        })
    }, [])


    return (
        <div>
            <h2>Weather in {city}</h2>
            <div>Temperature {weather.current.temperature}°C</div>
        </div>
    )
}

export default Weather