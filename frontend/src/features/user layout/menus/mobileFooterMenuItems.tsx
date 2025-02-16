
import {
	Avatar,
	Flex,
	theme,
	Tooltip,
	Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
	HomeOutlined as HomeOutlinedIcon,
	HomeRounded as HomeRoundedIcon,
	ExploreOutlined as ExploreOutlinedIcon,
	ExploreRounded as ExploreRoundedIcon,
	AirplaneTicketOutlined as AirplaneTicketOutlinedIcon,
	AirplaneTicketRounded as AirplaneTicketRoundedIcon,
	AddCircleOutlineRounded as AddCircleOutlineRoundedIcon,
} from "@mui/icons-material";
import { useAppSelector } from "../../../redux/store";

const { Text } = Typography;
const useMobileFooterMenuItems = (setOpenCreateModal : (value:boolean)=>void) => {
	const navigate = useNavigate();
	const { name, globalTheme, globalLanguage } = useAppSelector((state) => ({
		name: state.user.name,
		globalTheme: state.theme.theme,
		globalLanguage: state.language.language,
	}));
	const {
		token: {
			colorBgContainer,
			borderRadiusLG,
			fontSizeHeading5,
			colorText,
		},
	} = theme.useToken();
    	const selectedFooterMenuItem =
			location.pathname.split("/").slice(2).length !== 0
				? location.pathname.split("/").slice(2)[0]
				: "home";
	return [
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%", width: "100%" }}
				>
					{selectedFooterMenuItem === "home" ? (
						<HomeRoundedIcon />
					) : (
						<HomeOutlinedIcon />
					)}
					<Text>Home</Text>
				</Flex>
			),
			key: "home",
			style: { height: 50, padding: 0 },
			onClick: () => navigate(""),
		},
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%", width: "100%" }}
				>
					{selectedFooterMenuItem === "explore" ? (
						<ExploreRoundedIcon />
					) : (
						<ExploreOutlinedIcon />
					)}
					<Text>Explore</Text>
				</Flex>
			),
			key: "explore",
			style: { height: 50, padding: 0 },
			onClick: () => navigate("explore"),
		},
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%", width: "100%" }}
				>
					<AddCircleOutlineRoundedIcon />
					<Text>Create</Text>
				</Flex>
			),
			key: "create",
			style: { height: 50, padding: 0 },
			onClick: () => setOpenCreateModal(true),
		},
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%", width: "100%" }}
				>
					{selectedFooterMenuItem === "journey" ? (
						<AirplaneTicketRoundedIcon />
					) : (
						<AirplaneTicketOutlinedIcon />
					)}
					<Text>Journeys</Text>
				</Flex>
			),
			key: "journey",
			style: { height: 50, padding: 0 },
			onClick: () => navigate("journey"),
		},
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%", width: "100%" }}
				>
					<Avatar
						size="small"
						style={{
							backgroundColor: "green",
							verticalAlign: "middle",
							flexShrink: 0,
							border:
								selectedFooterMenuItem === "profile"
									? "3px solid " + colorText
									: "0px solid " + colorText,
						}}
					>
						{name.charAt(0).toUpperCase()}
					</Avatar>
					<Text>Profile</Text>
				</Flex>
			),
			key: "profile",
			style: { height: 50, padding: 0 },
			onClick: () => navigate("profile"),
		},
	];
};
export default useMobileFooterMenuItems;
