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
	Tooltip,
	Typography,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useBreakpoints from "../utilities/breakpoints";
import useMobileFooterMenuItems from "../features/user layout/menus/mobileFooterMenuItems";
import useLeftMenuItems from "../features/user layout/menus/leftMenuItems";
import UserHeader from "../features/user layout/Header";
import MobileFooterMenu from "../features/user layout/MobileFooterMenu";
import CreateModal from "../features/createJourney/CreateModal";
import i18next from "i18next";
import ExploreJourneysDrawer from "../components/ExploreJourneysDrawer";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";

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
	const leftMenuItems = useLeftMenuItems(splitterSize);
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
	const handleMenuButtonClick = () =>
		Number(splitterSize[0]) > 100
			? setSplitterSize([100, window.innerWidth - 100])
			: setSplitterSize([280, "100%"]);

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
							min={100}
							max="25%"
						>
							<Flex
								vertical
								align="center"
								style={{
									height: "100%",
									paddingTop: 20,
									paddingBottom: 20,
								}}
							>
								<Button
									size="large"
									shape="circle"
									icon={
										Number(splitterSize[0]) > 100 ? (
											<ChevronLeftRounded />
										) : (
											<ChevronRightRounded />
										)
									}
									onClick={handleMenuButtonClick}
								/>
								<Flex
									justify="center"
									align="center"
									style={{ flexGrow: 1, width: "100%" }}
								>
									<Menu
										mode="vertical"
										defaultSelectedKeys={[
											selectedLeftMenuItem,
										]}
										items={leftMenuItems}
										style={{
											border: 0,
											width: "auto",
											height: "60%",
											display: "flex",
											justifyContent: "space-evenly",
											flexDirection: "column",
											position: "relative",
											bottom: 30,
										}}
									/>
								</Flex>
							</Flex>
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
				<Tooltip
					title={i18next.t("Create a Journey")}
					color="primary"
					placement="left"
				>
					<FloatButton
						style={{ width: 50, height: 50 }}
						icon={<PlusOutlined />}
						onClick={() => setOpenCreateModal(true)}
					/>
				</Tooltip>
			)}
			<CreateModal
				openCreateModal={openCreateModal}
				setOpenCreateModal={setOpenCreateModal}
			/>
		</>
	);
};

export default User;
