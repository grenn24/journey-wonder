
import countriesData from "./countries.json";
import regionsData from "./regions.json";
import statesData from "./states.json";
import citiesRawData from "./cities.json";


const citiesData = citiesRawData;
const countries = countriesData.map((country) => ({
	value: country.name + ";" + country.id,
	name: country.name,
	key: country.id,
	id: country.id,
	type: "Country",
}));
const regions = regionsData.map((region) => ({
	value: region.name + ";" + region.id,
	name: region.name,
	key: region.id,
	id: region.id,
	type: "Region",
}));

const states = statesData.map((state) => ({
	value: state.name + ";" + state.id,
	name: state.name,
	key: state.id,
	id: state.id,
	type: "State",
}));

const cities = citiesData.map((city) => ({
	value: city.name + ";" + city.id,
	name: city.name,
	key: city.id,
	id: city.id,
	type: "City",
}));

const destinations = countries.concat(regions).concat(states).concat(cities);

export default destinations;
