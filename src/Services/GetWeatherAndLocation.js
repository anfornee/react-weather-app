var weatherApiKey = '1788247f77c3a3319623f2b4d21f03f4'

var geoApiKey = 'jfFkmJkW4IM9eKN0mptVPL1vmMtKkNeu'

var GetStuff = {

  getCurrentPosition: async (ctName, stName) => {
    const res = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${geoApiKey}&location=${ctName},${stName}`)
    const json = await res.json()
    if (json.info.statuscode === 0) {
      return json
    } else {
      window.alert('Couldn\'t get location.')
    }
  },

  getWeather: async (lat, long) => {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?appid=${weatherApiKey}&lat=${lat}&lon=${long}&units=imperial`)
    const json = await res.json()
    console.log(json)
    if (json.cod === 429 || json.cod === 401) {
      window.alert('something made a boo boo')
    } else if (json.cod !== 200) {
      console.log('waiting...')
    }
    else {
      return json
    }
  }

}

module.exports = GetStuff
