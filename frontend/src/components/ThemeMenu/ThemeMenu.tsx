import { GlobalOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import useThemeMenuItems from "./themeMenuItems";
import { useAppSelector } from "../../redux/store";
import { Theme } from "../../redux/slices/theme";
import { DarkModeRounded, LightModeRounded, SettingsBrightnessRounded } from "@mui/icons-material";

interface Prop {
	placement?:
		| "bottom"
		| "bottomLeft"
		| "bottomRight"
		| "top"
		| "topLeft"
		| "topRight";
        size?: "large" | "middle" | "small"
}
const ThemeMenu = ({ placement = "bottom", size="large" }: Prop) => {
	const { theme } = useAppSelector((state) => ({
		theme: state.theme.theme
	}));
	const themeMenuItems = useThemeMenuItems();

	return (
		<Dropdown
			menu={{
				items: themeMenuItems,
				selectedKeys: [theme],
			}}
			placement={placement}
		>
			<Button
				variant="filled"
				color="default"
				size={size}
				icon={
					theme === Theme.Dark ? (
						<DarkModeRounded fontSize="small" />
					) : theme === Theme.Light ? (
						<LightModeRounded fontSize="small" />
					) : (
						<SettingsBrightnessRounded fontSize="small" />
					)
				}
				style={{ flexShrink: 0 }}
			/>
		</Dropdown>
	);
};

export default ThemeMenu;
