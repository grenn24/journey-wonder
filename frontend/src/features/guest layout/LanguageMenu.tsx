import { GlobalOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React, { useState } from "react";
import useLanguageMenuItems from "./menus/languageMenuItems";
import { useAppSelector } from "../../redux/store";

const LanguageMenu = () => {
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

			placement="bottom"
			
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
