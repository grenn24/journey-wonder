import {
	LogoutOutlined,
	MenuOutlined,
	PlusOutlined,
	SearchOutlined,
	SettingFilled,
	SettingOutlined,
	UserOutlined,
} from "@ant-design/icons";
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
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import journeyWonder from "../assets/images/journey-wonder.png";
import authService from "../services/auth";
import {
	UpcomingOutlined as UpcomingOutlinedIcon,
	UpcomingRounded as UpcomingRoundedIcon,
	CheckCircleRounded as CheckCircleRoundedIcon,
	CheckCircleOutlineRounded as CheckCircleOutlineRoundedIcon,
	DeleteRounded as DeleteRoundedIcon,
	DeleteOutlineRounded as DeleteOutlineRoundedIcon,
	ChevronLeftRounded as ChevronLeftRoundedIcon,
	ChevronRightRounded as ChevronRightRoundedIcon,
	HomeOutlined as HomeOutlinedIcon,
	HomeRounded as HomeRoundedIcon,
} from "@mui/icons-material";
import { useAppSelector } from "../redux/store";

const User = () => {
	const {
		token: { colorBgContainer, borderRadiusLG, fontSizeHeading5 },
	} = theme.useToken();
	const { Text } = Typography;
	const [splitterSize, setSplitterSize] = useState<(number | string)[]>([
		280,
		"100%",
	]);
	const selectedItem =
		location.pathname.split("/").slice(2).length !== 0
			? location.pathname.split("/").slice(2)[0]
			: "home";
	const handleMenuButtonClick = () =>
		Number(splitterSize[0]) > 100
			? setSplitterSize([100, window.innerWidth - 100])
			: setSplitterSize([280, "100%"]);

	const leftSiderItems = [
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%", width: "100%" }}
				>
					<Button
						size="large"
						shape="circle"
						icon={
							Number(splitterSize[0]) > 100 ? (
								<ChevronLeftRoundedIcon />
							) : (
								<ChevronRightRoundedIcon />
							)
						}
						onClick={handleMenuButtonClick}
					/>
				</Flex>
			),
			key: "arrow",
			disabled: true,
			style: { height: 70 },
		},
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%" }}
				>
					{selectedItem === "home" ? (
						<HomeRoundedIcon />
					) : (
						<HomeOutlinedIcon />
					)}
					<Text>Home</Text>
				</Flex>
			),
			key: "home",
			style: { height: 80 },
			onClick: () => navigate(""),
		},
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%" }}
				>
					{selectedItem === "upcoming" ? (
						<UpcomingRoundedIcon />
					) : (
						<UpcomingOutlinedIcon />
					)}
					<Text>Upcoming</Text>
				</Flex>
			),
			key: "upcoming",
			style: { height: 80 },
			onClick: () => navigate("upcoming"),
		},
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%" }}
				>
					{selectedItem === "completed" ? (
						<CheckCircleRoundedIcon />
					) : (
						<CheckCircleOutlineRoundedIcon />
					)}
					<Text>Completed</Text>
				</Flex>
			),
			key: "completed",
			style: { height: 80 },
			onClick: () => navigate("completed"),
		},
		{
			label: (
				<Flex
					vertical
					align="center"
					justify="center"
					style={{ height: "100%" }}
				>
					{selectedItem === "deleted" ? (
						<DeleteRoundedIcon />
					) : (
						<DeleteOutlineRoundedIcon />
					)}
					<Text>Deleted</Text>
				</Flex>
			),
			key: "deleted",
			style: { height: 80 },
			onClick: () => navigate("deleted"),
		},
		{
			label: "JourneyWonder Pro",
			key: "pricing",
			onClick: () => navigate("pricing"),
		},
	];
	const dropdownMenu = [
		{
			label: "Profile",
			key: "Profile",
			icon: <UserOutlined style={{ fontSize: fontSizeHeading5 }} />,
			style: { fontSize: fontSizeHeading5 },
		},
		{
			label: "Settings",
			key: "Settings",
			icon: <SettingOutlined style={{ fontSize: fontSizeHeading5 }} />,
			style: { fontSize: fontSizeHeading5 },
		},
		{
			label: "Log Out",
			key: "Log Out",
			icon: <LogoutOutlined style={{ fontSize: fontSizeHeading5 }} />,
			onClick: () => setOpenLogOutModal(true),
			style: { fontSize: fontSizeHeading5 },
		},
	];
	const handleLogOut = () =>
		authService.logout().then(() => navigate("/guest"));
	const navigate = useNavigate();
	const [openLogOutModal, setOpenLogOutModal] = useState(false);
	const { name } = useAppSelector((state) => ({
		name: state.user.name,
	}));


	return (
		<Layout style={{ height: "100vh" }}>
			<Splitter
				onResize={setSplitterSize}
				style={{ backgroundColor: colorBgContainer }}
			>
				<Splitter.Panel
					size={splitterSize[0]}
					resizable
					min="10%"
					max="25%"
				>
					<Menu
						mode="vertical"
						defaultSelectedKeys={[selectedItem]}
						items={leftSiderItems}
						style={{ paddingTop: 0 }}
					/>
				</Splitter.Panel>
				<Splitter.Panel size={splitterSize[1]} resizable>
					<Layout>
						<Header
							style={{
								backgroundColor: colorBgContainer,
								padding: "0 25px",
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Flex
								justify="space-between"
								align="center"
								style={{ width: 1200 }}
							>
								<Image
									width={70}
									src={journeyWonder}
									preview={false}
								/>
								<Flex gap={20} align="center">
									<Input
										addonBefore={<SearchOutlined />}
										size="large"
										placeholder="Explore itineraries"
										variant="filled"
									/>
									<Dropdown
										menu={{ items: dropdownMenu }}
										placement="bottomRight"
									>
										<Avatar
											size="large"
											style={{
												backgroundColor: "green",
												verticalAlign: "middle",
												flexShrink: 0,
											}}
										>
											{name.charAt(0).toUpperCase()}
										</Avatar>
									</Dropdown>
								</Flex>
							</Flex>
						</Header>
						<Content>
							<Outlet />
						</Content>
					</Layout>
				</Splitter.Panel>
			</Splitter>

			<FloatButton
				style={{ width: 50, height: 50 }}
				icon={<PlusOutlined />}
				onClick={() => console.log("onClick")}
				tooltip="Create a Trip"
			/>
			<Modal
				open={openLogOutModal}
				title="Log Out"
				onOk={handleLogOut}
				onCancel={() => setOpenLogOutModal(false)}
				centered
			>
				<Text>Are you sure you want to log out?</Text>
			</Modal>
		</Layout>
	);
};

export default User;
