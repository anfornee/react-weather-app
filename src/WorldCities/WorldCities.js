var countryList = require("./lib/country.json")
var stateList = require("./lib/state.json")
var cityList = require("./lib/city.json")

var WorldCities = {
	getCountryById: function(id) {
		return _findEntry(countryList, id);
	},
	getStateById: function(id) {
		return _findEntry(stateList, id);
	},
	getCityById: function(id) {
		return _findEntry(cityList, id);
	},
	getStatesOfCountry: function(countryId) {
		return stateList.filter(function(value, index) {
			return value.country_id === countryId
		})
	},
	getCitiesOfState: function(stateId) {
		return cityList.filter(function(value, index) {
			return value.state_id === stateId
		})
	},
	getAllCountries: function() {
		return countryList;
	}
}

let _findEntry = (source, id) => {
	if(!isNaN(id) && source != null) {
		let idx = source.findIndex((c, i) => c.id === id);
		return (idx !== -1) ? source[idx] : "";
	}
	else return "";
}

module.exports = WorldCities;
