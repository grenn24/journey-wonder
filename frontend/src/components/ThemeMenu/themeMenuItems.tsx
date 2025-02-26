import { useDispatch } from "react-redux";
import { Language, setLanguage } from "../../redux/slices/language";
import { Flex, Typography } from "antd";
import Flag from "react-world-flags";
import { useAppSelector } from "../../redux/store";
import { setTheme, Theme } from "../../redux/slices/theme";
import { CheckRounded } from "@mui/icons-material";

const { Title } = Typography;
const useThemeMenuItems = () => {
	const dispatch = useDispatch();
	const globalTheme = useAppSelector((state) => state.theme.theme);
	return [
		{
			label: (
				<Flex gap={10} align="center">
					<CheckRounded
						style={{
							opacity: globalTheme === Theme.System ? 1 : 0,
						}}
					/>

					<Title
						level={5}
						style={{
						
							marginBottom: 0,
							fontWeight:
								globalTheme === Theme.System ? 700 : 500,
						}}
					>
						System
					</Title>
				</Flex>
			),

			key: Theme.System,
			onClick: () => dispatch(setTheme(Theme.System)),
		},
		{
			label: (
				<Flex gap={10} align="center">
					<CheckRounded
						style={{
							opacity: globalTheme === Theme.Light ? 1 : 0,
						}}
					/>
					<Title
						level={5}
						style={{
						
							marginBottom: 0,
							fontWeight: globalTheme === Theme.Light ? 700 : 500,
						}}
					>
						Light
					</Title>
				</Flex>
			),
			key: Theme.Light,
			onClick: () => dispatch(setTheme(Theme.Light)),
		},
		{
			label: (
				<Flex gap={10} align="center">
					<CheckRounded
						style={{
							opacity: globalTheme === Theme.Dark ? 1 : 0,
						}}
					/>
					<Title
						level={5}
						style={{
				
							marginBottom: 0,
							fontWeight: globalTheme === Theme.Dark ? 700 : 500,
						}}
					>
						Dark
					</Title>
				</Flex>
			),
			key: Theme.Dark,
			onClick: () => dispatch(setTheme(Theme.Dark)),
		},
	];
};
export default useThemeMenuItems;
