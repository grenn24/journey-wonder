import {
	LogoutOutlined,
	MoonFilled,
	MoonOutlined,
	SettingOutlined,
	StarOutlined,
	SunFilled,
	SunOutlined,
	UserOutlined,
	UserSwitchOutlined,
} from "@ant-design/icons";
import {
	Button,
	Flex,
	Menu,
	Segmented,
	theme,
	Tooltip,
	Typography,
} from "antd";
import {
	PhonelinkSetupOutlined as PhonelinkSetupOutlinedIcon,
	ContrastRounded as ContrastRoundedIcon,
	TranslateRounded as TranslateRoundedIcon,
	KeyboardBackspaceRounded as KeyboardBackspaceRoundedIcon,
	CheckRounded as CheckRoundedIcon,
} from "@mui/icons-material";
import { useAppSelector } from "../../../redux/store";
import { useDispatch } from "react-redux";

import { Language, setLanguage } from "../../../redux/slices/language";
import { setTheme, Theme } from "../../../redux/slices/theme";
import i18next from "i18next";

const { Text,Title} = Typography;

const useProfileMenu = (
	setOpenProfileMenu: (value: boolean) => void,
	setOpenLogOutModal: (value: boolean) => void,
	setProfileMenuSection: (value: "Home" | "Language" | "Appearance") => void
) => {
	const {
		token: {
			colorBgContainer,
			borderRadiusLG,
			fontSizeHeading5,
			colorText,
		},
	} = theme.useToken();
	const { name, globalTheme, globalLanguage } = useAppSelector(
		(state: any) => ({
			name: state.user.name,
			globalTheme: state.theme.theme,
			globalLanguage: state.language.language,
		})
	);
	const dispatch = useDispatch();
	return {
		Home: () => (
			<Menu>
				<Menu.Item key={0} onClick={() => setOpenProfileMenu(false)}>
					<Flex gap={18}>
						<UserOutlined style={{ fontSize: fontSizeHeading5 }} />
						<Text
							style={{
								fontSize: fontSizeHeading5,
							}}
						>
							{i18next.t("Profile")}
						</Text>
					</Flex>
				</Menu.Item>
				<Menu.Divider style={{ borderWidth: 50 }} />

				<Menu.Item
					key={1}
					onClick={(e: any) => {
						e.domEvent.preventDefault();

						setProfileMenuSection("Appearance");
					}}
				>
					<Flex gap={18} align="center">
						<ContrastRoundedIcon
							style={{ fontSize: fontSizeHeading5 }}
						/>
						<Text
							style={{
								fontSize: fontSizeHeading5,
							}}
						>
							{i18next.t("Appearance")}
						</Text>
					</Flex>
				</Menu.Item>
				<Menu.Item
					key={2}
					onClick={(e) => {
						e.domEvent.preventDefault();
						setProfileMenuSection("Language");
					}}
				>
					<Flex gap={18} align="center">
						<TranslateRoundedIcon
							style={{ fontSize: fontSizeHeading5 }}
						/>
						<Text
							style={{
								fontSize: fontSizeHeading5,
							}}
						>
							{i18next.t("Language")}
						</Text>
					</Flex>
				</Menu.Item>
				<Menu.Divider style={{ borderWidth: 50 }} />
				<Menu.Item key={3} onClick={() => setOpenProfileMenu(false)}>
					<Flex gap={18}>
						<StarOutlined style={{ fontSize: fontSizeHeading5 }} />
						<Text
							style={{
								fontSize: fontSizeHeading5,
							}}
						>
							{i18next.t("JourneyWonder Pro")}
						</Text>
					</Flex>
				</Menu.Item>
				<Menu.Divider style={{ borderWidth: 50 }} />
				<Menu.Item key={4} onClick={() => setOpenProfileMenu(false)}>
					<Flex gap={18}>
						<SettingOutlined
							style={{ fontSize: fontSizeHeading5 }}
						/>
						<Text
							style={{
								fontSize: fontSizeHeading5,
							}}
						>
							{i18next.t("Settings")}
						</Text>
					</Flex>
				</Menu.Item>
				<Menu.Item key={5} onClick={() => setOpenProfileMenu(false)}>
					<Flex gap={18}>
						<UserSwitchOutlined
							style={{ fontSize: fontSizeHeading5 }}
						/>
						<Text
							style={{
								fontSize: fontSizeHeading5,
							}}
						>
							{i18next.t("Switch Accounts")}
						</Text>
					</Flex>
				</Menu.Item>
				<Menu.Item
					key={6}
					onClick={() => {
						setOpenProfileMenu(false);
						setTimeout(() => setOpenLogOutModal(true), 300);
					}}
				>
					<Flex gap={18}>
						<LogoutOutlined
							style={{ fontSize: fontSizeHeading5 }}
						/>
						<Text
							style={{
								fontSize: fontSizeHeading5,
							}}
						>
							{i18next.t("Log Out")}
						</Text>
					</Flex>
				</Menu.Item>
			</Menu>
		),
		Language: () => (
			<Menu selectedKeys={[globalLanguage]}>
				<Flex align="center" gap={18}>
					<Button
						variant="text"
						color="default"
						icon={<KeyboardBackspaceRoundedIcon />}
						onClick={() => setProfileMenuSection("Home")}
					/>

					<Title level={5} style={{ margin: 0 }}>
						{i18next.t("Language")}
					</Title>
				</Flex>
				<Menu.Divider />
				{Object.values(Language).map((language) => (
					<Menu.Item
						key={language}
						onClick={() => {
							dispatch(setLanguage(language));
							setOpenProfileMenu(false);
						}}
					>
						<Flex gap={18}>
							<CheckRoundedIcon
								style={{
									opacity:
										language === globalLanguage ? 1 : 0,
								}}
							/>
							{language}
						</Flex>
					</Menu.Item>
				))}
			</Menu>
		),
		Appearance: () => (
			<Menu>
				<Flex align="center" gap={18}>
					<Button
						variant="text"
						color="default"
						icon={<KeyboardBackspaceRoundedIcon />}
						onClick={() => setProfileMenuSection("Home")}
					/>

					<Title level={5} style={{ margin: 0 }}>
						{i18next.t("Appearance")}
					</Title>
				</Flex>
				<Menu.Divider />
				<Segmented
					defaultValue={globalTheme}
					onChange={(value) => dispatch(setTheme(value))}
					shape="round"
					block
					style={{ marginTop: 10, marginBottom: 10 }}
					options={[
						{
							value: Theme.System,
							icon: (
								<Tooltip
									title="System Settings"
									placement="bottom"
								>
									<div>
										<PhonelinkSetupOutlinedIcon
											style={{ fontSize: 13 }}
										/>
									</div>
								</Tooltip>
							),
						},
						{
							value: Theme.Light,
							icon: (
								<Tooltip title="Light" placement="bottom">
									<div>
										{globalTheme === Theme.Light ? (
											<SunFilled />
										) : (
											<SunOutlined />
										)}
									</div>
								</Tooltip>
							),
						},
						{
							value: Theme.Dark,
							icon: (
								<Tooltip title="Dark" placement="bottom">
									<div>
										{globalTheme === Theme.Dark ? (
											<MoonFilled />
										) : (
											<MoonOutlined />
										)}
									</div>
								</Tooltip>
							),
						},
					]}
				/>
			</Menu>
		),
	};
};

export default useProfileMenu;
