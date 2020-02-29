import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import CurrentWeather from './CurrentWeather'

import { getCurrentPosition, getWeather } from '../Services/GetWeatherAndLocation'
import { getAllCountries, getCountryById, getStatesOfCountry, getStateById, getCitiesOfState, getCityById } from '../WorldCities/WorldCities'

var iconsList = require("../images/icons.json")

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
      buttonActive: {
        opacity: '0',
        zIndex: '-1'
      },
      icon: undefined,
      error: ""
    }
  }

  handleCountryChange = e => {
    let coId = e.target.value
    let coName = new getCountryById(coId)
    this.selCo = coName.name
    this.setState({
      countryName: coName.name,
      stateRegion: new getStatesOfCountry(coId),
      stReActive: 'inherit'
    })
  }

  handleStateChange = e => {
    let stId = e.target.value
    let stName = getStateById(stId)
    this.setState({
      city: new getCitiesOfState(stId),
      stateName: stName.name
    })
  }

  setLatLon = (res) => {
    this.setState({
      lat: res.results[0].locations[0].latLng.lat,
      long: res.results[0].locations[0].latLng.lng
    }, () => {
      getWeather(this.state.lat, this.state.long).then(res => {
        var icon = iconsList.filter(icon => icon.desc === res.weather[0].main)
        this.setState({
          buttonActive: {
            opacity: '1',
            zIndex: '1'
          },
          desc: res.weather[0].main,
          detail: res.weather[0].description,
          icon: icon[0].image,
          lat: undefined,
          long: undefined,
          temp: Math.floor(res.main.temp)
        })
      })
    })
  }

  handleCityChange = (e) => {
    let ctId = e.target.value
    let ctName = getCityById(ctId)
    this.setState({ cityName: ctName.name })
    getCurrentPosition(ctName.name, this.state.stateName).then(res => {
      this.setLatLon(res)
    })
  }

  resetDrops = (e) => {
    this.setState({
      city: [''],
      country: [''],
      stateRegion: [''],
      buttonActive: {
        opacity: '0',
        zIndex: '-1'
      }
    }, () => {
      this.setState({
        country: new getAllCountries()
      })
    })
  }

  render() {
    const city = this.state.cityName
    return (
      <Router>
        <div className="selectorContainer">
          <div className="dropdownContainer">
            <h3>Select a City</h3>
            <select id="first" onChange={this.handleCountryChange} className="dropdowns">
              <option>Select a country</option>
              {this.state.country.map((country) => <option key={country.id} value={country.id}>
                {country.name}
              </option>)}
            </select>
            <select className="dropdowns" onChange={this.handleStateChange}>
              <option>Select a state/region...</option>
              {this.state.stateRegion.map((states) => <option key={states.id + 2000} value={states.id}>
                {states.name}
              </option>)}
            </select>
            <select className="dropdowns" onChange={this.handleCityChange}>
              <option>Select a city...</option>
              {this.state.city.map((cities) => <option key={cities.id + 3000} value={cities.id}>
                {cities.name}
              </option>)}
            </select>
            <div id='weatherLink' onClick={this.resetDrops}>
              <Link
                className="getWeatherButton"
                style={this.state.buttonActive}
                to={{
                  pathname: '/current-weather',
                  state: {
                    city: city,
                    temp: this.state.temp,
                    icon: this.state.icon,
                    detail: this.state.detail
                  }
                }}>
                Get weather
                {/* for {this.state.cityName}, {this.state.countryName} */}
              </Link>
            </div>
          </div>
          <Route path="/current-weather" component={CurrentWeather} />
        </div>
      </Router>
    )
  }
}

export default CitySelector
