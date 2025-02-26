import { GlobalOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import useLanguageMenuItems from "./languageMenuItems";
import { useAppSelector } from "../../redux/store";

interface Prop {
	placement?:
		| "bottom"
		| "bottomLeft"
		| "bottomRight"
		| "top"
		| "topLeft"
		| "topRight";
	size?: "large" | "middle" | "small";
}
const LanguageMenu = ({ placement = "bottom", size = "large" }: Prop) => {
	const { language } = useAppSelector((state) => ({
		language: state.language.language,
	}));
	const languageMenuItems = useLanguageMenuItems();

	return (
		<Dropdown
			menu={{
				items: languageMenuItems,
				selectedKeys: [language],
			}}
			placement={placement}
		>
			<Button
				variant="filled"
				color="default"
				size={size}
				icon={<GlobalOutlined />}
				style={{flexShrink:0}}
			/>
		</Dropdown>
	);
};

export default LanguageMenu;
