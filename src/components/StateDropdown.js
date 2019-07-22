import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import CurrentWeather from './CurrentWeather';

import { getCurrentPosition, getWeather } from '../Services/GetWeatherAndLocation';
import { getAllCountries, getCountryById, getStatesOfCountry, getStateById, getCitiesOfState, getCityById } from '../WorldCities/WorldCities';

var iconsList = require("../images/icons.json");

class StateDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stReActive: 'none',
            stateRegion: [''],
            city: [''],
            stateName: undefined,
            cityName: undefined,
            temp: undefined,
            desc: undefined,
            detail: undefined,
            lat: undefined,
            long: undefined,
            buttonActive: 'none',
            icon: undefined,
            error: ""
        }
        this.selCo = '';
        this.selSt = '';
        this.selCt = '';
    }

    handleChange = (e) => {
        let coId = e.target.value;
        let coName = new getCountryById(coId);
        this.selCo = coName.name;
        this.setState({
            countryName: coName.name,
            stateRegion: new getStatesOfCountry(coId),
            stReActive: 'inherit'
        }, () => {
            console.log(`country: ${this.state.countryName} `);
        });
    }

    handleThisChange = (e) => {
        let stId = e.target.value;
        let stName = getStateById(stId);
        this.setState({
            city: new getCitiesOfState(stId),
            stateName: stName.name
        }, () => {
            console.log(`country: ${this.state.countryName}, state: ${this.state.stateName}`);
        });
    }

    setLatLon = (res) => {
        this.setState({
            lat: res.results[0].locations[0].latLng.lat,
            long: res.results[0].locations[0].latLng.lng
        }, () => {
            getWeather(this.state.lat, this.state.long).then(res => {
                var icon = iconsList.filter(icon => icon.desc == res.weather[0].main);
                this.setState({
                    temp: Math.floor(res.main.temp),
                    desc: res.weather[0].main,
                    detail: res.weather[0].description,
                    icon: icon[0].image,
                    buttonActive: 'inherit',
                    lat: undefined,
                    long: undefined
                });
            });
        });
    }

    handleTheChangeBro = (e) => {
        let ctId = e.target.value;
        let ctName = getCityById(ctId);
        this.setState({ cityName: ctName.name });
        getCurrentPosition(ctName.name, this.state.stateName).then(res => {
            this.setLatLon(res);
        });
    }

    render() {
        const city = this.state.cityName;
        return (
            <Router>
                <div className="selectorContainer">
                    <div className="dropdownContainer">
                        <select className="dropdowns" onChange={this.handleThisChange}>
                            <option>Select a state/region...</option>
                            {this.state.stateRegion.map((states) => <option key={states.id} value={states.id}>
                                {states.name}
                            </option>)}
                        </select>
                        <select className="dropdowns" onChange={this.handleTheChangeBro}>
                            <option>Select a city...</option>
                            {this.state.city.map((cities) => <option key={cities.id} value={cities.id}>
                                {cities.name}
                            </option>)}
                        </select>
                        <div id='weatherLink'>
                            <Link
                                className="getWeatherButton"
                                style={{ display: this.state.buttonActive }}
                                to={{
                                    pathname: '/current-weather',
                                    state: {
                                        city: city,
                                        temp: this.state.temp,
                                        icon: this.state.icon,
                                        detail: this.state.detail
                                    }
                                }}>
                                Get weather for {this.state.cityName}, {this.state.countryName}
                            </Link>
                        </div>
                    </div>
                    <Route path="/current-weather" component={CurrentWeather} />
                </div>
            </Router>
        );
    }
}

export default StateDropdown;
