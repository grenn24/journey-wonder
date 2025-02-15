import { Flex, GlobalToken, Tag, Typography } from "antd";
import countriesData from "../../data/destinations/countries";
import regionsData from "../../data/destinations/regions";
import statesData from "../../data/destinations/states";
import citiesData from "../../data/destinations/cities";

const {Text}=Typography;
const searchDestinations = (destination: string, token: GlobalToken) => {
	const countries = countriesData
		.filter((country) =>
			country.name.match(new RegExp(`^${destination}`, "i"))
		)
		.map((country) => ({
			value: country.name,
			key: country.id,
			label: (
				<Flex justify="space-between">
					<Text>{country.name}</Text>
					<Tag
						bordered={false}
						style={{
							backgroundColor: token.colorBgTextActive,
						}}
					>
						Country
					</Tag>
				</Flex>
			),
		}));
	const regions = regionsData
		.filter((region) =>
			region.name.match(new RegExp(`^${destination}`, "i"))
		)
		.map((region) => ({
			value: region.name,
			key: region.id,
			label: (
				<Flex justify="space-between">
					<Text>{region.name}</Text>
					<Tag
						bordered={false}
						style={{
							backgroundColor: token.colorBgTextActive,
						}}
					>
						Region
					</Tag>
				</Flex>
			),
		}));

	const states = statesData
		.filter((state) => state.name.match(new RegExp(`^${destination}`, "i")))
		.map((state) => ({
			value: state.name,
			key: state.id,
			label: (
				<Flex justify="space-between">
					<Text>{state.name}</Text>
					<Tag
						bordered={false}
						style={{
							backgroundColor: token.colorBgTextActive,
						}}
					>
						State
					</Tag>
				</Flex>
			),
		}));
		const cities = citiesData
			.filter((state) =>
				state.name.match(new RegExp(`^${destination}`, "i"))
			)
			.map((state) => ({
				value: state.name,
				key: state.id,
				label: (
					<Flex justify="space-between">
						<Text>{state.name}</Text>
						<Tag
							bordered={false}
							style={{
								backgroundColor: token.colorBgTextActive,
							}}
						>
							City
						</Tag>
					</Flex>
				),
			}));
	return countries.concat(regions).concat(states).concat(cities);
};
export default searchDestinations;