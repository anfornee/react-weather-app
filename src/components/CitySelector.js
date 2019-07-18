import React, { Component } from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CurrentWeather from './CurrentWeather';
import { getAllCountries, getCountryById, getStatesOfCountry, getStateById, getCitiesOfState, getCityById } from '../WorldCities/WorldCities';

var iconsList = require("../images/icons.json");

var weatherApiKey = '1788247f77c3a3319623f2b4d21f03f4';

var geoApiKey = "jfFkmJkW4IM9eKN0mptVPL1vmMtKkNeu";

class CitySelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            country: new getAllCountries(),
            countryName: undefined,
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
        this.getCurrentPosition = this.getCurrentPosition.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.selCo = '';
        this.selSt = '';
        this.selCt = '';
    }

    getCurrentPosition() {
        this.setState({ buttonActive: 'none' }, async () => {
            const ctName = this.state.cityName;
            const stName = this.state.stateName;
            const res = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${geoApiKey}&location=${ctName},${stName}`);
            const json = await res.json();
            if (json.info.statuscode == 0) {
                this.setState({
                    lat: json.results[0].locations[0].latLng.lat,
                    long: json.results[0].locations[0].latLng.lng
                }, () => {
                    console.log(this.state.lat, this.state.long);
                    console.log(json);
                    this.getWeather(this.state.lat, this.state.long);
                    console.log(`country: ${this.state.countryName}, state: ${this.state.stateName}, city: ${this.state.cityName}`);
                });
            }
        });
    }

    async getWeather(lat, long) {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?appid=${weatherApiKey}&lat=${lat}&lon=${long}&units=imperial`);
        const json = await res.json()
        if (json.cod == 429 || json.cod == 401) {
            console.log('something made a boo boo');
        } else if (json.cod !== 200) {
            console.log('waiting...');
        }
        else {
            this.setState({
                selCt: this.state.cityName,
                temp: Math.floor(json.main.temp),
                desc: json.weather[0].main,
                detail: json.weather[0].description,
                lat: undefined,
                long: undefined
            }, () => {
                var icon = iconsList.filter(icon => icon.desc == this.state.desc);
                console.log(icon, this.state.desc);
                if (icon !== [])
                this.setState({
                    icon: icon[0].image
                })
            });
            console.log(json);
        }
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
        let stName = getStateById(stId)
        this.setState({
            city: new getCitiesOfState(stId),
            stateName: stName.name
        }, () => {
            console.log(`country: ${this.state.countryName}, state: ${this.state.stateName}`);
        });
    }

    handleTheChangeBro = (e) => {
        let ctId = e.target.value;
        let ctName = getCityById(ctId);
        this.setState({
            cityName: ctName.name,
            buttonActive: 'inherit'
        },
            () => {
                console.log(`country: ${this.state.countryName}, state: ${this.state.stateName}, city: ${this.state.cityName}`);
            });
    }

    render() {
        return (
            <div className="selectorContainer">
                <div className="dropdownContainer">
                    <h3>Select a City</h3>
                    <select id="first" onChange={this.handleChange} className="dropdowns">
                        <option>Select a country</option>
                        {this.state.country.map((country) => <option key={country.id} value={country.id}>
                            {country.name}
                        </option>)}
                    </select>
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
                        <button
                            className="getWeatherButton"
                            onClick={this.getCurrentPosition}
                            style={{ display: this.state.buttonActive }} >
                            Get weather for {this.state.cityName}, {this.state.countryName}
                        </button>
                    </div>
                </div>
                <CurrentWeather city={this.state.selCt} temp={this.state.temp} icon={this.state.icon} detail={this.state.detail} />
            </div>

        );
    }
}

export default CitySelector;
