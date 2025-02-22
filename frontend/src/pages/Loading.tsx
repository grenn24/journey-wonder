import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Result, theme, Typography } from "antd";
import React from "react";
import { useAppSelector } from "../redux/store";
import journeyWonderLogoLightMode from "../assets/images/journey-wonder-icon/svg/journey-wonder-icon-white-background-normal.svg"
import journeyWonderLogoDarkMode from "../assets/images/journey-wonder-icon/svg/journey-wonder-icon-white-background-light.svg";

const {Title} = Typography;
const Loading = () => {
	const { token } = theme.useToken();
	const { colorBgContainer } = token;
	const { globalTheme } = useAppSelector((state) => ({
		globalTheme: state.theme.theme,
	}));
	return (
		<Flex
			vertical
			justify="center"
			align="center"
			style={{
				width: "100vw",
				height: "100vh",
				backgroundColor: colorBgContainer,
			}}
		>
			<img src={journeyWonderLogoLightMode} style={{width:125}}/>
			<Title level={4} style={{ fontFamily:"Outfit", position: "absolute", bottom: 20, display:"none" }}>
				Journey Wonder
			</Title>
		</Flex>
	);
};

export default Loading;
