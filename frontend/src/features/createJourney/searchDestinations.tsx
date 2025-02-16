import { Flex, GlobalToken, Tag, Typography } from "antd";
import countriesData from "../../data/destinations/countries.json";
import regionsData from "../../data/destinations/regions.json";
import statesData from "../../data/destinations/states.json";
import citiesRawData from "../../data/destinations/cities.json";

const {Text}=Typography;
const citiesData = citiesRawData as {name:string,
	id:number
}[];
const searchDestinations = (destination: string, token: GlobalToken) => {
	const countries = countriesData
		.filter((country) =>
			country.name.match(new RegExp(`^${destination}`, "i"))
		)
		.map((country) => ({
			value: country.name,
			key: country.id,
			label: (
				<Flex
					justify="space-between"
					align="center"
					style={{ height: 32 }}
				>
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
				<Flex justify="space-between" align="center" style={{height:32}}>
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
				<Flex justify="space-between" align="center" style={{height:32}}>
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
					<Flex
						justify="space-between"
						align="center"
						style={{ height: 32 }}
					>
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

	return destination ? countries.concat(regions).concat(states).concat(cities) : [];
};
export default searchDestinations;