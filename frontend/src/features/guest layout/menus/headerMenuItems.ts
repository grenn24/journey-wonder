import { theme } from "antd";
import { useNavigate } from "react-router-dom";
import i18n from "../../../i18n";

const useHeaderMenuItems =()=> {
    const navigate = useNavigate();
    	 const {
				token: {
					fontSizeHeading5,
				},
			} = theme.useToken();
    return [
		{
			label: i18n.t("Home"),
			key: "home",
			onClick: () => navigate(""),
			style: {
				fontFamily: "Outfit",
				fontWeight: 600,
				fontSize: fontSizeHeading5,
			},
		},
		{
			label: i18n.t("Explore"),
			key: "explore",
			onClick: () => navigate("explore"),
			style: {
				fontFamily: "Outfit",
				fontWeight: 600,
				fontSize: fontSizeHeading5,
			},
		},
		{
			label: i18n.t("JourneyWonder Pro"),
			key: "pricing",
			onClick: () => navigate("pricing"),
			style: {
				fontFamily: "Outfit",
				fontWeight: 600,
				fontSize: fontSizeHeading5,
			},
		},
		{
			label: i18n.t("About Us"),
			key: "about",

			style: {
				fontFamily: "Outfit",
				fontWeight: 600,
				fontSize: fontSizeHeading5,
			},
			children: [
				{
					label: i18n.t("Our Mission"),
					key: "mission",
					onClick: () => navigate("about/mission"),
				},
				{
					label: i18n.t("Creators"),
					key: "creators",
					onClick: () => navigate("about/creators"),
				},
			],
		},
	];}
export default useHeaderMenuItems;