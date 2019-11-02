const INITIAL_STATE = {
    city: '',  
    current: [],
    forecast: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_WEATHER_CURRENT":
            return { ...state, current: action.payload.current, city: action.payload.city };
        case "FETCH_WEATHER_FORECAST":
            return { ...state, forecast: action.payload.current};
        default:
            return state;
    }
}