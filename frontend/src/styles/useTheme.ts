import { theme } from "antd";
import { Theme } from "../redux/slices/theme";
import { useAppSelector } from "../redux/store";
import { getLanguageFont } from "../redux/slices/language";


const useTheme = () => {
	const { globalTheme , globalLanguage} = useAppSelector((state) => ({
		globalTheme: state.theme.theme,
		globalLanguage: state.language.language
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
			borderRadiusSM: 20,
			borderRadiusLG: 20,
			fontWeightStrong:1000,
			fontSizeHeading4:19,
			colorPrimary: "#7cb305",
			colorPrimaryText: "#7cb305", // text
			colorInfo: "#5b8c00", // button text, links
			colorBgSpotlight: "#5b8c00", // tooltip background
		} as TokenType,
	};
};
export default useTheme;