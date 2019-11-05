import React from 'react';
import { connect } from 'react-redux';
import { fetchWeatherForecast, fetchWeatherCurrent } from '../actions';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Forecast extends React.Component {
    componentDidMount() {
        this.props.fetchWeatherForecast(this.props.match.params.id);
        this.props.fetchWeatherCurrent(this.props.match.params.id);
    }

    getForecastList() {
        let date = new Date();
        date.setHours(11, 0, 0, 0);

        let day1 = (new Date (date.setDate(date.getDate()+1))).getTime()/1000;
        let day2 = (new Date (date.setDate(date.getDate()+1))).getTime()/1000;
        let day3 = (new Date (date.setDate(date.getDate()+1))).getTime()/1000;
        let day4 = (new Date (date.setDate(date.getDate()+1))).getTime()/1000;
  
        let forecastList = this.props.forecast.list.filter(elem => {
            return (
                    elem.dt === day1 ||
                    elem.dt === day2 ||
                    elem.dt === day3 ||
                    elem.dt === day4 ? true : false
            );
        });

        return forecastList;
    }

    renderForecast() {
        if(!this.props.forecast) return <div>Loading...</div>;
        
        let forecast = this.getForecastList().map((day, i) => {

            return (
                <div className="col-sm-3" key={day.dt}>
                    
                    <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <th>{moment().add((i + 1), 'days').format('DD.MM.YYYY.')}</th>
                        </tr>
                        <tr>
                            <td>Temperature</td>
                            <td>{Math.round(day.main.temp)} ℃</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td> {day.main.humidity} %</td>
                        </tr>
                        <tr>
                            <td>Atmospheric pressure</td>
                            <td>{day.main.pressure} hPa</td>
                        </tr>
                    </tbody>
                </table>                                     
                </div>    
            );
        })

        return (
            <div>
                <h1> Forecast for {this.props.match.params.id}</h1>
                <div className="container">
                    <div className="row">
                        {forecast}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderForecast()}
                <Link to="/" className="btn btn-primary mt-2">Back</Link>
            </div>
        );
    }
}

const mapStateToProps = ({weather}, ownProp) => {
    return { 
        forecast: weather.forecast.find(item => item.city.name === ownProp.match.params.id),
        city: weather.city
    }
}

export default connect(mapStateToProps, { fetchWeatherForecast, fetchWeatherCurrent })(Forecast);