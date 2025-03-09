import { AutoComplete, Button, Flex, Image, Input, Menu, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import useBreakpoints from "../../utilities/breakpoints";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { useState } from "react";
import useHeaderMenuItems from "./headerMenuItems";
import journeyWonderIcon from "../../assets/images/journey-wonder-icon/svg/journey-wonder-icon-white-background-normal.svg";
import MobileDrawerMenu from "./MobileDrawerMenu";
import i18n from "../../i18n";
import ExploreJourneysDrawer from "../../components/ExploreJourneysDrawer";
import LanguageMenu from "../../components/LanguageMenu/LanguageMenu";
import useTheme from "../../assets/styles/useTheme";

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

const GuestHeader = () => {
	const breakpoints = useBreakpoints();
	const navigate = useNavigate();
	const [openMobileDrawerMenu, setOpenMobileDrawerMenu] = useState(false);
	const [openExploreJourneysDrawer, setOpenExploreJourneysDrawer] =
		useState(false);
	const headerMenuItems = useHeaderMenuItems();
	const {
		token: { colorBgContainer, colorText },
	} = theme.useToken();
	const { algorithm } = useTheme();
	const selectedItem =
		location.pathname.split("/").slice(2).length !== 0
			? location.pathname.split("/").slice(2)[0]
			: "home";
	return (
		<>
			<Header
				style={{
					backgroundColor: colorBgContainer,
					padding: "0px 20px",
					display: "flex",
					justifyContent: "center",
					height: 70,
				}}
			>
				<Flex
					justify="space-between"
					align="center"
					style={{ width: 1350, height: "100%" }}
				>
					<Flex gap={30} align="center" style={{ height: "100%" }}>
						<a
							href="/guest"
							target="_self"
							rel="noopener noreferrer"
							title="Journey Wonder"
						>
							<Image
								width={47}
								src={journeyWonderIcon}
								preview={false}
							/>
						</a>
						{breakpoints.largerThan("md") && (
							<Menu
								className="guest-nav-bar"
								mode="horizontal"
								items={headerMenuItems}
								selectedKeys={[selectedItem]}
								disabledOverflow
								style={{ border: 0 }}
							/>
						)}
					</Flex>
					<Flex gap={17} align="center" style={{ height: "100%" }}>
						{breakpoints.largerThan("xl") ? (
							<>
								<Button
									variant="outlined"
									color="default"
									size="large"
									onClick={() => navigate("account/log-in")}
									style={{
										fontWeight: 600,
										border: `1px solid ${colorText}`,
										color: colorText,
									}}
									iconPosition="end"
									icon={
										<ArrowForwardIosRounded
											style={{
												fontSize: 14,
											}}
										/>
									}
								>
									{i18n.t("Log In")}
								</Button>
								<Button
									variant="solid"
									color="default"
									size="large"
									style={{ fontWeight: 600 }}
									iconPosition="end"
									icon={
										<ArrowForwardIosRounded
											style={{
												fontSize: 14,
											}}
										/>
									}
									onClick={() => navigate("account/sign-up")}
								>
									{i18n.t("Sign Up")}
								</Button>
							</>
						) : (
							<>
								<Button
									variant="solid"
									color="default"
									size="large"
									icon={<MenuOutlined />}
									onClick={() =>
										setOpenMobileDrawerMenu(true)
									}
								/>
							</>
						)}{" "}
					</Flex>
				</Flex>
			</Header>
			<MobileDrawerMenu
				openMobileDrawerMenu={openMobileDrawerMenu}
				setOpenMobileDrawerMenu={setOpenMobileDrawerMenu}
			/>
			<ExploreJourneysDrawer
				openExploreJourneysDrawer={openExploreJourneysDrawer}
				setOpenExploreJourneysDrawer={setOpenExploreJourneysDrawer}
			/>
		</>
	);
};
export default GuestHeader;

/*
<AutoComplete
									popupClassName="certain-category-search-dropdown"
									popupMatchSelectWidth
									style={{ width: 200, alignItems: "center" }}
									options={options}
								>
									<Input
										prefix={
											<SearchOutlined
												style={{ marginRight: 5 }}
											/>
										}
										size="large"
										placeholder={i18n.t(
											"Ask JourneyWonder AI"
										)}
										variant="filled"
									/>
								</AutoComplete>
*/

/*
	<Button
									variant="filled"
									color="default"
									size="large"
									icon={<SearchOutlined />}
									onClick={() =>
										setOpenExploreJourneysDrawer(true)
									}
								/>
*/
