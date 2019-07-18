import React, { Component } from 'react';
import CitySelector from './CitySelector';

var weatherApiKey = '1788247f77c3a3319623f2b4d21f03f4';


class CurrentWeather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city: this.props.city,
            temp: this.props.temp,
            desc: this.props.detail,
            icon: this.props.icon
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState(nextProps);
        }
    }

    render() {
        return (
            <div className="curWeaComp">
                <h3>{this.state.city}</h3>
                <h3>{this.state.temp}</h3>
                <h3>{this.state.desc}</h3>
                <img className='weatherIcon' src={this.state.icon} />
            </div>
        );
    }
}

export default CurrentWeather;
