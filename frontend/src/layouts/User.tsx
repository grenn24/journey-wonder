import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Dropdown,
	Flex,
	FloatButton,
	Image,
	Input,
	Layout,
	Menu,
	Modal,
	Splitter,
	theme,
	Typography,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useBreakpoints from "../utilities/breakpoints";
import useMobileFooterMenuItems from "../features/user/menus/mobileFooterMenuItems";
import useLeftMenuItems from "../features/user/menus/leftMenuItems";
import UserHeader from "../features/user/Header";
import MobileFooterMenu from "../features/user/MobileFooterMenu";
import CreateModal from "../features/user/CreateModal";
import i18next from "i18next";

const User = () => {
	const dispatch = useDispatch();
	const {
		token: {
			colorBgContainer,
			borderRadiusLG,
			fontSizeHeading5,
			colorText,
		},
	} = theme.useToken();
	const [splitterSize, setSplitterSize] = useState<(number | string)[]>([
		280,
		"100%",
	]);

	const breakpoints = useBreakpoints();
	const leftMenuItems = useLeftMenuItems(splitterSize, setSplitterSize);
	const { Text } = Typography;
	const [openCreateModal, setOpenCreateModal] = useState(false);

	const selectedLeftMenuItem =
		location.pathname
			.split("/")
			.slice(location.pathname.split("/").length - 1)[0] !== "user"
			? location.pathname
					.split("/")
					.slice(location.pathname.split("/").length - 1)[0]
			: "home";

	return (
		<>
			<Layout style={{ height: "100vh" }}>
				<Splitter
					onResize={setSplitterSize}
					style={{ backgroundColor: colorBgContainer }}
				>
					{breakpoints.largerThan("md") && (
						<Splitter.Panel
							size={splitterSize[0]}
							resizable
							min="10%"
							max="25%"
						>
							<Menu
								mode="vertical"
								defaultSelectedKeys={[selectedLeftMenuItem]}
								items={leftMenuItems}
								style={{ paddingTop: 0 }}
							/>
						</Splitter.Panel>
					)}

					<Splitter.Panel size={splitterSize[1]} resizable>
						<Layout>
							<UserHeader />
							<Content>
								<Outlet />
							</Content>
						</Layout>
					</Splitter.Panel>
				</Splitter>
				{breakpoints.smallerThan("md") && <MobileFooterMenu />}
			</Layout>
			{breakpoints.largerThan("md") && (
				<FloatButton
					style={{ width: 50, height: 50 }}
					icon={<PlusOutlined />}
					onClick={() => setOpenCreateModal(true)}
					tooltip={i18next.t("Create a Journey")}
				/>
			)}
			<CreateModal
				openCreateModal={openCreateModal}
				setOpenCreateModal={setOpenCreateModal}
			/>
		</>
	);
};

export default User;
