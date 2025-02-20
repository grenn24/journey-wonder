import {
	AutoComplete,
	Button,
	Dropdown,
	Flex,
	Image,
	Input,
	Menu,
	Space,
	theme,
} from "antd";
import { Header } from "antd/es/layout/layout";
import useBreakpoints from "../../utilities/breakpoints";
import { useAppSelector } from "../../redux/store";
import {
	GlobalOutlined,
	MenuOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { useState } from "react";
import useLanguageMenuItems from "./menus/languageMenuItems";
import useHeaderMenuItems from "./menus/headerMenuItems";
import journeyWonderIcon from "../../assets/images/journey-wonder-icon/svg/journey-wonder-icon-white-background-normal.svg";
import MobileDrawerMenu from "./MobileDrawerMenu";
import i18n from "../../i18n";
import ExploreJourneysDrawer from "../../components/ExploreJourneysDrawer";
import LanguageMenu from "./LanguageMenu";

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
	const languageMenuItems = useLanguageMenuItems();
	const headerMenuItems = useHeaderMenuItems();
	const {
		token: {
			colorBgContainer,
			borderRadiusLG,
			fontSizeHeading5,
			colorText,
			fontWeightStrong,
		},
	} = theme.useToken();
	const { language } = useAppSelector((state) => ({
		language: state.language.language,
	}));
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
				}}
			>
				<Flex
					justify="space-between"
					align="center"
					style={{ width: 1200 }}
				>
					<Flex gap={20}>
						<a
							href="/guest"
							target="_self"
							rel="noopener noreferrer"
							title="Journey Wonder"
						>
							<Image
								width={50}
								src={journeyWonderIcon}
								preview={false}
								style={{ marginBottom: 2 }}
							/>
						</a>
						{breakpoints.largerThan("lg") && (
							<Menu
								mode="horizontal"
								items={headerMenuItems}
								selectedKeys={[selectedItem]}
								disabledOverflow
							/>
						)}
					</Flex>
					<Flex gap={17} align="center">
						{breakpoints.largerThan("xl") ? (
							<>
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
								<LanguageMenu />
								<Button
									variant="text"
									color="default"
									size="large"
									onClick={() => navigate("account/log-in")}
									style={{ fontWeight: "bold" }}
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
									color="primary"
									size="large"
									style={{ fontWeight: "bold" }}
									iconPosition="end"
									icon={
										<ArrowForwardIosRounded
											style={{
												fontSize: 14,
											}}
										/>
									}
								>
									{i18n.t("Sign Up")}
								</Button>
							</>
						) : (
							<>
								<Button
									variant="filled"
									color="default"
									size="large"
									icon={<SearchOutlined />}
									onClick={() =>
										setOpenExploreJourneysDrawer(true)
									}
								/>
								<Button
									variant="solid"
									color="primary"
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
