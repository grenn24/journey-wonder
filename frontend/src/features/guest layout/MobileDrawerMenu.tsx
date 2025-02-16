import { GlobalOutlined } from "@ant-design/icons";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { Button, Drawer, Dropdown, Flex, Layout, Menu, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import useLanguageMenuItems from "./menus/languageMenuItems";
import { useAppSelector } from "../../redux/store";
import i18n from "../../i18n";

const { Footer } = Layout;
interface Prop {
	openMobileDrawerMenu: boolean;
	setOpenMobileDrawerMenu: (value: boolean) => void;
}
const MobileDrawerMenu = ( {openMobileDrawerMenu, setOpenMobileDrawerMenu}: Prop
	
) => {
	const {
		token: {
			colorBgContainer,
			fontWeightStrong,
			fontSizeHeading4,
			fontSizeHeading5,
			colorText,
		},
	} = theme.useToken();
	const { language } = useAppSelector((state) => ({
		language: state.language.language,
	}));
	const navigate = useNavigate();

	const languageMenuItems = useLanguageMenuItems();
	const selectedItem =
		location.pathname.split("/").slice(2).length !== 0
			? location.pathname.split("/").slice(2)[0]
			: "home";
	return (
		<Drawer
			title=""
			onClose={() => setOpenMobileDrawerMenu(false)}
			open={openMobileDrawerMenu}
			width="100vw"
			styles={{
				header: {
					padding: "25px 15px",
				},
				body: {
					padding: "0px 15px",
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
						defaultSelectedKeys={[selectedItem]}
						style={{ border: 0 }}
						onClick={() => setOpenMobileDrawerMenu(false)}
					>
						<Menu.Item
							key="home"
							style={{
								fontFamily: "Roboto",
								fontWeight: fontWeightStrong,
								fontSize: fontSizeHeading4,
								padding: "25px 20px",
								marginTop: 15,
								marginBottom: 15,
							}}
						>
							{i18n.t("Home")}
						</Menu.Item>
						<Menu.Divider dashed style={{ borderWidth: 1.5 }} />
						<Menu.Item
							key="explore"
							style={{
								fontFamily: "Roboto",
								fontWeight: fontWeightStrong,
								fontSize: fontSizeHeading4,
								padding: "25px 20px",
								marginTop: 15,
								marginBottom: 15,
							}}
						>
							{i18n.t("Explore")}
						</Menu.Item>
						<Menu.Divider dashed style={{ borderWidth: 1.5 }} />
						<Menu.Item
							key="pricing"
							style={{
								fontFamily: "Roboto",
								fontWeight: fontWeightStrong,
								fontSize: fontSizeHeading4,
								padding: "25px 20px",
								marginTop: 15,
								marginBottom: 15,
							}}
						>
							{i18n.t("JourneyWonder Pro")}
						</Menu.Item>
						<Menu.Divider dashed style={{ borderWidth: 1.5 }} />
						<Menu.SubMenu
							title={i18n.t("About Us")}
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
								{i18n.t("Our Mission")}
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
								{i18n.t("Creators")}
							</Menu.Item>
						</Menu.SubMenu>
						<Menu.Divider dashed style={{ borderWidth: 1.5 }} />
					</Menu>
				</Content>
				<Footer
					style={{
						backgroundColor: colorBgContainer,
						padding: 0,
						marginBottom: 25,
					}}
				>
					<Flex gap={20} justify="center" align="center">
						<Dropdown
							menu={{
								items: languageMenuItems,
								selectedKeys: [language],
							}}
							placement="bottom"
						>
							<Button
								size="large"
								variant="filled"
								color="default"
								icon={<GlobalOutlined />}
							/>
						</Dropdown>
						<Button
							size="large"
							variant="filled"
							color="default"
							onClick={() => navigate("account/log-in")}
							style={{ fontWeight: fontWeightStrong }}
							iconPosition="end"
							icon={
								<ArrowForwardIosRounded
									style={{
										fontSize: 14,
										fontWeight: 500,
									}}
								/>
							}
						>
							{i18n.t("Log In")}
						</Button>
						<Button
							size="large"
							variant="solid"
							color="primary"
							style={{ fontWeight: fontWeightStrong }}
							iconPosition="end"
							icon={
								<ArrowForwardIosRounded
									style={{
										fontSize: 14,
										fontWeight: 500,
									}}
								/>
							}
						>
							{i18n.t("Sign Up")}
						</Button>
					</Flex>
				</Footer>
			</Layout>
		</Drawer>
	);
};
export default MobileDrawerMenu;
