import React, { Component } from 'react'

class CurrentWeather extends Component {
  constructor (props) {
    super(props)
    this.state = {
      city: undefined,
      temp: undefined,
      desc: undefined,
      icon: undefined
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location.state !== this.props.location.state) {
      this.setState({
        city: nextProps.location.state.city,
        temp: nextProps.location.state.temp,
        desc: nextProps.location.state.detail,
        icon: nextProps.location.state.icon
      })
    }
  }

  componentDidMount () {
    const { city } = this.props.location.state
    const { temp } = this.props.location.state
    const { detail } = this.props.location.state
    const { icon } = this.props.location.state
    this.setState({
      city,
      temp,
      detail,
      icon
    })
  }

  render () {
    return (
      <div className='curWeaComp'>
        <div>
          <h3>{this.state.city}</h3>
          <h3>{this.state.temp}˚F</h3>
        </div>
        <div>
          <h4>{this.state.desc}</h4>
          <img className='weatherIcon' src={this.state.icon} alt='weather-icon' />
        </div>
      </div>
    )
  }
}

export default CurrentWeather
