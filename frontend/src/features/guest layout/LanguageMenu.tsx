import { GlobalOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import useLanguageMenuItems from "./menus/languageMenuItems";
import { useAppSelector } from "../../redux/store";

interface Prop {
	placement?:"bottom" | "bottomLeft" |  "bottomRight" |  "top"  | "topLeft" |  "topRight"
}
const LanguageMenu = ({placement="bottom"}:Prop) => {
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
				size="large"
				icon={<GlobalOutlined />}
			/>
		</Dropdown>
	);
};

export default LanguageMenu;
