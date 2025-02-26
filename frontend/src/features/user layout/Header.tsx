import { SearchOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Dropdown,
	Flex,
	Image,
	Input,
	Modal,
	theme,
	Typography,
} from "antd";
import { Header as HeaderBase } from "antd/es/layout/layout";
import { useAppSelector } from "../../redux/store";
import useBreakpoints from "../../utilities/breakpoints";
import useProfileMenu from "./menus/profileMenu";
import { useState } from "react";
import journeyWonderIcon from "../../assets/images/journey-wonder-icon/svg/journey-wonder-icon-white-background-normal.svg";
import authService from "../../services/auth";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import ExploreJourneysDrawer from "../../components/ExploreJourneysDrawer";
import NotificationButton from "./NotificationButton";
import useTheme from "../../styles/useTheme";

const { Text } = Typography;
const UserHeader = () => {
	const { name, splitterSize, globalTheme } = useAppSelector((state) => ({
		name: state.user.name,
		globalTheme: state.theme.theme,
		globalLanguage: state.language.language,
		splitterSize: state.layout.splitterSize,
	}));
	const { algorithm } = useTheme();
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
		<div>
			<HeaderBase
				style={{
					backgroundColor: "rgba(0,0,0,0)",
					padding: "0px 20px",
					display: "flex",
					justifyContent: "center",
					position: "fixed",
					width: breakpoints.largerThan("md")
						? document.documentElement.clientWidth - splitterSize[0]
						: "100%",
					zIndex: 5,
					height: 70,
				}}
			>
				<Flex
					justify="space-between"
					align="center"
					style={{ width: "100%" }}
				>
					<a
						href="/user"
						target="_self"
						rel="noopener noreferrer"
						title="Journey Wonder"
					>
						<Image
							width={45}
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
									style={{
										background: "rgba(255, 255, 255, 0.3)",
										color: "black",
										mixBlendMode:
											"difference"
									}}
								/>
								<NotificationButton />
								<Dropdown
									dropdownRender={
										profileMenu[profileMenuSection]
									}
									placement="bottomRight"
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
		</div>
	);
};
export default UserHeader;
