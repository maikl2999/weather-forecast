import React from 'react';
import { connect } from 'react-redux';
import { fetchWeatherCurrent } from '../actions'
import Search from './Search';

class Forecast extends React.Component {
    componentDidMount() {
       this.props.fetchWeatherCurrent('London')
    }

    renderForecast() {
        if(!this.props.current.length) {
            return <div>Loading...</div>
        }

        let data = this.props.current.find(item => item.name === this.props.city);
        //let data = this.props.current[this.props.current.length-1]

        if(!data) {
            return <h1>This city is not found, enter the name correctly</h1>
        }

        return (
            <div>
                <h1>Current weather in {data.name} ({data.sys.country})</h1>
                <div>Temperature (Celsius): {data.main.temp}</div>
                <div>Humidity (%): {data.main.humidity}</div>
                <div>Atmospheric pressure (hPa): {data.main.pressure}</div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Search />
                {this.renderForecast()}
            </div>
        );
    }
}

const mapStateToProps = ({weather}) => {
    console.log(weather.current);

    return { 
        current: weather.current,
        city: weather.city
    }
}

export default connect(mapStateToProps, { fetchWeatherCurrent })(Forecast);