import axios from 'axios';

const APIKEY = '5f0a7769e434c814c37368949458ce48';

export const fetchWeatherCurrent = cityName => async (dispatch, getState) => {

    let current = getState().weather.current;

    if(current.find(item => item.name.toLowerCase() === cityName.toLowerCase())) {
        let currentCity = current.find(item => item.name.toLowerCase() === cityName.toLowerCase())

        current = current.filter(item => item.name.toLowerCase() !== cityName.toLowerCase())
        current.push(currentCity)

        dispatch ({ type: 'FETCH_WEATHER_CURRENT', payload: { current, city: currentCity.name } });
        return
    }

    let openweathermap = axios.create({
        baseURL: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${APIKEY}`    
        });

    const response = await openweathermap.get().catch(err => alert(`${err.message}\nMaybe incorrect city name "${cityName}"`));
    if(!response) return;
 
    current.push(response.data)

    dispatch({ type: 'FETCH_WEATHER_CURRENT', payload: { current, city: response.data.name } });
}

export const fetchWeatherForecast = cityName => async (dispatch, getState) => {

    let current = getState().weather.forecast;

    if(current.find(item => item.city.name.toLowerCase() === cityName.toLowerCase())) {
        return
    }

    let openweathermap = axios.create({
        baseURL: `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${APIKEY}`  
        });

    const response = await openweathermap.get().catch(err => alert(`${err.message}\nMaybe incorrect city name "${cityName}"`));
    if(!response) return;
 
    current.push(response.data)

    dispatch({ type: 'FETCH_WEATHER_FORECAST', payload: { current } });
}