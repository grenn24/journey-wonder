import {
	Anchor,
	AutoComplete,
	Button,
	Drawer,
	Dropdown,
	Flex,
	Grid,
	Image,
	Input,
	Layout,
	Menu,
	MenuProps,
	Space,
	theme,
} from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
	CloseOutlined,
	GlobalOutlined,
	MenuOutlined,
	RightOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { Content, Footer, Header } from "antd/es/layout/layout";
import journeyWonder from "../assets/images/journey-wonder.png";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { Language, setLanguage } from "../redux/slices/language";

const options = [
	{
		label: "Libraries",
		value: "Libraries",
	},
	{
		label: "Solutions",
		value: "Solutions",
	},
	{
		label: "Articles",
		value: "Articles",
	},
];

const Guest = () => {
		const {
			token: { colorBgContainer, borderRadiusLG, fontWeightStrong, fontSizeHeading5, fontSizeHeading4 },
		} = theme.useToken();
	const navbarItems = [
		{
			label: "Home",
			key: "home",
			onClick: () => navigate(""),
			style: {
				fontFamily: "Roboto",
				fontWeight: fontWeightStrong,
				fontSize: fontSizeHeading5,
			},
		},
		{
			label: "Explore",
			key: "explore",
			onClick: () => navigate("explore"),
			style: {
				fontFamily: "Roboto",
				fontWeight: fontWeightStrong,
				fontSize: fontSizeHeading5,
			},
		},
		{
			label: "JourneyWonder Pro",
			key: "pricing",
			onClick: () => navigate("pricing"),
			style: {
				fontFamily: "Roboto",
				fontWeight: fontWeightStrong,
				fontSize: fontSizeHeading5,
			},
		},
		{
			label: "About Us",
			key: "about",

			style: {
				fontFamily: "Roboto",
				fontWeight: fontWeightStrong,
				fontSize: fontSizeHeading5,
			},
			children: [
				{
					label: "Our Mission",
					key: "mission",
					onClick: () => navigate("about/mission"),
				},
				{
					label: "Creators",
					key: "creators",
					onClick: () => navigate("about/creators"),
				},
			],
		},
	];
	const languages = [
		{
			label: "English (UK)",
			key: "EnglishUK",
			onClick: () => dispatch(setLanguage(Language.EnglishUK)),
		},
		{
			label: "中文（简体）",
			key: "中文（简体）",
			onClick: () => dispatch(setLanguage(Language.ChineseSimplified)),
		},
		{
			label: "日本語",
			key: "日本語",
			onClick: () => dispatch(setLanguage(Language.Japanese)),
		},
	];

	const location = useLocation();
	const selectedItem =
		location.pathname.split("/").slice(2).length !== 0
			? location.pathname.split("/").slice(2)[0]
			: "home";
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { useBreakpoint } = Grid;
	const breakpoints = useBreakpoint();
	const [openDrawer, setOpenDrawer] = useState(false);
	const { language } = useAppSelector((state) => ({
		language: state.language.language,
	}));
	return (
		<Layout>
			<Header
				style={{
					backgroundColor: colorBgContainer,
					padding: "0px 25px",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Flex
					justify="space-between"
					align="center"
					style={{ width: 1400 }}
				>
					<Space style={{ fontWeight: 400 }}>
						<a
							href="/guest"
							target="_self"
							rel="noopener noreferrer"
						>
							<Image
								width={70}
								src={journeyWonder}
								preview={false}
							/>
						</a>
						{(breakpoints.xxl ||
							breakpoints.xl ||
							breakpoints.lg) && (
							<Menu
								mode="horizontal"
								items={navbarItems}
								selectedKeys={[selectedItem]}
								disabledOverflow
							/>
						)}
					</Space>
					{breakpoints.xxl || breakpoints.xl || breakpoints.lg ? (
						<Flex gap={10} align="center">
							<AutoComplete
								popupClassName="certain-category-search-dropdown"
								popupMatchSelectWidth
								style={{ width: 200, alignItems: "center" }}
								options={options}
							>
								<Input
									addonBefore={<SearchOutlined />}
									size="large"
									placeholder="Explore itineraries"
									variant="filled"
								/>
							</AutoComplete>
							<Dropdown
								menu={{
									items: languages,
									selectedKeys: [language],
								}}
								placement="bottom"
							>
								<Button icon={<GlobalOutlined />} />
							</Dropdown>
							<Button
								variant="outlined"
								onClick={() => navigate("account/log-in")}
								style={{ fontWeight: 400 }}
								iconPosition="end"
								icon={
									<RightOutlined style={{ fontSize: 12 }} />
								}
							>
								Log In
							</Button>
							<Button
								variant="solid"
								color="green"
								style={{ fontWeight: 400 }}
								iconPosition="end"
								icon={
									<RightOutlined style={{ fontSize: 12 }} />
								}
							>
								Sign Up
							</Button>
						</Flex>
					) : (
						<Flex gap={15} align="center">
							<Button
								variant="outlined"
								icon={<SearchOutlined />}
							/>
							<Button
								variant="solid"
								color="green"
								icon={<MenuOutlined />}
								onClick={() => setOpenDrawer(true)}
							/>
						</Flex>
					)}
				</Flex>
				<Drawer
					title=""
					onClose={() => setOpenDrawer(false)}
					open={openDrawer}
					width="100vw"
					styles={{
						header: {
							padding: "25px 15px",
						},
						body: {
							padding: "15px 15px",
						},
					}}
				>
					<Layout
						style={{
							height: "100%",
							padding: "0px 0px",
							backgroundColor: colorBgContainer,
						}}
					>
						<Content>
							<Menu
								mode="inline"
								selectedKeys={[selectedItem]}
								style={{ border: 0 }}
								onClick={() => setOpenDrawer(false)}
							>
								<Menu.Item
									key="home"
									style={{
										fontFamily: "Roboto",
										fontWeight: fontWeightStrong,
										fontSize: fontSizeHeading4,
										padding: "25px 20px",
									}}
								>
									Home
								</Menu.Item>
								<Menu.Divider
									dashed
									style={{ borderWidth: 1.5 }}
								/>
								<Menu.Item
									key="explore"
									style={{
										fontFamily: "Roboto",
										fontWeight: fontWeightStrong,
										fontSize: fontSizeHeading4,
										padding: "25px 20px",
									}}
								>
									Explore
								</Menu.Item>
								<Menu.Divider
									dashed
									style={{ borderWidth: 1.5 }}
								/>
								<Menu.Item
									key="pricing"
									style={{
										fontFamily: "Roboto",
										fontWeight: fontWeightStrong,
										fontSize: fontSizeHeading4,
										padding: "25px 20px",
									}}
								>
									JourneyWonder Pro
								</Menu.Item>
								<Menu.Divider
									dashed
									style={{ borderWidth: 1.5 }}
								/>
								<Menu.SubMenu
									title="About Us"
									style={{
										fontFamily: "Roboto",
										fontWeight: fontWeightStrong,
										fontSize: fontSizeHeading4,
										padding: "10px 0px",
									}}
								>
									<Menu.Item
										key="mission"
										style={{
											fontFamily: "Roboto",
											fontWeight: fontWeightStrong,
											fontSize: fontSizeHeading5,
											padding: "25px 50px",
										}}
									>
										Our Mission
									</Menu.Item>
									<Menu.Item
										key="creators"
										style={{
											fontFamily: "Roboto",
											fontWeight: fontWeightStrong,
											fontSize: fontSizeHeading5,
											padding: "25px 50px",
										}}
									>
										Creators
									</Menu.Item>
								</Menu.SubMenu>
								<Menu.Divider
									dashed
									style={{ borderWidth: 1.5 }}
								/>
							</Menu>
						</Content>
						<Footer
							style={{
								backgroundColor: colorBgContainer,
								padding: 0,
								marginBottom: 17,
							}}
						>
							<Flex gap={20} justify="center" align="center">
								<Button
									variant="outlined"
									onClick={() => navigate("account/log-in")}
									style={{ fontWeight: 400 }}
									iconPosition="end"
									icon={
										<RightOutlined
											style={{ fontSize: 12 }}
										/>
									}
								>
									Log In
								</Button>
								<Button
									variant="solid"
									color="green"
									style={{ fontWeight: 400 }}
									iconPosition="end"
									icon={
										<RightOutlined
											style={{ fontSize: 12 }}
										/>
									}
								>
									Sign Up
								</Button>
							</Flex>
						</Footer>
					</Layout>
				</Drawer>
			</Header>

			<Content>
				<Outlet />
			</Content>
		</Layout>
	);
};

export default Guest;
