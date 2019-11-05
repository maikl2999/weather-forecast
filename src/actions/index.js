import axios from 'axios';
import {
    APIKEY,
    FETCH_WEATHER_CURRENT,
    FETCH_WEATHER_FORECAST
} from './types';

const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast';

export const fetchWeatherCurrent = cityName => (dispatch, getState) => {

    let current = getState().weather.current;

    if(current.find(item => item.name.toLowerCase() === cityName.toLowerCase())) {
        let currentCity = current.find(item => item.name.toLowerCase() === cityName.toLowerCase())

        current = current.filter(item => item.name.toLowerCase() !== cityName.toLowerCase())
        current.push(currentCity)

        dispatch ({ type: FETCH_WEATHER_CURRENT, payload: { current, city: currentCity.name } });
        return
    }

    return axios.get(`${weatherUrl}?q=${cityName}&units=metric&APPID=${APIKEY}`)
        .then(response => {
            if(!response) return;
            current.push(response.data);
            dispatch({ type: FETCH_WEATHER_CURRENT, payload: { current, city: response.data.name } });
        })
        .catch(err => alert(`${err.message}\nMaybe incorrect city name "${cityName}"`));
}

export const fetchWeatherForecast = cityName => (dispatch, getState) => {

    let current = getState().weather.forecast;

    if(current.find(item => item.city.name.toLowerCase() === cityName.toLowerCase())) {
        return
    }

    return axios.get(`${forecastUrl}?q=${cityName}&units=metric&APPID=${APIKEY}`)
        .then(response => {
            if(!response) return;
            current.push(response.data);
            dispatch({ type: FETCH_WEATHER_FORECAST, payload: { current } });
        })
        .catch(err => {throw(err)})
}