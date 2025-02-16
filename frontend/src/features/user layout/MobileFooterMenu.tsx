import { Menu } from "antd";
import { Footer } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import useMobileFooterMenuItems from "./menus/mobileFooterMenuItems";
import CreateModal from "../createJourney/CreateModal";

const MobileFooterMenu = () => {
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const selectedMobileFooterMenuItem = !openCreateModal
		? location.pathname.split("/").slice(2).length !== 0
			? location.pathname.split("/").slice(2)[0]
			: "home"
		: "create";

	const mobileFooterMenuItems = useMobileFooterMenuItems(setOpenCreateModal);

	return (
		<>
			<Footer
				style={{
					padding: 0,
					position: "fixed",
					width: "100%",
					bottom: 0,
				}}
			>
				<Menu
					mode="inline"
					selectedKeys={[selectedMobileFooterMenuItem]}
					items={mobileFooterMenuItems}
					style={{
						paddingTop: 0,
						display: "flex",
						justifyContent: "space-evenly",
					}}
				/>
			</Footer>
			<CreateModal
				openCreateModal={openCreateModal}
				setOpenCreateModal={setOpenCreateModal}
			/>
		</>
	);
};

export default MobileFooterMenu;
