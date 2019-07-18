import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CitySelector from './CitySelector'

class Header extends Component {
    render() {
        return (
            <div className="headerContainer">
                <div>
                    <img className="icon" src={require('../images/weather-icon.png')} alt="weather_icon" />
                </div>
                <div className="headerText">Weather</div>
                <div className="headerOptions">
                    <Link to="/" style={{ color: '#fabc60' }}>Choose a City</Link>
                </div>
            </div>
        );
    }
}

export default Header;
