import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

const App = () => {
    return (
        <div className="container main">
            <Router history={ history }>
                <Switch>    
                    <Route path="/" exact component={CurrentWeather} />
                    <Route path="/forecast/:id" exact component={Forecast} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;