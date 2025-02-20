import { SearchOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Dropdown,
	Flex,
	Image,
	Input,
	Modal,
	Popover,
	theme,
	Typography,
} from "antd";
import { Header as HeaderBase } from "antd/es/layout/layout";
import { useAppSelector } from "../../redux/store";
import useBreakpoints from "../../utilities/breakpoints";
import { NotificationsNoneRounded } from "@mui/icons-material";
import useProfileMenu from "./menus/profileMenu";
import { useState } from "react";
import journeyWonderIcon from "../../assets/images/journey-wonder-icon/svg/journey-wonder-icon-white-background-normal.svg";
import authService from "../../services/auth";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import ExploreJourneysDrawer from "../../components/ExploreJourneysDrawer";
import NotificationButton from "./NotificationButton";

const { Text } = Typography;
const UserHeader = () => {
	const { name, globalTheme, globalLanguage } = useAppSelector((state) => ({
		name: state.user.name,
		globalTheme: state.theme.theme,
		globalLanguage: state.language.language,
	}));
	const {
		token: {
			colorBgContainer,
			borderRadiusLG,
			fontSizeHeading5,
			colorText,
		},
	} = theme.useToken();
	const navigate = useNavigate();
	const breakpoints = useBreakpoints();
	const [openLogOutModal, setOpenLogOutModal] = useState(false);
	const [openProfileMenu, setOpenProfileMenu] = useState(false);

	const [openExploreJourneysDrawer, setOpenExploreJourneysDrawer] =
		useState(false);
	const [profileMenuSection, setProfileMenuSection] =
		useState<keyof typeof profileMenu>("Home");
	const profileMenu = useProfileMenu(
		setOpenProfileMenu,
		setOpenLogOutModal,
		setProfileMenuSection
	);
	const handleLogOut = () =>
		authService.logout().then(() => navigate("/guest"));

	return (
		<>
			<HeaderBase
				style={{
					backgroundColor: colorBgContainer,
					padding: "0 20px",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Flex
					justify="space-between"
					align="center"
					style={{ width: 1000 }}
				>
					<a
						href="/user"
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
					<Flex gap={17} align="center">
						{breakpoints.largerThan("md") ? (
							<>
								<Input
									prefix={
										<SearchOutlined
											style={{ marginRight: 5 }}
										/>
									}
									size="large"
									placeholder={i18next.t(
										"Ask JourneyWonder AI"
									)}
									variant="filled"
								/>
								<NotificationButton />
								<Dropdown
									dropdownRender={
										profileMenu[profileMenuSection]
									}
									placement="bottomLeft"
									overlayStyle={{ width: 250 }}
									onOpenChange={(nextOpen, info) => {
										// set menu closing behaviour
										if (info.source === "trigger") {
											setOpenProfileMenu(nextOpen);
											setProfileMenuSection("Home");
										}
									}}
									open={openProfileMenu}
								>
									<Avatar
										size="large"
										style={{
											backgroundColor: "green",
											verticalAlign: "middle",
											flexShrink: 0,
											cursor: "pointer",
										}}
									>
										{name.charAt(0).toUpperCase()}
									</Avatar>
								</Dropdown>
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
								<NotificationButton />
							</>
						)}
					</Flex>
				</Flex>
			</HeaderBase>
			<Modal
				closable={false}
				open={openLogOutModal}
				title={i18next.t("Log Out")}
				onOk={handleLogOut}
				onCancel={() => setOpenLogOutModal(false)}
				centered
				okText={i18next.t("Yes")}
				cancelText={i18next.t("No")}
				styles={{
					wrapper: {
						backdropFilter: `blur(5px)`,
					},
				}}
			>
				<Text>{i18next.t("Are you sure you want to log out?")}</Text>
			</Modal>
			<ExploreJourneysDrawer
				openExploreJourneysDrawer={openExploreJourneysDrawer}
				setOpenExploreJourneysDrawer={setOpenExploreJourneysDrawer}
			/>
		</>
	);
};
export default UserHeader;
