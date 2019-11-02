import React from 'react';
import { connect } from 'react-redux';
import { fetchWeatherCurrent } from '../actions'

class Forecast extends React.Component {
    componentDidMount() {
       this.props.fetchWeatherCurrent('London')
    }

    renderForecast() {

    }

    render() {
        return (
            <div>Forecast</div>
        );
    }
}

const mapStateToProps = state => {
/*
    if(state.forecast) {

    console.log(state.forecast.list[1])

    state.forecast.list.forEach((item, i) => {
        let data = new Date(state.forecast.list[i].dt * 1000);

        console.log(data.toUTCString())
    } );
}
*/
    return { forecast: state.forecast }
}

export default connect(mapStateToProps, { fetchWeatherCurrent })(Forecast);