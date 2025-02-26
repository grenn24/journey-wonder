import { theme } from "antd";
import { Theme } from "../redux/slices/theme";
import { useAppSelector } from "../redux/store";
import { getLanguageFont } from "../redux/slices/language";
import { createTheme } from "@mui/material";

const useTheme = () => {
	const { globalTheme, globalLanguage } = useAppSelector((state) => ({
		globalTheme: state.theme?.theme,
		globalLanguage: state.language?.language,
	}));
	const { token } = theme.useToken();
	type TokenType = typeof token;
	return {
		algorithm:
			globalTheme === Theme.Light
				? theme.defaultAlgorithm
				: window.matchMedia("(prefers-color-scheme: dark)").matches
				? theme.darkAlgorithm
				: theme.defaultAlgorithm,
		token: {
			fontFamily: getLanguageFont(globalLanguage),
			borderRadius: 20,
			borderRadiusSM: 10,
			borderRadiusLG: 20,
			fontWeightStrong: 600,
			fontSizeHeading4: 19,
			fontSize: 16,
			colorPrimary: "#7cb305",
			colorPrimaryText: "#7cb305", // text
			colorInfo: "#5b8c00", // button text, links
			colorBgSpotlight: "#5b8c00", // tooltip background
		} as TokenType,
	};
};
export default useTheme;

export const useMuiTheme = () => {
	const { globalLanguage } = useAppSelector((state) => ({
		globalLanguage: state.language.language,
	}));
	const theme = createTheme({
		typography: {
			fontFamily: getLanguageFont(globalLanguage),
			fontSize:16
		},
		palette: {
			primary: {
				main: "#7cb305",
				light: "#a0d911",
			},
			text: {
				primary: "rgba(0, 0, 0, 0.87)",
				secondary: "rgba(0, 0, 0, 0.47)",
				disabled: "rgba(0, 0, 0, 0.38)",
			},
		},
		shape: {
			borderRadius: 20,
		},
	});
	return theme;
};
