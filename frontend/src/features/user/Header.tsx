import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Image, Input, Modal, theme, Typography } from "antd";
import { Header as HeaderBase } from "antd/es/layout/layout";
import { useAppSelector } from "../../redux/store";
import useBreakpoints from "../../utilities/breakpoints";
import { NotificationsNoneRounded } from "@mui/icons-material";
import useProfileMenu from "./menus/profileMenu";
import { useState } from "react";
import journeyWonder from "../../assets/images/journey-wonder.png";
import authService from "../../services/auth";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";

const {Text} = Typography;
const UserHeader = (
) => {
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
    const [openLogOutModal,setOpenLogOutModal] = useState(false);
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
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
		<HeaderBase
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
				<Image width={70} src={journeyWonder} preview={false} />
				<Flex gap={15} align="center">
					{breakpoints.largerThan("lg") ? (
						<>
							<Input
								addonBefore={<SearchOutlined />}
								size="large"
								placeholder={i18next.t("Explore Journeys")}
								variant="filled"
							/>
							<Button
								size="large"
								variant="text"
								color="default"
								icon={
									<NotificationsNoneRounded
										style={{ fontSize: 25 }}
									/>
								}
								style={{ flexShrink: 0 }}
							/>
							<Dropdown
								dropdownRender={profileMenu[profileMenuSection]}
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
									}}
								>
									{name.charAt(0).toUpperCase()}
								</Avatar>
							</Dropdown>
						</>
					) : (
						<Button
							variant="filled"
							color="default"
							size="large"
							icon={<SearchOutlined />}
						/>
					)}
				</Flex>
			</Flex>
			<Modal
				open={openLogOutModal}
				title={i18next.t("Log Out")}
				onOk={handleLogOut}
				onCancel={() => setOpenLogOutModal(false)}
				centered
				okText={i18next.t("Yes")}
				cancelText={i18next.t("No")}
			>
				<Text>{i18next.t("Are you sure you want to log out?")}</Text>
			</Modal>
		</HeaderBase>
	);
};
export default UserHeader;
