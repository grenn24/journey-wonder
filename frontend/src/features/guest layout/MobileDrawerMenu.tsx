import { GlobalOutlined } from "@ant-design/icons";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { Button, Drawer, Dropdown, Flex, Layout, Menu, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../redux/store";
import i18n from "../../i18n";
import LanguageMenu from "../../components/LanguageMenu";
import ThemeMenu from "../../components/ThemeMenu";
import CloseButton from "../../components/CloseButton";

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
		},
	} = theme.useToken();
	const { language } = useAppSelector((state) => ({
		language: state.language.language,
	}));
	const navigate = useNavigate();


	const selectedItem =
		location.pathname.split("/").slice(2).length !== 0
			? location.pathname.split("/").slice(2)[0]
			: "home";
	return (
		<Drawer
			title={
				<Flex justify="space-between" align="center">
					<CloseButton
						variant="filled"
						handleButtonClick={() => setOpenMobileDrawerMenu(false)}
					/>
					<Flex gap={15} justify="flex-end">
						<ThemeMenu placement="bottom" />
						<LanguageMenu placement="bottomRight" />
					</Flex>
				</Flex>
			}
			closeIcon={<CloseButton variant="text" />}
			closable={false}
			onClose={() => setOpenMobileDrawerMenu(false)}
			open={openMobileDrawerMenu}
			width="100vw"
			styles={{
				header: {
					padding: "15px 15px",
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
							onClick={() => navigate("")}
							style={{
								fontWeight: fontWeightStrong,
								fontSize: 25,
								padding: "25px 25px",
								margin: "10px 0px",
								marginTop: 15,
								marginBottom: 15,
							}}
						>
							{i18n.t("Home")}
						</Menu.Item>

						<Menu.Divider dashed style={{ borderWidth: 1.5 }} />
						<Menu.Item
							key="pricing"
							onClick={() => navigate("pricing")}
							style={{
								fontWeight: fontWeightStrong,
								fontSize: 25,
								padding: "25px 25px",
								margin: "10px 0px",
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
								fontWeight: fontWeightStrong,
								fontSize: 25,
								padding: "10px 0px",
						
							}}
							
						>
							<Menu.Item
								key="mission"
								onClick={() => navigate("about/mission")}
								style={{
									fontWeight: fontWeightStrong,
									fontSize: fontSizeHeading4,
									padding: "25px 40px",
									margin: "10px 0px",
								}}
							>
								{i18n.t("Our Mission")}
							</Menu.Item>
							<Menu.Item
								key="creators"
								onClick={() => navigate("about/creators")}
								style={{
									fontWeight: fontWeightStrong,
									fontSize: fontSizeHeading4,
									padding: "25px 40px",
									margin: "10px 0px",
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
					<Flex
						justify="center"
						align="center"
						style={{ width: "100%" }}
					>
						<Flex gap={15}>
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
								color="default"
								onClick={() => navigate("account/sign-up")}
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
					</Flex>
				</Footer>
			</Layout>
		</Drawer>
	);
};
export default MobileDrawerMenu;

/*
				<Menu.Divider dashed style={{ borderWidth: 1.5 }} />
						<Menu.Item
							key="explore"
							onClick={() => navigate("explore")}
							style={{
								fontWeight: fontWeightStrong,
								fontSize: 25,
								padding: "25px 20px",
								margin: "10px 0px",
								marginTop: 15,
								marginBottom: 15,
							}}
						>
							{i18n.t("Explore")}
						</Menu.Item>
*/