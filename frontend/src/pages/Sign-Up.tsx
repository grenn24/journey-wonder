import {
	Button,
	Card,
	Divider,
	Flex,
	Form,
	Image,
	Input,
	theme,
	Typography,
} from "antd";
import { useState } from "react";
import "../styles/ant.css";
import { AppleFilled } from "@ant-design/icons";
import authService from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import i18n from "../i18n";
import useBreakpoints from "../utilities/breakpoints";
import googleLogo from "../assets/images/google/google.svg";
import journeyWonderIcon from "../assets/images/journey-wonder-icon/svg/journey-wonder-icon-white-background-normal.svg";
import LanguageMenu from "../components/LanguageMenu/LanguageMenu";
import useSnackbar from "../components/useSnackbar";
import ThemeMenu from "../components/ThemeMenu";

const { Title, Text, Link } = Typography;
const SignUp = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		token: {
			colorBgContainer,
			colorBorder,
			marginSM,
			marginMD,
			fontWeightStrong,
		},
	} = theme.useToken();
	const [form] = Form.useForm();
	const breakpoints = useBreakpoints();

	const [loading, setLoading] = useState(false);
	const { createSnackbar, snackbarContext } = useSnackbar();
	const [openErrorSnackbar] = createSnackbar(
		i18n.t("An internal server error occurred. Please try again later."),
		"error"
	);

	const handleFormSubmit = (body: Object) => {
		setLoading(true);
		authService
			.login(body, dispatch)
			.then(() => {
					navigate("/user");
				setTimeout(() => {
					setLoading(false);
					form.resetFields();
				}, 2000);

			})
			.catch(({ body }) => {
				setLoading(false);
				if (body?.status === "INVALID_EMAIL_PASSWORD") {
					form.setFields([
						{
							name: "email",
							errors: [i18n.t("Invalid email or password")],
						},
						{
							name: "password",
							errors: [i18n.t("Invalid email or password")],
						},
					]);
				} else {
					openErrorSnackbar();
				}
			});
	};
	return (
		<>
			{snackbarContext}
			<title>Sign Up | Journey Wonder</title>
			<meta
				name="description"
				content="Create a Journey Wonder account to start planning your next adventure."
			></meta>
			<Flex
				justify="center"
				align="center"
				style={{
					background: colorBgContainer,
					height: "100vh",
					width: "100vw",
				}}
			>
				<Flex
					style={{
						width: "100%",
						height: "100%",
						position: "relative",
					}}
					justify="center"
					align="center"
				>
					<Card
						style={{
							width: 450,
							border: `0px solid ${colorBorder}`,
							padding: 9,
						}}
						styles={{
							header: {
								borderBottom: `0px solid ${colorBorder}`,
								marginBottom: 20,
							},
						}}
						title={
							<Flex
								vertical
								justify="space-between"
								gap={7}
								style={{ marginBottom: 6 }}
							>
								<Title level={1} style={{ margin: 0 }}>
									{i18n.t("Get Started")}
								</Title>
								<Title
									level={5}
									style={{ margin: 0, fontWeight: 400 }}
								>
									{i18n.t("One Account. Endless Adventures.")}
								</Title>
							</Flex>
						}
					>
						<Flex gap={15}>
							<Button
								icon={
									<img
										src={googleLogo}
										alt="Google Logo"
										width="20"
									/>
								}
								iconPosition="start"
								block
								size="large"
								color="default"
								styles={{
									icon: {
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
									},
								}}
								style={{
									fontWeight: fontWeightStrong,
									borderRadius: 10,
								}}
							>
								{i18n.t("Google")}
							</Button>
							<Button
								icon={<AppleFilled />}
								iconPosition="start"
								block
								size="large"
								color="default"
								styles={{
									icon: {
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
									},
								}}
								style={{
									fontWeight: fontWeightStrong,
									borderRadius: 10,
								}}
							>
								{i18n.t("Apple")}
							</Button>
						</Flex>
						<Divider plain style={{ border: 0 }}>
							{i18n.t("or")}
						</Divider>
						<Form form={form} layout="vertical">
							<Form.Item
								label={i18n.t("Full Name")}
								name="name"
								rules={[
									{
										required: true,
										message: i18n.t(
											"Please enter your full name"
										),
									},
									{
										validator: (_, value) => {
											const regex = /^.{0,70}$/;
											if (!regex.test(value)) {
												return Promise.reject(
													i18n.t(
														"Name cannot contain more than 70 characters"
													)
												);
											}

											return Promise.resolve();
										},
										validateTrigger: "onChange",
									},
								]}
								style={{ marginBottom: marginSM }}
							>
								<Input
									size="large"
									autoComplete="name"
									variant="filled"
								/>
							</Form.Item>
							<Form.Item
								label={i18n.t("Username")}
								name="username"
								style={{ marginBottom: marginSM }}
								rules={[
									{
										validator: (_, value) => {
											const regex = /^.{0,35}$/;
											if (!regex.test(value)) {
												return Promise.reject(
													i18n.t(
														"Username cannot contain more than 35 characters"
													)
												);
											}

											return Promise.resolve();
										},
										validateTrigger: "onChange",
									},
								]}
							>
								<Input
									size="large"
									autoComplete="username"
									variant="filled"
								/>
							</Form.Item>
							<Form.Item
								label={i18n.t("Email")}
								name="email"
								style={{ marginBottom: marginSM }}
								rules={[
									{
										required: true,
										message: i18n.t(
											"Please enter your email"
										),
									},
									{
										validator: (_, value) => {
											const regex =
												/^(?=.{1,255}$)[^\s@]+@[^\s@]+\.[^\s@]+$/;
											if (!regex.test(value)) {
												return Promise.reject(
													i18n.t(
														"Invalid email format"
													)
												);
											}

											return Promise.resolve();
										},
										validateTrigger: "onChange",
									},
								]}
							>
								<Input
									size="large"
									autoComplete="email"
									variant="filled"
								/>
							</Form.Item>

							<Form.Item
								label={i18n.t("Password")}
								name="password"
								style={{ marginBottom: marginMD }}
								rules={[
									{
										required: true,
										message: i18n.t(
											"Please enter your password"
										),
									},
									{
										validator: (_, value) => {
											const regex =
												/^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,48}$/;
											if (!regex.test(value)) {
												return Promise.reject(
													i18n.t(
														"Password must contain 8-48 characters, at least 1 special character"
													)
												);
											}

											return Promise.resolve();
										},
										validateTrigger: "onChange",
									},
								]}
							>
								<Input.Password
									size="large"
									autoComplete="password"
									variant="filled"
								/>
							</Form.Item>
							<Form.Item>
								<Button
									block
									type="primary"
									htmlType="submit"
									size="large"
									loading={loading}
								>
									{i18n.t("Create Account")}
								</Button>
							</Form.Item>
							<Text style={{ whiteSpace: "pre-wrap" }}>
								{i18n.t("Already using Journey Wonder?   ")}
							</Text>
							<Link href="log-in" target="_self">
								{i18n.t("Log In")}
							</Link>
						</Form>
					</Card>
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
						}}
					>
						<Flex
							justify="space-between"
							align="center"
							style={{ margin: "10px 15px" }}
						>
							<a
								href="/guest"
								target="_self"
								rel="noopener noreferrer"
								title="Journey Wonder"
							>
								<Image
									width={40}
									src={journeyWonderIcon}
									preview={false}
									style={{ marginBottom: 2 }}
								/>
							</a>
							<Flex gap={15}>
								<ThemeMenu
									placement="bottomRight"
									size="middle"
								/>
								<LanguageMenu
									placement="bottomRight"
									size="middle"
								/>
							</Flex>
						</Flex>
					</div>
				</Flex>
				<div
					style={{
						width: "100%",
						height: "50%",
						display: breakpoints.largerThan("lg") ? "flex" : "none",
					}}
				></div>
			</Flex>
		</>
	);
};

export default SignUp;
