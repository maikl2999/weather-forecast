import React from 'react';
import { connect } from 'react-redux';
import { fetchWeatherCurrent } from '../actions'
import Search from './Search';
import { Link } from 'react-router-dom';

class Forecast extends React.Component {
    componentDidMount() {
        let startCity = this.props.city? this.props.city : 'London';
        this.props.fetchWeatherCurrent(startCity);
    }

    getDate () {
        let date = new Date();
        let dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        let mm = date.getMonth() +1;
        mm = mm > 9 ? mm : '0' + mm;
        let year = date.getFullYear();

        return `${dd}.${mm}.${year}`
    }

    renderCurrent() {
        if(!this.props.current) {
            return <div>Loading...</div>
        }

        let data = this.props.current.find(item => item.name === this.props.city);

        if(!data) {
            return <h1>This city is not found, enter the name correctly</h1>
        }

        return (
            <div>
                <h1>Current weather in {data.name} ({data.sys.country})</h1>
                <div className="my-2 ml-2">{this.getDate()}</div>
                <div>Temperature (Celsius): {data.main.temp}</div>
                <div>Humidity (%): {data.main.humidity}</div>
                <div>Atmospheric pressure (hPa): {data.main.pressure}</div>
                <Link to={`/forecast/${data.name}`} className="btn btn-primary mt-2">Forecast for {data.name}</Link>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Search />
                {this.renderCurrent()}
            </div>
        );
    }
}

const mapStateToProps = ({weather}) => {
    return { 
        current: weather.current,
        city: weather.city
    }
}

export default connect(mapStateToProps, { fetchWeatherCurrent })(Forecast);