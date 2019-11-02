import React from 'react';
import { connect } from 'react-redux';
import { fetchWeatherCurrent } from '../actions';

class Search extends React.Component {
    state = {term: ''};
    
    onInputChange = (e) => {
        this.setState({
            term: e.target.value
        })
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        if(this.state.term !== this.props.city) {
            this.props.fetchWeatherCurrent(this.state.term);
        }

        this.setState({ term: ''});
    }

    onClick = (city) => {
        this.props.fetchWeatherCurrent(city);
    }

    renderList() {
        let result = this.props.current.map(city => {
            return (
                <button onClick={() => this.onClick(city.name)} key={city.name} className="btn btn-light">
                    { city.name }
                </button>
            );
        })

        return result;
    }

    render () {
        return (
            <div>
            <form onSubmit={this.onFormSubmit} className="input-group form">
                <input
                    value={this.state.term}
                    onChange={ this.onInputChange }
                    type="text"
                    placeholder="Enter city name"
                    className="form-control"
                />
                <span className="input-group-btn">
                    <button className="btn btn-secondary" type="submit">Search</button>
                </span>
            </form>
            <div className="btn-group btn-group-sm">
                <span className="content-center mr-2">Previos request:</span> {this.renderList()}                
            </div>
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

export default connect(mapStateToProps, { fetchWeatherCurrent })(Search);